# Spekvia landing: design system

Clean app-showcase page (2026-10-31, third pass): soft lavender panels, big headline, a real hand holding the phone, scroll-driven transitions, little text. The "tefrika" pass was too busy; the CSS-drawn phones felt flat.

## Sections (`src/components/home/`)

1. `Hero`: headline, one line, store buttons; a real hand lifts the phone in from the panel's bottom edge (spring), the screen flips through four app screens every 3.2s (blur cross-fade), three small cards float around it and drift toward the pointer; on scroll the hand rises slower and shrinks a little.
2. `HowItWorks`: a pinned stage (~380vh of scroll). The hand stays put while the scroll moves through four steps: screen, words (blur in/out) and panel tint change per step, the phone turns −5°→5°, a progress line fills.
3. `WorldMap`: dotted world map (`public/world-dots.svg`), arcs drawing toward Mivo, one learner bubble per app language. Illustrative, no user numbers.
4. `Levels`: six round covers, A1–C2 (C2 "Yakında").
5. `PriceFaq`: one number-free price line, then the FAQ.
6. `FinalCta`: dark panel, store buttons, the tilted hand springs up from the bottom edge with a Mivo scene on screen.

## Hand + phone

`HandPhone.tsx` lays an app screen behind the glass of a hand photo. Photos (1122 × 1402, green screen and background keyed out) are `public/hero/hand-phone-cut.webp` (upright) and `hand-phone-tilt.webp` (turned); originals in `brand/landing/`. App screens are drawn at 260 × 562 and mapped onto the measured screen corners with a `matrix3d` homography, so they fit at any size. `AppScreens.tsx` rebuilds four screens in HTML from app art; swap in real screenshots there when they exist.

## Colour and type

- Ink `cloth-deep` #18144d for headings, `body` #4a4768 for text, brand `stage` #4f46e5 for accents, `cloth` #231e66 for dark buttons and the closing panel, `marker` #ffc21f only inside the app screens.
- Soft grounds: hero panel #f3f1ff → white → #eef6ff, map panel #f4f3ff. Big rounded panels (2–2.75rem) like app-store landing pages.
- Bricolage Grotesque 800 headings (−0.03em), Figtree body, Alegreya only for English sample text inside the phones.
- No eyebrow labels, no gradient text, no glass.

## Motion (Emil Kowalski rules)

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- Motion (`motion/react`) for the hero, the pinned stage and the closing: springs (bounce ≤ 0.3) for things that move in, blur + opacity for swaps, scroll-linked values smoothed with `useSpring`. CSS keyframes for the map and idle floating.
- `.press` scale(0.97) on every pressable; hover only for fine pointers; `prefers-reduced-motion` collapses everything.

## Imagery provenance

`public/story/` holds copies of app art (episode covers, A1 home backdrop, kitchen room) from `mobile/assets/images/`. The map SVG was generated once with `dotted-map` (not a dependency).
