# Spekvia landing: design system

The home page is a serial story ("tefrika"): an indigo book cover with an episode lying open on it. Direction and sources: `../docs/landing_tasarim.md`.

## Colour (tokens in `src/app/globals.css`)

| Token | Value | Job |
|---|---|---|
| `cloth` / `cloth-deep` | #231e66 / #18144d | Book cloth: hero, closing, active tabs, dark text on light grounds |
| `page` / `page-edge` | #fdfdff / #e7e5f6 | The paper: open page, panels, section ground; edge as 2px bottom "page thickness" |
| `paper` | #f5f4ff | Alternate section ground |
| `marker` / `marker-soft` | #ffc21f / #ffe48f | Highlighter on grammar words, ribbon bookmark, Mivo section field, selection |
| `stage` | #4f46e5 | Actions and links (brand indigo) |
| `on-cloth` | #e6e4ff | Body text on cloth |
| `vol-a1` … `vol-c2` | emerald, sky, indigo, violet, amber, rose | One cloth colour per level (spines, cover rings) |

Colour strategy: committed. Cloth and marker own whole sections; there are no scattered accents on a neutral template.

## Type

- Display: Bricolage Grotesque 800, tracking −0.03 to −0.035em, sizes 2.4–4.6rem.
- Story (English the learner reads): Alegreya 400/500, 1.1–1.5rem.
- Body: Figtree, 1–1.2rem, measure ≤ 36rem.
- No mono labels, no eyebrow/kicker above headings, no gradient text.

## Shape and depth

- Radius: panels 1.2–1.6rem, buttons 1rem (store) or full (nav, chips).
- Depth: page edge `0 2px 0 var(--color-page-edge)` plus one soft offset shadow. No glass, no glow.
- Cloth carries a 4px weave at 7% opacity, nothing else.

## Motion (Emil Kowalski rules)

- Easing `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; UI motion ≤ 260ms; nothing enters from scale(0).
- `.press`: scale(0.97) on `:active` for every pressable.
- `.gloss`: meaning bubble grows from its word (150ms). `.part-swap` / `.vol-in`: blur + fade + 6px rise. `.marker-draw`: highlighter drawn once on load.
- Hover effects only under `(hover: hover) and (pointer: fine)`. No scroll fade-ins on sections. `prefers-reduced-motion` collapses all durations.

## Imagery provenance

All rasters in `public/story/` are copied from the mobile app: episode covers from `mobile/assets/images/path/`, word pictures from `mobile/assets/images/words/`, the kitchen room from `mobile/assets/images/rooms/`. Mivo art lives in `public/mivo/`. When the app art changes, recopy it here.

## Content rule

Every story line, word, tip and scene on the page is real app content (`src/data/storyDemo.ts` names the source files). The Mivo conversation is labelled "Örnek konuşma". No prices or free-tier numbers until the packages are final.
