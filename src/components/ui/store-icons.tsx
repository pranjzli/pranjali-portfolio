/**
 * Store marks for the app CTA. Drawn in `currentColor` so they invert with the
 * pill when it fills on hover, rather than sitting as fixed-colour artwork.
 */

export function AppleIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09z" />
      <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function GooglePlayIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3.6 1.84a1.5 1.5 0 0 0-.6 1.2v17.92c0 .5.24.94.6 1.2l10.02-10.16L3.6 1.84z" />
      <path d="M17.9 8.53 5.52 1.4l-.14-.08 9.68 9.82 2.84-2.61z" />
      <path d="m17.9 15.47-2.84-2.61-9.68 9.82.14-.08 12.38-7.13z" />
      <path d="M21.42 10.7 18.6 9.08l-3.06 2.84 3.06 2.84 2.82-1.62c.86-.5.86-1.94 0-2.44z" />
    </svg>
  );
}
