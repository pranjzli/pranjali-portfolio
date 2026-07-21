/**
 * Gradient placeholder avatar. Drop a real image at `src` (e.g. /avatar.jpg)
 * and it renders that instead of the gradient + initial.
 * Shape comes from `className` so callers can pick circle or rounded square.
 */
export function Avatar({
  src,
  alt = "",
  initial = "P",
  className = "size-12 rounded-full",
}: {
  src?: string;
  alt?: string;
  initial?: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`${className} object-cover`} />;
  }
  return (
    <div
      aria-hidden
      className={`${className} grid place-items-center bg-[linear-gradient(140deg,#bfe3d0,#d9e9b8)] text-sm font-medium text-card-foreground`}
    >
      {initial}
    </div>
  );
}
