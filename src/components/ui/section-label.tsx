export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
      {children}
    </span>
  );
}

/** Consistent max-width + horizontal padding for every section. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[720px] px-6 ${className}`}>{children}</div>
  );
}
