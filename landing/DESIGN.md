# Spekvia landing: design system

Clean app-showcase page (2026-10-31, second pass): lots of white space, big headline, tilted phone mockups with quiet motion, little text. The first "tefrika" pass was too busy and was replaced.

## Sections (`src/components/home/`)

1. `Hero`: headline, one line, store buttons; two tilted phones (Mivo scene behind, home screen in front) rise in and drift.
2. `HowItWorks`: four steps; on desktop one sticky phone swaps its screen as each step reaches the middle (inline phones on mobile).
3. `WorldMap`: dotted world map (`public/world-dots.svg`), arcs drawing toward Mivo, one learner bubble per app language. Illustrative, no user numbers.
4. `Levels`: six round covers, A1–C2 (C2 "Yakında").
5. `PriceFaq`: one number-free price line, then the FAQ.
6. `FinalCta`: dark panel, store buttons, a phone rising from the bottom edge, Mivo waving.

## Phones

`Phone.tsx` draws the body in CSS. `AppScreens.tsx` rebuilds four app screens in HTML from the app's own art and copy (home, reading episode, kitchen word room, Mivo scene). When real screenshots arrive, replace a screen's children with `<Image src="/screens/…" fill className="object-cover" />`.

## Colour and type

- Ink `cloth-deep` #18144d for headings, `body` #4a4768 for text, brand `stage` #4f46e5 for accents, `cloth` #231e66 for dark buttons and the closing panel, `marker` #ffc21f only inside the app screens.
- Soft grounds: hero panel #f3f1ff → white → #eef6ff, map panel #f4f3ff. Big rounded panels (2–2.75rem) like app-store landing pages.
- Bricolage Grotesque 800 headings (−0.03em), Figtree body, Alegreya only for English sample text inside the phones.
- No eyebrow labels, no gradient text, no glass.

## Motion (Emil Kowalski rules)

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- `.phone-in` 900ms rise with tilt, `.phone-drift` 7s float, `.screen-swap` 380ms blur cross-fade, map arcs/bubbles once on view, pins pulse.
- `.press` scale(0.97) on every pressable; hover only for fine pointers; `prefers-reduced-motion` collapses everything.

## Imagery provenance

`public/story/` holds copies of app art (episode covers, A1 home backdrop, kitchen room) from `mobile/assets/images/`. The map SVG was generated once with `dotted-map` (not a dependency).
