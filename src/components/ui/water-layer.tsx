"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_texRes;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_influence;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  float t = u_time;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv * vec2(aspect, 1.0);

  // Slow surface swell — two soft, out-of-phase waves per axis.
  vec2 warp;
  warp.x = sin(uv.y * 7.0 + t * 0.45) * 0.011 + sin(uv.y * 13.0 - t * 0.31) * 0.0055;
  warp.y = cos(uv.x * 6.0 - t * 0.39) * 0.010 + cos(uv.x * 11.0 + t * 0.26) * 0.0050;

  // Pointer ripple — rings that fall off with distance from the cursor.
  vec2 d = p - u_mouse * vec2(aspect, 1.0);
  float dist = length(d);
  float ring = sin(dist * 24.0 - t * 1.8) * exp(-dist * 3.2);
  warp += normalize(d + 0.0001) * ring * 0.020 * u_influence;

  vec2 suv = uv + warp;

  // Emulate object-fit: cover anchored to the top, matching the <img> beneath.
  float rTex = u_texRes.x / u_texRes.y;
  vec2 s = vec2(1.0);
  if (aspect > rTex) { s.y = rTex / aspect; } else { s.x = aspect / rTex; }
  vec2 tuv = vec2((suv.x - 0.5) * s.x + 0.5, suv.y * s.y);

  vec4 col = texture2D(u_tex, clamp(tuv, 0.001, 0.999));

  // Faint sheen where the surface tilts, so it reads as water not just drift.
  col.rgb += (warp.x + warp.y) * 0.7;

  gl_FragColor = col;
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
}

/**
 * A quiet water surface drawn over `src`. Samples the same image the <img>
 * below it shows, so if WebGL is unavailable the canvas simply stays empty
 * and the plain image remains visible.
 */
export function WaterLayer({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      tex: gl.getUniformLocation(prog, "u_tex"),
      res: gl.getUniformLocation(prog, "u_res"),
      texRes: gl.getUniformLocation(prog, "u_texRes"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      time: gl.getUniformLocation(prog, "u_time"),
      influence: gl.getUniformLocation(prog, "u_influence"),
    };

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // No flip: the shader works in top-down UVs, so t=0 must be the image's top row.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let ready = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(u.texRes, img.naturalWidth, img.naturalHeight);
      ready = true;
    };
    img.src = src;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      if (!canvas || !gl) return;
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.res, w, h);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Pointer is smoothed toward the cursor; influence fades it in and out.
    const target = { x: 0.5, y: 0.35 };
    const eased = { x: 0.5, y: 0.35 };
    let influence = 0;
    let wanted = 0;

    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      wanted = 1;
    }
    function onLeave() {
      wanted = 0;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const start = performance.now();
    let raf = 0;
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!ready || !visible || !gl) return;

      eased.x += (target.x - eased.x) * 0.09;
      eased.y += (target.y - eased.y) * 0.09;
      influence += (wanted - influence) * 0.05;

      gl.uniform1i(u.tex, 0);
      gl.uniform2f(u.mouse, eased.x, eased.y);
      gl.uniform1f(u.time, (now - start) / 1000);
      gl.uniform1f(u.influence, influence);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [src]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
