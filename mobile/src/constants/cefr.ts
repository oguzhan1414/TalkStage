/** Canonical CEFR level order, shared by every screen that sorts/filters/labels by level
 * (Vocab dictionary filters, Scenarios learning path, Reading level tabs) so the six
 * levels can't drift out of sync between near-identical local copies. */
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

// Exposed as `readonly string[]` (not the narrower literal tuple) so callers can
// freely `.indexOf()`/`.includes()` a plain `string` (e.g. `scenario.cefr_level`)
// without every call site needing a type assertion.
export const CEFR_LEVELS: readonly string[] = LEVELS;

export type CefrLevel = (typeof LEVELS)[number];
