/**
 * FitAstra's two screens side by side — the same composition on the Selected
 * Works card and at the top of the case study.
 *
 * The tuned offsets are percentages rather than px: a % translate on an <img>
 * resolves against that element's own box, which here is half the width and
 * the full height of the surrounding 5:4 frame. So the framing holds at any
 * size, as long as the frame keeps that ratio.
 */
const HERO1_TRANSFORM = "translate(4.25%, 31.5%) scale(1.08)";
const HERO2_TRANSFORM = "translate(-3.3%, -33.6%) scale(1.08)";

/** Fills its parent — give that parent `aspect-[5/4]` and `overflow-hidden`. */
export function FitAstraDuo() {
  return (
    <div className="flex size-full">
      <div className="w-1/2 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/case-studies/fitastra/hero1.png"
          alt=""
          className="size-full object-contain"
          style={{ transform: HERO1_TRANSFORM }}
        />
      </div>
      <div className="w-1/2 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/case-studies/fitastra/hero2.png"
          alt=""
          className="size-full object-contain"
          style={{ transform: HERO2_TRANSFORM }}
        />
      </div>
    </div>
  );
}
