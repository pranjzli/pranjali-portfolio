/**
 * Chat-bubble tail. Sits flush under a bubble's bottom edge and hooks toward
 * whatever the bubble is "pointing at". Inherits the bubble colour via
 * `currentColor`, so set `text-*` to match the bubble's background.
 */
export function BubbleTail({
  side = "right",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 22 17"
      width="22"
      height="17"
      aria-hidden
      className={`${side === "left" ? "-scale-x-100" : ""} ${className}`}
    >
      {/* Round joins keep the hook soft rather than a sharp spike */}
      <path
        d="M2 1 H9 C9 6 11 10.5 17 13 C11 14.5 5 9.5 2 5 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
