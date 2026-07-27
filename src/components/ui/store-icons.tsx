/**
 * Store marks for the app CTA. Drawn in `currentColor` so they invert with the
 * pill when it fills on hover, rather than sitting as fixed-colour artwork.
 */

export function AppleIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.03-.85 1.01-2.24 1.79-3.36 1.7a2.6 2.6 0 0 1-.02-.33c0-1.09.5-2.24 1.14-2.97.74-.85 2.05-1.5 3.36-1.56.01.04.01.09.01.13zM20.8 17.1c-.6 1.39-.9 2.01-1.67 3.24-1.08 1.72-2.6 3.86-4.48 3.87-1.67.02-2.1-1.08-4.37-1.07-2.27.01-2.74 1.09-4.41 1.08-1.88-.02-3.32-1.95-4.4-3.67-3.02-4.79-3.34-10.4-1.47-13.39 1.33-2.12 3.43-3.36 5.4-3.36 2.01 0 3.27 1.1 4.93 1.1 1.61 0 2.59-1.1 4.91-1.1 1.76 0 3.62.96 4.95 2.61-4.35 2.38-3.64 8.59.61 10.69z" />
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
