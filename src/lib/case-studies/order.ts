export type CaseStudyRef = { href: string; name: string };

/**
 * Case studies in the order they appear under Selected Works. The "Next
 * project" link at the end of each study cycles through this list, so every
 * study points to a real next one (and the last wraps back to the first).
 */
export const caseStudyOrder: CaseStudyRef[] = [
  { href: "/work/zaps-editor", name: "The Zaps editor" },
  { href: "/work/zaps-design-system", name: "The Zaps design system" },
  { href: "/work/fitastra", name: "FitAstra coaches tab" },
];

export function nextCaseStudy(currentHref: string): CaseStudyRef {
  const i = caseStudyOrder.findIndex((c) => c.href === currentHref);
  // Unknown href falls back to the first study rather than throwing.
  return caseStudyOrder[(i + 1) % caseStudyOrder.length];
}
