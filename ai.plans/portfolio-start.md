# Portfolio — Full Brief (verbatim from the developer)

> This file is the source of truth for the build. Revisit it whenever context is lost or compacted.

I'm building my new portfolio here, it will be built with NextJS and it will be entirely static content that got built at the deployment time and live as a static file until the next build, and so on.

My old portfolio is at https://ahmdmznaty.com and it's here as a codebase `/Users/ahmdmznaty/Desktop/AhmedMZanaty/website/ahmdmznaty/` you can analyse it well to have a better picture on me.

We have all static files you will need `public/` and we already redigned the portfolio on figma at https://www.figma.com/design/b0Z3HplWyGcVVk08SqeEag/Portfolio?node-id=3-3&t=9H1AdvLzFSvpfGZY-0 so you will just mirror figma, and add your touch on the responsive part of the implementation so it becomes amazing on the mobile too.

The portfolio is divided into those sections:

# Nav-bar:

Fixed at the top frame with the same figma styles and hide the center tabs in the small screens entirely.
Clicking any of the center tabs must go to the specific section animated and by scrolling with js not by html id-linking.

---

# Hero:

The most important section, a catchy section that fits 100% of the screen width and height all the time, and it must fit its content in this frame, make my-picture animated all the time with a beatiful catchy animation.
Don't forget the pattern at the background and the gradient used.

---

# Services:

A responsive section that shows its head followed by 3x1 grid of service cards that must be 1x3 grid in the small screens, never 2x1 + 1x1 grid in mid-screens.
Follow figma exactly in the design tokens.

---

# Projects:

A 3x2 grid that goes to 2x3 then 1x6 grid based on the screen width, showing 6 of my fearured projects, and when clicking `explore-project` button it must open a template popup that we can design later, this popup must be centered and semi-fill the screen and it must become controlled from the url-bar based on a query called `?project=project-name` and the popup entrance must be animated.

---

# Tech Stack:

A section that's strangely aligned, it's (3x2 + 1x1) grid in big screens that must be (2x3 + 1x1) in mid screens then (1x7) in small screens, and the whole line height will be determined based on the highest card, and all cards in the row must fit that card height too.

---

# Experience:

The work experience must be a creative accordion with connected lines between each two cards exactly like in figma, and the end of each line has two dots, I need to animate a non-shaded shadow below dots with scaling like I did in the experience section of my current portfolio, but the shadows here must be smaller.
The openning and closing of experience cards must be animated, and it mustn't play with the viewport scroll value to not lose the current point from the visitor eyes, and it must be one open card at a time.

---

# Testimonials:

A fading auto-animation and click-triggered animated section, that animates the content and client details at once with the fade effect.

---

# Footer:

A living section that tries to encourage the visitor to contact me, it has a background image that uses color-blending mechanisms, but you mustn't use mix-blend-mode here because I got you the editted picture `public/media/footer-bg.png` that you can use directly.
Make sure the bg-picture is some kind of centered to show the important parts of it, like I positioned it in the figma design.

---

You can learn my patterns and structures from other next projects built by me like those `/Users/ahmdmznaty/Desktop/Work/BrewBotics/coding/website/` and `/Users/ahmdmznaty/Desktop/Work/BrewBotics/coding/brewzy-website/`

---

Use OAS from https://michalsnik.github.io/aos/ to animate the elements when they come to the screen, use just the fade and zoom effects and prefer the fade most of the times.

Handle the button and card hovers properly.

Extract all reused design tokens like colors, font-sizes, radii, and so on into a global styles.css file to reuse them from one place, which will make it easy to go to dark theme or change some of those design tokens.

Add a "go to top" small button when the scroll goes down and hides the hero, this button must animate the scrolling to top with js without using html id-linking.

You must start the next.js project, install dependencies, then ask me to run the server and follow what you're building.

Write this full plan I wrote to you here `ai.plans/portfolio-start.md` so you don't miss any description with compaction or with any reason, and you can revisit this file whenever you need to review some parts' description.

---
---

# Build Log — decisions & reference (maintained by Claude)

## Decisions the developer made (2026-09-05)

| Topic | Decision |
| ----- | -------- |
| Output mode | **Default SSG build** — no `output: "export"`. Pages prerender at build time; `next/image` optimization kept (AVIF/WebP + srcset). Needs a Node host. |
| Content data | **Co-located per section** — each `src/components/<Section>/` owns `index.tsx`, `data.ts`, `style.css`. |
| ESLint | **Adapted the existing flat config**, dropped the Vite-only `react-refresh` plugin, added `next/core-web-vitals` via `FlatCompat`. Renamed `eslint.config.js` → `.mjs` (ESM needs it; matches BrewBotics). |

> Known cosmetic warning: `next build` prints "The Next.js plugin was not detected in your ESLint
> configuration." It is a **false negative** — `eslint --print-config` resolves 21 `@next/next/*`
> rules, so Next's lint rules genuinely apply. Next's detector just can't see through `FlatCompat`
> held in a variable. Do not "fix" this by rewriting the config.

## Figma reference

File key: `b0Z3HplWyGcVVk08SqeEag` — root frame `3:3` (1280 x 5656)

| Section | node-id | frame size | background |
| ------- | ------- | ---------- | ---------- |
| NavBar | `20:69` | 1220 x 70, inset 30 | glass |
| Hero | `17:4` | 1280 x 832 | gradient + pattern |
| Services | `24:107` | 1280 x 500 | white |
| Projects | `66:70` | 1280 x 1008 | surface |
| Tech Stack | `124:176` | 1280 x 800 | white (cards surface) |
| Experience | `98:3959` | 1280 x 1618 | surface |
| Testimonials | `139:401` | 1280 x 510 | white |
| Footer | `149:584` | 1280 x 388 | image |

## Design tokens extracted from Figma → `src/styles/variables.css`

- **Colors** — ink `#1a2540`, ink-strong `#1a1a1a`, muted `#59677f`, surface `#e8ecf4`, white `#ffffff`
- **Hero gradient** — `radial-gradient(115.7% 115.7% at 50% 100%, #b7c4db, #e8ecf4)`
  (from Figma's `radialGradient` matrix: rx 1480.8px, ry 962.5px, centre 640/832 on a 1280x832 frame)
- **Hero pattern** — white 1px lines on a 60px grid, first vertical at x=40, `opacity: 0.4`.
  Rebuilt as `repeating-linear-gradient` instead of the exported 1280x832 SVG **on purpose**, so it
  tiles at any viewport instead of stretching in a 100vw/100vh hero.
- **Type** — Comfortaa 300/400/500/600/700, loaded via `next/font/local` from `public/fonts`.
  Section title 44/700 ink · subtitle 26/400 muted · card title 20/700 · card sub 12/400 muted
  card body 14/500 ink · button 18/700 · tab 17/700 · note 15/500 · stat 28/700 · stat label 18/600
- **Radii** — card 18 · inner 12 · tiny 5 · pill 50 · round 999
- **Shadows** — card `0 3px 25px #00000012` · nav `0 3px 18px #0000001f`
- **Layout** — content max 1040 · gutter 120 · section padding-y 50 · section gap 35 · grid gap 30

> ⚠️ Figma uses **Alexandria Black** for the four hero stat numbers (`8+`, `20+`, `2+`, `25+`).
> Only Comfortaa ships in `public/fonts`, so those render in **Comfortaa Bold**. Ask the developer
> whether to add Alexandria before treating this as a mismatch.

## Conventions established

- Sections are targeted by **class selector**, never `#id` — `src/utils/scrollToSection.ts` does the
  smooth scroll in JS and offsets by the `--scroll-offset` token. `ScrollToBtn` wraps it.
  The address bar therefore stays clean for the Projects popup's `?project=` query.
- Every section reuses `.section`, `.section-head`, `.section-inner`, `.section-tail`, `.btn.solid`,
  `.btn.outline` from `globals.css`. Do not re-declare these per section.
- Selector list lives in `constants.sections`.

## Progress

- [x] Scaffold — `package.json`, `tsconfig.json`, `next.config.ts`, eslint, prettier, husky, deps
- [x] Design tokens + globals + AOS styles + Comfortaa via `next/font/local`
- [x] `scrollToSection` util · `ScrollToBtn` · `AOSWrapper` · `GoToTop`
- [x] **NavBar** — glass, fixed, centre tabs hidden ≤760px, JS scroll, hover underline
- [x] **Hero** — 100vw/100svh, gradient + CSS pattern, floating/breathing picture, 4 stats
- [x] **Services** — 3-across grid that drops straight to 1 (never a 2+1 widow)
- [x] **Projects** — 3 → 2 → 1 grid, `?project=` URL-driven popup
- [x] **Tech Stack** — (3x2 + wide) -> (2x3 + wide) -> (1x7); rows equal-height via grid `stretch`
- [x] **Experience** — accordion, one open at a time, connector + pulsing dots
- [x] **Testimonials** — autoplay fade carousel, quote + author swap together
- [x] **Footer** — pre-blended bg photo, Logo `variant="light"`, contact row

## Review round 3 — AOS trigger point

`offset: 60` fired the entrance while only a sliver of the element was on screen, so the animation
was effectively over before the reader saw it. Raised to **160**: AOS triggers at
`scrollTop >= elementTop - windowHeight + offset`, so a larger offset means the element must travel
further INTO the viewport first.

> **Constraint:** an element needs at least `offset` px of document below its own top, or it can
> never reach the trigger and AOS leaves it stuck at `opacity: 0`. Never put `data-aos` on something
> within 160px of the document end — that is why the footer animates its whole `.content` block
> rather than the copyright line.

## Verified by measurement (Playwright, real bounding boxes)

| Check | Result |
| ----- | ------ |
| Projects grid 1280 / 1000 / 820 / 700 / 400 | 3 / 2 / 2 / 1 / 1 cols, 0 clipped, 10px under button |
| Tech Stack 1280 / 950 / 650 / 400 | `3+3+1` / `2+2+2+1` / `1x7` / `1x7`, rows equal height |
| Experience accordion | closed panel 0px, open 120px, one open at a time, dots centred at both ends |

### Experience panel — do not reintroduce

`.exp-panel-inner` must carry **no padding**. It is the grid item, and padding keeps rendering even
when the `0fr` track collapses — that left a **10px ghost strip under every closed card** (measured
`panelHeight: 10` when it should be 0). Spacing lives on `> :first-child` as a margin, where the
panel's `overflow: hidden` clips it. Same family of bug as the Projects `flex-basis: 0` clipping.

## Review round 4 — motion pass

**General**
- All entrance effects are now `zoom-in-up` (the hero picture keeps `zoom-in`); no `fade-*` left.
- `duration` 700 -> **1100**, easing `ease-out-cubic`.
- `offset` 160 -> **80**. The 160 was mine and it was too aggressive: elements close to the page
  bottom could not reach the trigger and sat at opacity 0 until scrolled past.
- **AOSWrapper now refreshes.** AOS caches page offsets at init; fonts, the hero image and the
  accordion all change document height afterwards. Stale offsets were why experience cards stopped
  animating and why an opened card left a blank gap. Fixed with `AOS.refreshHard()` on `load`,
  on `document.fonts.ready`, and from a `ResizeObserver` on `<body>` (rAF-debounced).

**Connector — rebuilt to figma**
Source of truth is the "Cover" frame (`98:3966`): a 50x66 svg drawn at `inset: -16% 0` over the
50px gap, so it overhangs 8px each end. Two **16px** circles at cy=8 / cy=58 land exactly on the
card edges, joined by a **3px** line between their centres, line painted *under* both circles, all
`#59677F`. It lives **inside the lower card** (as in figma) so it fades in and out with that card.

> Gotcha: absolute offsets resolve against the **padding** box. The card's 2px border made the
> circles sit 2px inside the edges. `top` subtracts `--exp-border`, and the card border now uses
> that same token so the two can never drift. Measured offset is 0.00 on every connector.

**Other**
- Tech-stack chips: hover lifts only, no background/colour change.
- Testimonials: cross-fade `--t-fade` (1s); progress bars sweep to **50% only** and run toward each
  other (top grows rightward, bottom leftward); autoplay **never pauses**.
- Arrows now use the shipped icons: `arrow-line-light.svg` flipped `scaleX(-1)` on the next button
  and rotated `90deg` on go-to-top; `arrow-line-dark.svg` unflipped on prev.
- Footer animates as one block (`data-aos` moved to `<footer>`).
- Popup: scale 0.8 -> 1 over `--t-popup` (0.65s), and it animates **out** too. Needed an `entered`
  state — the overlay is not in the DOM until first open, so mounting with `.open` already set gave
  the transition no start state and the entrance just popped. Mount closed, paint, then flip.

## Review round 5 — motion tuning

- AOS `duration` **900ms** (between the original 700 and the 1100 that read too slow).
- Connector pulse ring enlarged and tokenised: `--exp-ring` **5px** -> `--exp-ring-max` **8px**
  (was 3 -> 4.5), dropping to 4 -> 6.5px under 760px where the circle itself is 13px.
  Still zero blur — spread only.
- Re-confirmed the experience cards animate under every approach path, not just one.

### Experience animation — the paths that were tested

| Path | Result |
| ---- | ------ |
| Page load, before scrolling | 0/9 animated, all at opacity 0 (AOS owns them) |
| Slow scroll through the section | 1 -> 3 -> 4 -> 6 -> 8 -> 9, all nine reached |
| Continuous fast scroll to the bottom | 9/9 animated |
| Direct jump from page top to card 2 / 4 / 6 / 8 | target animated + opacity 1 in all four; every visible card opaque |
| After opening a card mid-section | all visible cards stay at opacity 1, one open at a time |
| Scrolled to the very bottom | footer + testimonials at opacity 1, nothing stuck hidden |

## Verified against the running dev server (Playwright, real measurements)

| Check | Result |
| ----- | ------ |
| AOS effects in use | 38 `zoom-in-up` + 1 `zoom-in`, zero `fade` |
| Experience cards animate | 0/9 animated before scroll (opacity 0), 9/9 after |
| Connector alignment | top & bottom circle centres 0.00px from the card edges, x-centred |
| Connector paint order | line `z-index: 0`, circles `z-index: 1`, both `#59677F`, Ø16 / 3px |
| Accordion | 1 open at a time, closed panels all 0px, content visible, scroll moved -5.5px |
| Testimonials | advances while hovered, bar stops at 50%, bottom bar right-aligned |
| Popup entrance | 0.8 -> 0.84 -> 0.90 -> 0.94 -> 0.97 -> 0.99 -> 1 |
| Popup exit | 1 -> 0.99 -> 0.92 -> 0.87 -> 0.84 -> 0.82 -> 0.80 |
| Popup URL | opens `?project=slug`, closes to `/`, deep-links, drops unknown slugs |
| Mobile 390px | no page overflow (1274 <= 1280 at desktop; 384 <= 390 at mobile), nav tabs `display: none` |

## Review round 6 — THE ROOT CAUSE of the experience cards not animating

Rounds 3-5 kept "fixing" AOS config (offset, duration, refresh). **None of that was the problem.**
The real cause was in our own CSS, and it had been there since the sections were first written.

AOS drives its entrance with `transition-property: opacity, transform` (from
`[data-aos^="zoom"][data-aos^="zoom"]`, specificity 0,2,0). Every card that also declared its own
hover `transition:` shorthand — `.exp-card`, `.project-card`, `.service-card`, `.stack-card` — is
matched at the *same* specificity (0,2,0) and sits later in source order, so **our rule won and
replaced AOS's property list**. The entrance then had nothing to interpolate and simply snapped.

Measured computed `transition-property` before the fix:

| Element | transition-property | opacity animates? |
| ------- | ------------------- | ----------------- |
| `.section-head` (declares no transition) | `opacity, transform` | yes |
| `.exp-card` | `border-color, box-shadow` | **no — neither property** |
| `.project-card` | `transform, box-shadow` | no |
| `.service-card` | `transform, box-shadow, border-color` | no |
| `.stack-card` | `transform, border-color, box-shadow` | no |

`.exp-card` was the worst case because its list contained *neither* opacity nor transform, so the
card was completely static — which is exactly what kept being reported. The others still animated
their transform, so they looked "mostly fine" and hid the pattern.

### The fix — `.aos-item`

`data-aos` moved onto a wrapper `<div className="aos-item">` that declares **no transition of its
own**; the card (with all its hover styling) sits inside it. AOS owns the wrapper's
opacity/transform, our CSS owns the card. They can no longer collide.

> **RULE: an element carrying `data-aos` must never declare its own `transition`.**
> If it needs a hover transition, wrap it in `.aos-item` and put `data-aos` on the wrapper.
> `.aos-item` is `display: flex; min-width: 0` with `> * { width: 100% }` so grid/flex parents
> still size against the card and equal-height rows survive.

Also: the `wide` modifier moved to `.tech-stack .aos-item.wide` because the wrapper is the grid
item now, and `overflow-x: clip` was dropped from `aos.css` (it would have clipped the connector's
8px overhang; `body` already hides horizontal overflow).

Verified after the fix — opacity interpolates across ~50 distinct frames on all four card types
(exp `0 -> 0.035 -> 0.069 -> ... -> 1`), and 0 of 39 animated elements have a broken property list.

### Measurement lesson

Two regression runs reported false failures (`cols: 6`, `gap: 167`, `lastFullWidth: false`) because
`getBoundingClientRect()` returns the **transformed** box and AOS holds un-entered elements at
`scale(.6)`; switching to `offset*` failed differently because each card's `offsetParent` became its
own wrapper. Correct method: inject
`[data-aos]{transform:none!important;opacity:1!important;transition:none!important}` for the
measurement, then read `getBoundingClientRect()`.

## Review round 7 — testimonial timing split + experience head reflow

### Testimonials: two timings, fully separated

Previously one animation served both jobs — the bar's sweep was driven by `SLIDE_MS`, so the bars
and the content were locked together. They are now independent:

| Concern | Driver | Value |
| ------- | ------ | ----- |
| Content cross-fade | `--t-fade` | **1.8s** |
| Progress bars | `--t-progress` | **2.6s**, `infinite alternate` |
| Bar reach | `--progress-reach` | **30%** of the track, then shrinks back |
| Slide dwell | `SLIDE_MS` | 7s |

The fade is now a **true cross-fade**, not a fade-out-then-in. The outgoing slide stays mounted for
`FADE_MS` beside the incoming one; both sit in the same CSS grid cell (`.swap > * { grid-area: 1/1 }`)
so they overlap and merge through the middle, and the cell takes the height of the taller of the two
so nothing is clipped. Quote and client details share one `--t-fade`, so they move as one.

> The grid-stack is what makes the overlap possible without absolute positioning — absolute
> positioning would collapse the container's height and clip the longer quote.

### Experience head — reflow rules

- **>620px**: unchanged row. The `flex-flow: column-reverse` that had been pushing the date *below
  the arrow* from 860px down is gone — there is room for them to share the line, so they do.
- **620-520px**: same row, smaller type. The `display: none` that hid the location is **removed**;
  the location is visible at every width now.
- **<=520px**: the head becomes a grid. `.meta` is set to `display: contents` so its two children
  join that grid directly (no markup change), giving:

```
[badge] [company / role ............] [arrow]
        [dates - location ..................]
```

  The identity now runs the full width up to the arrow instead of being squeezed beside the date,
  so the company and role each stay on **one line** (they were wrapping to several at 450px).

### Verified

| Width | date placement | location | role lines | overflow |
| ----- | -------------- | -------- | ---------- | -------- |
| 900 / 830 / 700 / 610 | beside the arrow, same row | visible | 1 | none |
| 520 / 450 / 380 | own row below the identity | visible | 1 | none |

Testimonials: bars `1.2s infinite alternate`, sweep 0% -> 50% -> 0%, no inline duration left.
Cross-fade measured **36 consecutive frames with both slides visible at once**
(out 0.92 / in 0.08 -> out 0.70 / in 0.30 -> ...), quote and author both at 1.8s.

## Review round 8 — testimonial hand-over, nav flash, bar speed

**Merge window shrunk.** The two phases were running over the same window, so both slides sat
half-visible for most of the change. They are now staggered, tuned so the outgoing copy is nearly
gone before the incoming one starts:

```
out:  0      -> 0.9s     (--t-fade)
in:   0.62s  -> 1.52s    (--t-fade-delay + --t-fade)
```

`FADE_MS` (1550) must always cover `--t-fade-delay + --t-fade`, or the leaving copy is unmounted
while still on screen. The `.staggered` class applies the delay **only** when a slide is actually
handing over — on first paint there is nothing to fade out, so the quote must not sit blank.

**Bars slowed** to `--t-progress: 2.6s` (from 1.2s), still `infinite alternate` and still fully
independent of `SLIDE_MS`.

**The nav "flash" — what it actually was.** Clicking mid-transition replaced the incoming slide's
DOM node while its animation was still running, tearing it down and restarting from zero: measured
`0.103 -> 0.2 -> 0` — the text began appearing, then blanked. Fixed by **queueing**: a change
requested while `busy` is stored in `queued` and applied when the hand-over finishes, so no
animation is ever interrupted and the click still registers. Also added a focus policy — the button
kept `:focus` after a mouse click, which paints a ring in some browsers; `:focus-visible` keeps
keyboard focus visible.

### Verified

| Check | Single click | Interrupted click |
| ----- | ------------ | ----------------- |
| Time with both slides legible | **0 ms** | **0 ms** |
| Longest blank gap | 183 ms | 200 ms |
| Minimum composite opacity | 0.041 | 0.041 |

Composite opacity moves smoothly and monotonically through the change
(`1 -> 0.75 -> 0.49 -> 0.31 -> 0.18 -> 0.10 -> 0.05 -> 0.30 -> 0.54 -> 0.72 -> 0.91 -> 1`) with no
spike or blink. Queued clicks land on the right slide and the leaving node is always cleaned up.
Bars 2.6s. No focus ring after a mouse click.

> Measurement note: tracking `.entering` by selector reports a bogus `worstDrop: 1` when the queued
> change swaps which element matches. Track the **composite** (max opacity across `.swap`'s
> children) — that is what the eye actually sees.

## Review round 9 — the flash BEFORE the transition (the real one)

Round 8 fixed a genuine defect (interrupting a running fade), but missed this one because the
measurements sampled opacity per animation frame. The flash lasted about **6ms — under half a
frame** — and only a `MutationObserver` on the swap container caught it.

**What was happening.** `index` and `outgoing` were separate state, so a slide change landed in two
React commits:

```
pre-click    layers 1, opacity [1]        old quote visible
MUTATION     layers 1, opacity [0]        <-- BLANK: only the new slide rendered
MUTATION     layers 2, opacity [1, 0]     old reappears, transition finally starts
```

In the first commit `outgoing` was still `null`, so only the incoming slide rendered. Its `key`
had changed, so React unmounted the old node, and with no sibling there was no `.staggered` class,
so it mounted at opacity 0 with a 0s delay. The area went blank, then the old text popped back to
full opacity to begin fading out — a blink right before the transition.

**Fix.** `index` and `outgoing` are now one state object, so the hand-over is complete on the very
first painted frame:

```
pre-click    layers 1, opacity [1]
MUTATION     layers 2, opacity [1, 0]   delays 0s / 0.62s   <-- single commit, correct immediately
MUTATION     layers 1, opacity [1]      cleanup at the end
```

> **RULE: never split two halves of one visual transition across separate state updates.**
> A React commit is a paintable frame. If an intermediate commit is not a valid visual state,
> it will be seen. `live` (a ref mirroring the state) keeps `go()` free of side effects inside a
> state updater, so StrictMode double-invocation stays harmless.

### Verified — every click pattern

| Pattern | Blank commits | Sudden jumps | Lands on right slide |
| ------- | ------------- | ------------ | -------------------- |
| Single click | 0 | 0 | yes |
| Two clicks, 120ms apart | 0 | 0 | yes |
| Three rapid clicks, 90ms apart | 0 | 0 | yes |
| Click mid-transition (800ms in) | 0 | 0 | yes |

Composite opacity: `1 -> 0.75 -> 0.42 -> 0.22 -> 0.11 -> 0.04 -> 0.38 -> 0.66 -> 0.83 -> 0.92 -> 1`,
smooth and monotonic. Swap always settles back to a single layer. No focus ring after a mouse click.

> Measurement note: per-frame opacity sampling cannot see a sub-frame commit. To catch this class of
> bug, observe DOM mutations and snapshot state inside the observer callback.

## Review round 10 — project popup redesign

Reviewed the "Our Work" popup on bh.webket.net. Its schema is
`{name, sector, icon, desc, tags, media:[{t,l,src}]}` and the modal is
head / description / tag chips / one-shot-at-a-time viewer with arrows, dots and a caption.
**Its weakness:** media uses `object-fit: cover` in a fixed 364px frame, so anything tall is
cropped. That is exactly what must not happen here.

### Schema — `src/components/Projects/data.ts`

Everything about a project is editable from one place:

| Field | Purpose |
| ----- | ------- |
| `slug` `name` `logo` | identity; `slug` drives `?project=` |
| `tagline` `description` | the card |
| `sector` `summary` | popup header + intro |
| `year` `role` `status` | the facts row (`status` "Live" gets the filled badge) |
| `domain` `url` | optional — the site link only renders when `domain` is set |
| `stack[]` | technology chips |
| `highlights[]` | "What I built" bullets |
| `media[{src,label,kind}]` | screenshots in display order; `kind` is `web` / `mobile` / `print` |

Adding a screenshot is one line: drop the file in `public/projects/<slug>/` and add
`{ src, label }`. No dimensions needed.

### The viewer — fit vs scroll (round 15)

Long shots are now **real scroll containers**, not a transform animation. The auto-scroll drives
the cell's own `scrollTop` from a rAF loop, so the wheel, touch dragging and the scrollbar all keep
working and the reader can go straight to any part of a screenshot themselves.

| Behaviour | Setting | Measured |
| --------- | ------- | -------- |
| Downward travel | `PAN_SPEED` 130 px/s | 109 px/s |
| Return to top | `RETURN_SPEED` 6500 px/s | **6548 px/s — 2269px in 347ms** |
| Hold at bottom / top | 500ms / 300ms | — |
| Hover | stops | frozen |
| Tap | toggles a lock that survives leaving | frozen, second tap releases |
| Wheel / drag | always live | moves and stays put |

> **The scrollbar is drawn, not native.** Chrome ignores `::-webkit-scrollbar` the moment
> `scrollbar-width` is set, and macOS then shows an *overlay* bar that fades out — so the position
> indicator would disappear exactly when it is wanted. `.scroller` is a 6px always-visible track
> with a proportional thumb (55px in a 367px track for the 2652px landing shot) that tracks
> position and can be dragged.

> Timing caveat: an early measurement read the return at 2195 px/s. That was the test's own
> `requestAnimationFrame` spin competing for frames — sampling with `setTimeout` instead showed
> the true 6548 px/s. Do not tune these constants against a rAF-polling measurement.

### The viewer — fit vs pan (superseded, kept for context)

`ProjectMedia.tsx` measures each shot after load and picks a mode:

- **fit** (default) — `max-height: 100%; width: auto`, whole screenshot visible.
- **pan** — only when rendered height exceeds the frame by more than `PAN_THRESHOLD` (**1.8x**).
  The shot takes full width and travels vertically via `--pan` / `--pan-dur`
  (`PAN_SPEED` 60px/s, floor `PAN_MIN_S` 4s), pausing on hover.

> 1.8 is deliberate: a 16:10 screenshot in the stacked tablet layout overflows at ~1.7x and
> should simply scale down, while a real landing page runs 3x+ and pans.

The frame itself is `flex: 0 1 auto`, so it takes the screenshot's own height and shrinks only
when capped — a short shot sits flush instead of floating in empty bands.

> `<img>` is used here instead of `next/image`, with a scoped eslint-disable. `next/image` needs
> either fixed width/height (which would force every screenshot's intrinsic size into the data
> file) or `fill` + object-fit (which crops). A plain lazy `<img>` keeps the natural aspect
> measurable, which is what the fit/pan decision depends on.

### Assets

26 screenshots copied to `public/projects/<slug>/` (20MB): brewapp 8, deiar 5, menuket 4,
mofasal 4, offplan 5. TokenAI has none and renders an empty-state panel.
Labels were written from actually viewing each image, not guessed.

### Verified

| Viewport | Tall shot (1200x4200 fixture) | Ordinary 16:10 shot |
| -------- | ---------------------------- | ------------------- |
| 1440 | pans, 619x2167 in a 602 frame | whole, 619x387 |
| 900 | pans, 844x2954 in a 310 frame | whole, scaled to 496x310 |
| 390 | pans, 350x1225 in a 280 frame | whole, 350x219 |

Hover pause confirmed with a real pointer (frozen at -39px, resumes on leave). All six projects
open with the right media, captions and dots track, panel fits the viewport at every size, no
page overflow.

## Review round 11 — popup header, section titles, sliding slider

- **Header moved above the slider**, spanning the full panel width: logo, name, tagline, then
  status badge, sector, year and role as a dot-separated values row on the right.
- **"YEAR" / "ROLE" labels removed** — the values read fine alone; adjacent values are split by a
  3px dot separator instead.
- **Section titles** are now `Project Brief` / `What I Built` / `Stack`, styled as real headings:
  a 3x14 accent bar, 1px letter-spacing, and a hairline rule running to the column edge.
- **Slider slides instead of fading.** All shots live in one `.track` translated by
  `-index * 100%`, `transition: transform var(--t-slide) cubic-bezier(0.4, 0, 0.2, 1)` —
  0.42s, matching the reference deck. Only the active cell runs the pan animation.
- **Dots + caption share one fully-rounded capsule** (`border-radius: 999px`, column layout,
  dots above the label), copying the reference: inactive dot 6x6 circle at `#59677F40`,
  active dot **18x6 pill** at `#59677F`.

### Panel now hugs its content

`height: auto; max-height: min(760px, 90vh)` replaced the fixed height, which had been stranding
the 16:10 frame in ~200px of dead space. The frame itself is `aspect-ratio: 16 / 10`, matching the
screenshots, so an ordinary shot fills it exactly.

| Viewport | Panel | Dead space around the frame | Info scrolls | Fits viewport |
| -------- | ----- | --------------------------- | ------------ | ------------- |
| 1440x940 | 1120x550 | **0** | no | yes |
| 1440x700 | 1120x550 | **0** | no | yes |
| 900x900 | 872x820 | **0** | yes | yes |
| 390x844 | 370x802 | **0** | yes | yes |

Slide verified: `transform` / `0.42s` / `cubic-bezier(0.4, 0, 0.2, 1)`, 0 -> -615px through 19
distinct intermediate positions (a real slide, not a jump).

## Review round 12 — popup header regroup + the 900px collapse

- **`role` removed from the popup.** The field stays in the schema (it is real project metadata)
  but nothing renders it.
- **Header is now two rows.** Top: logo, name, tagline, status badge. Below: a pill strip carrying
  sector, year and — when `domain` is set — the site as a bordered link pill whose anchor fills the
  whole chip.
- **The reading column fills the slider's height** on wide screens via `justify-content:
  space-between`, so Brief / What I Built / Stack spread down beside the media instead of bunching
  at the top. Measured desktop: info height 444 = media height 444.

### Why the content vanished at ~900px

Not a hiding bug — a **grid squeeze**. In the stacked layout the slider and the reading column each
held their own row, and the slider's `aspect-ratio: 16 / 10` claimed the full column width in
height. Measured at 900x900, the rows resolved to:

```
grid-template-rows: 88px 585px 87px
                    head  media  info
```

`info` got **87px for 301px of content — 29%** — and the first block's bottom already sat past the
column's bottom edge, so the brief looked absent.

**Fix:** a `.body` wrapper holds the slider and the reading column. It is `display: contents` on
wide screens (both keep their own grid areas, nothing changes), and becomes a single
`overflow-y: auto` flex column once stacked. Nothing competes for height any more, the header stays
put, and the slider scrolls away with the content rather than being pinned.

> `display: contents` is what makes this free — no extra box on desktop, a real scroll container
> when stacked, and no duplicated markup.

### Verified

| Viewport | body | head pinned | info squeeze | first block visible |
| -------- | ---- | ----------- | ------------ | ------------------- |
| 1440x940 | `display: contents` | n/a (side by side) | none, 444 = 444 | 100% |
| 900x900 | scrolling flex column | yes | **gone** | 100% |
| 390x844 | scrolling flex column | yes | **gone** | 100% |

Scrolling the stacked body to the end: header stays fixed, slider scrolls away, last block reachable.
Link pill verified with a temporary domain — `https://…`, `target="_blank"`,
`rel="noopener noreferrer"`, 999px radius, anchor fills the chip, hover darkens the border — then
removed again.

## Review round 13 — true two-column popup + section title restyle

**Layout.** The header no longer spans the panel. On wide screens it is two real columns:

```
grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
grid-template-rows:    auto minmax(0, 1fr);
grid-template-areas:
    "head  info"
    "media info";
```

Column one stacks header -> slider -> navigator; column two spans **both rows**, so the reading
column runs the full height beside the header and the slider together.

> This needed no markup change. `.body` is already `display: contents` on wide screens, so
> `.project-media` and `.info` are direct grid items and can be placed by area. The stacked
> layout, where `.body` becomes the scroll container, is untouched.

Two knock-on fixes: the header lost its `padding-right: 44px` (the close button now floats over
the reading column, not the header), and the first section title carries `margin-right: 40px` so
it clears that button.

**Section titles** (settled after two rejected attempts — an accent bar with a hairline rule, then
a dark filled pill): plain **15px bold ink text with a 30x3 rounded accent rule beneath it**. The
weight comes from type, not from a filled background, so nothing high-contrast is stamped into the
middle of the reading column.

**Section spacing:** the three blocks are one grouped, vertically centred stack — even 26px gaps,
with `padding-bottom: 26px` so the group sits slightly above centre. `justify-content: space-between`
had pushed them to the column's ends, which left large voids once the column grew to full height.

> `justify-content: safe center` is deliberate. Plain `center` in a scroll container makes
> overflowing content unreachable at the top; `safe` falls back to flex-start the moment it would
> overflow. The stacked layout overrides to `flex-start` anyway, since `.body` scrolls there.

### Verified

| Width | Layout | Info full height beside col 1 | First block visible | Fits |
| ----- | ------ | ----------------------------- | ------------------- | ---- |
| 1440 | two columns | yes — top 0px / bottom 0px offset | 100% | yes |
| 1100 | two columns | yes | 100% | yes |
| 900 | stacked, body scrolls | n/a | 100% | yes |
| 620 | stacked, body scrolls | n/a | 100% | yes |
| 390 | stacked, body scrolls | n/a | 100% | yes |

Column one measured 558px against the reading column's 559px. Stacked scrolling still pins the
header and lets the slider scroll away. No page overflow at any width.

## Review round 14 — TokenAI popup filled from the Figma design

Analysed `igDFUMVFcBIhBsGFCzhoYg` (node `2:3857`). The metadata is 1.45M characters, far past the
tool's limit, so the screen list was extracted with python by indentation depth rather than read
whole.

**What the design actually is:** an Arabic-first (RTL) platform for learning AI and data science —
`منصة Token`. Screens present: Home, Courses, Programs, Search Results, Course detail (12
variants), Exam, Cart, Payment, Receipt, Profile, Blog + detail, About, FAQs, Contact, Terms,
Privacy, Login/Signup/Forgot/Reset, Error page.

Read off the screens directly:

- Faceted catalogue — filters for rating, duration, category, price, level; search shows
  "200 نتيجة" with an extra content-type facet.
- Course detail — description, "ماذا ستتعلم؟", a curriculum accordion, instructor bio, a 5.0
  ratings breakdown, and threaded comments.
- Exam — progress `1/8`, a circular `40:00` countdown, five-option questions.
- Payment — Apple Pay / Mastercard / Visa / مدى, card form, VAT-inclusive total, 30-day refund.
- Profile — "دوراتي" with per-course progress bars (100% / 8% / 50%) and certificate badges.

Seven screenshots pulled into `public/projects/tokenai/` (6MB), numbered in display order:
landing, catalogue, course detail, search, profile, exam, checkout.

> The landing shot is **970x4200** — it renders 2652px tall in a 383px frame and pans over 38s.
> This is the first real long-page screenshot in the set, and it exercises the pan viewer exactly
> as intended rather than being cropped.

`summary`, `highlights` and the two new stack chips (`RTL / Arabic-first`) describe what the design
shows. The rest of the stack is unchanged from the developer's own entry — the design shows what
the platform does, not what it was built with.

## Review round 16 — full-page Figma screens across four projects

Ten more screens pulled from four Figma files and placed in the projects they belong to. Named
descriptively rather than by number, since these come from named sources.

| Project | Added | File / node |
| ------- | ----- | ----------- |
| Deiar | `deiar-site` (1280x5806), `deiar-site-old` (1280x4809), `deiar-project` (1280x2544), `deiar-unit` (1280x832) | `c9hLpOcN3fIfQrT7ICvYLd` — 1214:283, 3:3346, 980:360, 1525:333 |
| BrewApp | `brewzy-site` (1280x4501), `brewzy-old` (1280x2845), `brewzy-menu` (1280x832), `brewbotics-site` (1280x5047) | `Vx1iARMG5vWqSC4pKcpwaQ` — 2018:2, 61:2, 172:52 · `3lkVaLYhJcnvyTM5eapE94` — 1:2 |
| Mofasal | `mofasal-landing` (1300x6743) | `H3I3yXVXEkMLXugHJ1zqUH` — 2526:4769 |
| Menuket | `menuket-site` (1280x5307) | `5vxtEcvvfTTIFvhMcEtFs5` — 634:5437 |

Full-page shots lead each project's slider; the older detail crops follow. Deiar's earlier website
version sits last, as historical context rather than the headline.

`brewapp-7.jpg` and `brewapp-8.png` were deleted — the new `brewzy-site` and `brewbotics-site`
full-page designs supersede those flat crops, and nothing referenced them any more.

Media across all six projects is now **41 items**; `public/projects` is 37MB.

### Verified

Every project opens, every image loads (no broken sources), and the fit/scroll decision lands
correctly per shot:

| Project | Shots | Scrolling (tall) |
| ------- | ----- | ---------------- |
| Menuket | 5 | 1 |
| BrewApp | 10 | 3 |
| Mofasal | 5 | 1 |
| OffPlan | 5 | 0 |
| TokenAI | 7 | 6 |
| Deiar | 9 | 3 |

## Review round 17 — crash when opening one project after another

**Symptom:** `Cannot read properties of undefined (reading 'label')` at
`ProjectMedia.tsx` — `media[index].label`. A refresh cleared it.

**Cause.** `index` is component state, and `ProjectMedia` stays mounted across a project change —
same position in the tree, only its `media` prop swaps. Reproduced: sit on Deiar's shot **8 of 9**,
open Menuket (5 shots), and the render evaluates `media[7]` on a 5-item array.

The reset existed — `useEffect(() => setIndex(0), [name])` — but **effects run after render**, so
the bad render happens first and throws. That is also why a refresh "fixed" it: a fresh mount
starts at 0.

**Fix, two layers:**

1. `<ProjectMedia key={shown.slug} … />` — a project change now remounts the viewer, so `index`,
   `cells` and `images` all start clean. This is the structural guarantee.
2. `const safe = total ? Math.min(index, total - 1) : 0` — every read goes through the clamped
   index, so an out-of-range render is impossible even if the key is ever removed.

> Hoisting matters: the clamp must be declared **above** `paintThumb`, which reads it. `tsc` caught
> this as "Block-scoped variable 'safe' used before its declaration" — worth running `npx tsc
> --noEmit`, since eslint alone passed.

> **RULE: state derived from props needs a `key`, not an effect.** An effect cannot prevent the
> render that is already in flight.

### Verified

- The exact repro: Deiar at dot 8/9 -> Menuket now renders "Website — Full Page", 5 dots, active
  dot **0**, no error.
- **All 30 ordered project pairs**, each advanced to its last shot before switching: 0 failures,
  every target lands on dot 0, and 0 page errors or console errors captured throughout.

## Review round 18 — OffPlan full-page captures replace the old crops

Five full-page captures added from `~/Desktop/offplan`. They arrived at **2880px wide** (retina for
a 1440 layout) totalling 59.5MB; the popup renders them 620–840 CSS px wide, so they were
resampled to **1440px** — still 2x — taking the folder to 21MB.

### Duplicates removed

| Old crop | Verdict |
| -------- | ------- |
| `offplan-1` Landing Page | **removed** — superseded by the full home page |
| `offplan-2` Browse by Region | **removed** — it is the `ابحث حسب المنطقة` section *inside* the new home page |
| `offplan-3` Interactive Map | **kept**, renamed `offplan-map` — the standalone `الخريطة التفاعلية` page, absent from the new set |
| `offplan-4` Project Filters | **kept**, renamed `offplan-map-filters` — the map's filter drawer, absent from the new set |
| `offplan-5` Unit Detail | **removed** — superseded by the full unit page |

> "Browse by Region" was the borderline call. Rather than guess, the 15136px-tall home capture was
> cropped into bands and inspected — band 3 carries the region cards verbatim, so it is a genuine
> duplicate. The two map screens are **not** in the new set, so deleting all five old crops would
> have silently lost the interactive-map page.

Final order: Home, Projects, Unit, Developer, Interactive Map, Map Filters, Contact.

### Verified

All 7 shots load, captions and dots track, and the fit/scroll split lands correctly — the five
full pages scroll (home 1440x7568 with a 2835px range and a live indicator), the two 2400x1500 map
crops fit whole. 0 page errors.

A reference audit across all six projects reports **43 referenced, 0 missing, 0 orphaned**.

## Content that still needs the developer

- **Experience highlights + tags** — only the BrewBotics entry comes from Figma; the other 8 are
  placeholders written from role/context. See the NOTE at the top of `Experience/data.ts`.
- **Testimonials** — all 3 are placeholders ("Client Name / FOUNDER, COMPANY", as in Figma).
  These are public-facing endorsements, so they must be replaced with real ones before launch.
- **`Brewzy — Earlier Concept`** — that Figma frame carries a literal "Not Completed" caption at
  its foot, which will be visible in the popup. Crop it or drop the shot if that is not wanted.
- **Project `domain` / `url`** — left blank on every project rather than guessed. Fill them in
  and each popup grows a live site link automatically.
- **Project `summary` / `role` / `year` / `stack` / `highlights`** — drafted from the screenshots
  and the tech stack section; verify before launch.
- **Alexandria Black** — Figma uses it for the hero stat numbers and the experience badge letters;
  only Comfortaa is in `public/fonts`, so those render Comfortaa Bold.

## Review round 19 — project popup performance

**Complaint:** the popup was slow to open and, worse, could not be closed while its images
loaded — the main thread was blocked until every screenshot finished.

### Root causes (four, all real, all fixed)

1. **Every shot loaded at once.** `ProjectMedia` rendered a live `src` for all media. Opening
   OffPlan fired 7 requests / 21 MB in one burst, the visible shot competing with 6 hidden ones.
2. **All 42 assets were PNG** — lossless, for screenshot content. 48 MB.
3. **Decode, not download, was the blocker.** One OffPlan open = 37.3 Mpx = **~149 MB of RGBA
   bitmap**. `decoding="async"` is only a hint and covers neither raster nor the resulting GC
   pressure. Images were also decoded at ~2.4x their display size: the media column resolves to
   **612 CSS px** (panel `min(1120px)` − 32 padding − 22 gap, x 1.35/2.35), yet assets were
   1440-2400 px wide.
4. **A re-render storm during the worst moment.** `measure()` ran off every image's `onLoad` and
   always wrote a fresh array, so 7 loads = 7 commits; `scrolls` was a dependency of both the
   scroll-listener and rAF effects, so both were torn down and rebuilt 7 times while the browser
   was busiest.

Plus: `close()` was `router.push(pathname)` — an App Router navigation at normal priority, which
gets starved when the main thread is saturated. That is why the popup visibly refused to close.

### Decisions (developer-approved)

- **WebP only**, no AVIF — one file per shot, universal support.
- **~~1100 px cap~~ -> 1440 px cap, quality 95.** The 1100 figure was WRONG and was reverted in
  round 20 — see there for why. Keep 1440/q95.
- **Originals** copied to `~/Desktop/projects-pngs/` (42 files, checksum-verified identical)
  before deletion from `public/`. They are also in git history at `07d1ad0`.

### Changes

- **Assets:** 42 PNG -> 41 WebP. Final settings are q95 / max 1440 px (round 20):
  **48 MB -> 10.5 MB (78% smaller)**. `public/projects` 52 MB -> 11 MB.
- **Schema:** `ProjectMedia` gains required `width`/`height`, generated not hand-typed. This is
  the keystone — it lets the viewer know a shot is long enough to auto-scroll **without
  downloading it**, which is what makes windowing possible. It also reserves the box up front.
- **Windowing:** only the active shot and its two neighbours mount (`near()`, with a `total - 1`
  arm for the wrap-around). Other cells stay empty spacers holding track geometry.
- **`measure()` deleted.** Replaced by a `ResizeObserver` on the frame with a bail-out when the
  box is unchanged, so it settles in one commit. `isTall()` is now pure data.
- **Close decoupled from the router.** A `dismissed` slug is recorded in a synchronous commit so
  the exit animation starts on the next frame regardless of load; `router.push` follows inside
  `startTransition`. The URL stays the source of truth. `dismissed` is cleared once the route
  settles, so a project can be reopened.
- **Viewer unmounts on close** (`POPUP_EXIT_MS`, matching `--t-popup`). This stops the rAF pan,
  which otherwise went on scrolling a 5781 px-tall screenshot behind a closed popup for the rest
  of the session, and releases the decoded images.
- **rAF pauses on a hidden tab** (`visibilitychange`).

### Result — cost of opening a popup

| project | before (all shots, PNG) | now (3 shots, WebP) | decode | transfer |
|---|---|---|---|---|
| offplan | 37.3 Mpx / ~149 MB / 21 MB net | 11.4 Mpx / ~43 MB / 0.73 MB net | −70% | −97% |
| tokenai | 20.7 Mpx / ~83 MB / 6.0 MB net | 7.6 Mpx / ~29 MB / 0.47 MB net | −63% | −92% |
| brewapp | 19.6 Mpx / ~78 MB / 7.2 MB net | 4.2 Mpx / ~16 MB / 0.20 MB net | −79% | −97% |
| deiar | 17.4 Mpx / ~70 MB / 5.8 MB net | 9.2 Mpx / ~35 MB / 0.41 MB net | −47% | −93% |

### Rules learned

- **An asset's intrinsic size belongs in data.** Anything that must be known *before* an image
  loads — whether it scrolls, what box to reserve — cannot be measured from the image itself
  without forcing the very load you are trying to avoid.
- **Never key an effect on state written from `onLoad`.** It multiplies renders by the image
  count at exactly the moment the main thread is most contended.
- **A router navigation is not a state flip.** Anything that must respond instantly under load
  needs its own synchronous state; let the URL catch up behind it.
- **An unmount is a performance fix.** A component kept mounted "just for the exit animation"
  keeps its timers, rAF loops and decoded images alive indefinitely.

### Also fixed this round

- **Service icons were 1x.** `backend-service`, `web-service`, `mobile-service` were 56x56 files
  rendered at 56 CSS px, and `service-feature` 30x30 at 30 px — so every retina screen showed
  them soft. Re-pulled from Figma (nodes `186:6-9`). The 4x *exports* are opaque, with the
  node's dark fill baked in; the **`rawImages` are the true transparent sources** (512x512 and
  256x256). Regenerated from those at 4x render size (224 and 120 px): 16x the pixel data for
  ~1.4x the bytes.
- **`brewapp-logo.svg` was 700 KB.** Zero vector paths — a **4096x4096** PNG base64'd inside an
  SVG wrapper, rendered at ~48 CSS px (85x oversized) and decoded on the *cards* grid, not just
  the popup. Re-embedded at 192 px, preserving the circle, ring and drop-shadow filter:
  **700 KB -> 8 KB**.
- **`deiar-5.png` was orphaned** — on disk, never referenced. A previous round's audit reported
  "43 referenced, 0 orphaned"; that was wrong, the real count is 41 referenced of 42 on disk.
  Removed. The original is in the backup folder if it is ever wanted.

## Review round 20 — quality regression from round 19, corrected

Developer: *"the pictures lost their quality entirely... and the services section pictures are
too bad too."* Both were my errors, and they were two different mistakes.

### Mistake 1 — the 1100 px cap was below the retina ask

I sized the assets at **1.8x the CSS column width** (612 x 1.8 = 1100) and called that
sufficient. That conflates two different things. A 2x display asks for **2x the CSS width in
device pixels** — 612 x 2 = **1224** — so a 1100 px asset was being *upscaled 11%* on any retina
screen. Measured live: `imgRenderedCSS 612`, `naturalWidth 1100`, DPR 2 -> supply/need 0.90x.

Combined with **q80**, which is far too aggressive for UI screenshots full of small text
(photographs tolerate it; 12px glyphs do not), the result was visibly mushy.

**Fixed:** cap **1440 px**, quality **95**. Verified live at DPR 2: supply/need **1.18x**.
48 MB -> 10.5 MB (78% smaller). Still only 3 shots load per open, so ~0.5-1.5 MB per popup —
the whole performance win of round 19 is intact.

> **Rule:** an asset's target width is `CSS width x DPR`, never `CSS width x some factor that
> feels big enough`. And screenshots containing text need q90+; q80 is a photo setting.

7 files remain below 1224 px natively (810-1195 px: the tall full-page site captures). That is a
limit of the *original* captures, not of the conversion. They need re-capturing at a higher
resolution if they are ever to be crisp on retina.

### Mistake 2 — palette quantization flattened the service icons

Regenerating the service icons I passed `png({ palette: true })`, which quantizes to **256
colours**. These icons are built from soft gradients, so it banded them badly. Measured: the old
56 px files held 687-922 distinct colours, my replacements held **~250**.

Note `sharp` did not honour `png({ compressionLevel, effort })` alone — the palette persisted
until **`palette: false`** was passed explicitly. Verify by counting distinct colours, not by
reading `metadata().paletteBitDepth`, which stayed `YES` either way.

**Fixed:** regenerated with `palette: false` -> 1841/3745/2708/899 colours. 16-25 KB each.

### A measurement trap worth remembering

While checking the icons I read `naturalWidth: 64` on an image whose `currentSrc` was the
`w=128` variant, and nearly went hunting for a cache bug that did not exist.

**`HTMLImageElement.naturalWidth` divides by the srcset density descriptor.** A 128x128 file
selected as the `2x` candidate reports `naturalWidth === 64`. To get the real pixels, fetch
`currentSrc` and `createImageBitmap` it. Done properly: the file is 128x128 for a 112 device-px
box = **1.14x**. The icons were fine; the measurement was not.

(This sits alongside the round-13 trap that `getBoundingClientRect()` returns the *transformed*
box — AOS holds un-entered elements at `scale(.6)`, which is why a 56 px icon first measured
34 px. Freeze AOS before measuring layout.)

### Verified live at DPR 2

Windowing hands over correctly across all 7 OffPlan shots including the wrap-around
(`[0,1,6] -> [0,1,2] -> ... -> [0,5,6]`); close drops the `open` class in **14 ms**; after the
exit the popup is fully unmounted with 0 images held and `body` overflow released; reopening the
same project works both by URL and by card click; 0 page errors, 0 failed requests.

## Review round 21 — long testimonials clamp to 3 lines with a "Read more" popup

Developer: *"Some feedbacks can be too long, so can we cut everything after line three with dots
and show a tiny button that opens a popup to show the rest."*

**Decisions taken by the developer:** the popup is **fully standalone** (not sharing the project
popup's shell, which carries URL state, a dismissed-slug guard and media windowing that a block
of text has no use for), and the button reads **"Read more"**.

### How it works

- `.text` is clamped with `-webkit-line-clamp: 3`. This also stabilises the section: `.swap` is
  a grid with both slides in one cell, so before the clamp a single long quote stretched the
  whole carousel and every short slide sat in the leftover space.
- The button is a **sibling** of the clamped `<p>`, never a child — inside the clamped box it
  would simply be clipped away with the fourth line. Each slide copy is therefore wrapped in a
  `.quote-body`, which is now the grid child the entering/leaving animations run on.
- Whether a quote is clipped is **measured** (`scrollHeight > clientHeight`), not guessed from a
  character count, because it depends on font metrics and on the breakpoint's font size.
  Re-measured on resize and once webfonts land. Results are cached per index as each slide comes
  round; that also covers the outgoing copy, since a slide can only be leaving if it was active
  first.
- Autoplay is suspended while the popup is open, so the slide cannot rotate out from under
  someone reading it.

### The height jump — caught in testing

Conditionally rendering the button meant the carousel **jumped 41px** (280 -> 321) whenever
rotation landed on a short quote. Fixed by always rendering the button and hiding it with
`visibility: hidden` on unclipped quotes, which holds the space *and* takes the element out of
both the tab order and the accessibility tree. Verified: height is a constant 321px across all
slides.

> **Rule:** an element that appears on only some slides of a carousel must still occupy its space
> on the others, or the whole section resizes on rotation.

### Verified

3-line clamp at mobile/tablet/desktop; popup fits the viewport at all three with no horizontal
overflow; Escape, backdrop click and the close button all dismiss; body scroll locked while open
and released after; the popup unmounts after its exit transition; 0 page errors.

### Data note — a testimonial went missing

`TESTIMONIALS` held **three** entries when this round began and holds **two** now: the third
placeholder ("We handed him the messiest half of the roadmap...", Client Name / CTO, Company) is
gone. My only edit to that file added `more:` and `QUOTE_EXIT_MS` *below* the array, so it was
not removed by this work; it is still in git at `07d1ad0`. Left as found, pending the developer's
call.

**This is why the carousel appeared to only alternate between two slides** — with two entries,
0 <-> 1 is correct. Confirmed by temporarily restoring the third entry: cycling ran
0 -> 1 -> 2 -> 0 -> 1 -> 2 correctly.

## Review round 1 — fixes applied

1. **Picture animation** — was `--ease` (ease-out) on 6s/9s loops, which decelerated to a stop at
   every keyframe. Now three loops on non-matching periods (float 3.4s / sway 4.6s / halo 5.8s) with
   `--ease-sine`, and every keyframe stop carries a distinct value. The composite never repeats the
   same pose, so it reads as continuous drift — matching the constant-speed feel of the old
   portfolio's `rotate 120s infinite linear`.
2. **Logo** — the svgs in `public/icons` are only the inner glyph (40x35). Figma wraps it in a
   **60x60 rounded square, `rx="14"`**. That square now lives in `src/components/Logo`, with
   `variant="dark"` (navy square, white glyph — nav) and `variant="light"` (white square, navy
   glyph — footer). Reuse it in the footer; do not re-inline the raw svg.
3. **Button hovers** — no more full background flips. Solid buttons stay filled and shift to
   `--ink-hover-color` (#26334f); outline buttons tint to `--surface-color` instead of flooding to
   ink. Same treatment applied to the nav CTA, the logo, and the go-to-top button.
4. **Mid/small screens** — type, buttons and stats all shrink through new tokens
   (`--btn-height`, `--btn-px`, `--stat-box`) across 1100 / 900 / 760 / 460 breakpoints. Stats stay
   **one row** at every width (a 2x2 grid would eat the height the picture needs) and collapse to a
   stacked number-over-label card under 460px.
5. **Stats radius** — the ≤760px override that set the number box to `10px` while the card stayed
   `18px` is gone. `--radius-inner` (12px) and the card's 5px padding now hold at every breakpoint,
   so the curves stay concentric.

## Review round 2 — project card clipping

**Symptom:** the bottom of every project card (description tail + "Explore Project" button) was cut off.

**Root cause:** `.projects .project-card .body { flex: 1 0 0 }` — i.e. `flex-basis: 0`.
The `.cards` grid row is auto-sized, so it measures the card's *intrinsic* height. An item with
`flex-basis: 0` contributes **nothing** to that measurement, so the row collapsed to
`160 (banner) + 10 (gap) + 20 (padding) = 190px`. The body then had no free space to grow into, its
content overflowed, and the card's `overflow: hidden` clipped it. Measured: card `clientHeight` 190
vs `scrollHeight` 308–332, with the button sitting **118–142px below the card's bottom edge**.

**Fix:** `flex: 1 0 auto` on both `.body` and `.body .description`. `flex-basis: auto` makes the body
contribute its real content height to the row measurement. Verified: card 342px, nothing clipped,
10px padding under the button, cards equal height within each row, at 1280 / 1000 / 820 / 700 / 400px
(3 → 2 → 1 columns).

> **Rule:** never put `flex-basis: 0` on the vertical axis of a card that sits in an auto-sized grid
> row. Basis-0 is still correct on the *horizontal* axis for equal-width columns — the surviving
> `flex: 1 0 0` rules in `NavBar` (tabs) and `Hero` (stats) are row-direction and intentional.

## Build hygiene — important

`npm run build` and `next dev` both write `.next/`. Running a production build while the dev server
is live corrupts it and the dev server starts returning 500 (this happened once). Fixed by:

- `next.config.ts` → `distDir: process.env.NEXT_DIST_DIR || ".next"`
- new script **`npm run build:check`** → `NEXT_DIST_DIR=.next-check next build --turbopack`

`npm run build` is unchanged and still writes `.next`, so deployment is unaffected.
**Always verify with `build:check`, never `build`, while a dev server is running.**
