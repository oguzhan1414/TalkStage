# Spekvia landing: design system

Colour-field scroll page with a sticker look (2026-11-10, sixth pass). The user's references: maggie-app.com (giant poster caps, one colour per section, floating stickers, handwritten notes) and decathlon-yeyeweller.index.studio (running strips, tilted cards, a mascot). Earlier passes are dropped: no white page, no Inter/turquoise product hero, no HTML phone mock-ups.

## Sections (`src/components/home/`)

1. `Hero` (sun yellow): handwritten kicker, poster headline, store buttons, three illustrated marketing screens rising out of the bottom edge, Mivo waving, object stickers that follow the pointer. Phones spread as the section scrolls away.
2. `Marquee` strip (ink), tilted 1°.
3. `OldWay`: the story beat, pinned for 330vh. A desk on ruled paper (notebook, pencil, dictionary, sticky notes, grammar table, test paper, all drawn in HTML/SVG), the headline is crossed out, the desk is swept away, the ground turns mint and the phone rises with Mivo. Reduced motion: two stacked blocks.
4. `Day` (`#path`): four steps (read, collect, speak, review). Wide screens pin one phone that swaps screens; phones give every step its own. The ground takes the active step's colour. Ends in a round arc into the next section.
5. `MeetMivo` (`#mivo`, pink): one correction played as a chat, three trait cards.
6. `Stories` (`#levels`, sky): six level stories as tilted cards that slide sideways with the scroll (swipe row on phones), then the cast as a running strip.
7. `Extras` (cream): five sticker tiles and a store tile.
8. `PriceFaq` (`#pricing`, `#faq`): Free and Pro lists (same split as `docs/magaza_metinleri.md`, no prices), FAQ rows.
9. `FinalCta` (`#download`, violet): strip, headline, store buttons, cast line-up, hopping Mivo.

## Colour and type

- Ink `#1B1647` for text and every outline. Fields: cream `#FFF7E6`, sun `#FFCB3D`, mint `#74DDB0`, sky `#93D5FF`, bubble `#FFB5D2`, lilac `#CFC6FF`, flame `#FF7A59`, violet `#5546F5`. Tailwind names: `ink cream sun mint sky bubble lilac flame violet`.
- The older tokens (`paper`, `stage`, `cloth-deep`, `heading`, …) are retuned to this palette, so inner pages follow.
- `.poster`: Lilita One, caps, for headlines. `.hand`: Caveat, for margin notes. Body and inner-page headings: Figtree. All fonts load `latin-ext`.
- The brand name inside `.poster` needs `lang="en"` (Turkish caps would give SPEKVİA); the footer wordmark is lowercase.

## Sticker system (`globals.css`)

- `.stk` / `.stk-sm`: ink border and a hard offset shadow. `--stk-shadow` changes the shadow colour on dark grounds.
- `.btn-pop`: pill that sinks on press (`--pop-shadow`).
- `.device`: phone body around landing-specific screen artwork; size follows its width. Four screens live in `public/assets/screens/marketing/` (Turkish), with English, Spanish, Portuguese and German versions under `en/`, `es/`, `pt/`, `de/`. `Device.tsx` selects the artwork from the active locale for every phone placement. English lesson examples remain English; UI labels use the chosen language. Generated with image_gen from the real app captures and current brand artwork. Cream fields, ink outlines and colorful flat cards match the landing. No Expo Go gear or loading overlays. These are marketing interpretations, not exact app captures. Originals remain in `public/assets/screens/`; full prompts are in `docs/screen-art-prompts.json` and `docs/screen-localization-prompts.json`.
- `.marquee`, `.floaty`, `.hop`, `.lean`, `.paper-lines`.

## Navbar and footer

- Navbar: floating pills with their own grounds (no bar). Hides on scroll down, returns on scroll up. Phones get a full violet sheet with poster links.
- Footer: violet ground with an inset cream panel; large brand wordmark, two link columns, mint download panel, legal links and the Google sign-in notice. A handwritten note and Instagram / X / YouTube / TikTok links sit below the panel. Google Play is live; App Store shows a non-interactive localized “Coming soon” badge until its URL is configured.

## Inner pages

- About, Blog, FAQ and Contact use `PageHero variant="poster"`: full-width lilac / pink / mint / flame fields, poster headings, handwritten eyebrows and the current Mivo artwork. Legal documents retain the quiet variant.
- Cream content grounds, ink sticker outlines and offset shadows, colorful cards and sinking pill buttons continue the home-page style. `.btn-pop-wrap` allows long translated labels to wrap within narrow cards.
- About has a sky explanation panel, four principle cards and a violet CTA. Blog has category/search controls, a mint featured guide and colorful article cards; article pages carry a pink header, yellow summary and a calm reading column. FAQ keeps category filters, search and accessible accordions. Contact keeps its mailto form with violet/mint contact cards and quick answers.
- Existing content, routes, metadata and five-language localization are retained. Reuse existing brand illustrations; no new raster artwork is needed for this pass.

## Motion

- Motion (`motion/react`): load-in springs, scroll-linked values (`useScroll` + `useSpring`), `Pop` for in-view reveals. `HomeMotion` sets `reducedMotion="user"`; pinned scenes check `useCalm()`.
- CSS keyframes animate `translate`/`scale`, so they stack with Tailwind's `rotate-*` and Motion's `transform`.
- Build with `next build --webpack` from `D:\ingilizce\landing` (capital drive letter; a lowercase `d:` cwd loads Next twice and prerendering fails).
