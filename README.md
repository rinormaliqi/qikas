# Qikas® Creative House — Landing Page

First version of the Qikas landing page, built from the Claude Design handoff.
Large, raw photography is the centre of gravity: images sit in organic rounded
frames, drift past soft clouds, and the whole page glides under a smooth-scroll
layer so sections flow into one another.

## Stack

Lightweight, image-friendly, and easy to maintain:

- **[React 18](https://react.dev)** + **[Vite](https://vite.dev)** — fast dev
  server, simple component model, instant HMR.
- **[React Router 6](https://reactrouter.com)** — client-side routing for the
  multi-page site (`/`, `/about`, `/careers`, `/blog`).
- **[Lenis](https://github.com/darkroomengineering/lenis)** — smooth inertial
  scrolling + smooth in-page anchor jumps.
- **Plain CSS** — design tokens + animations in `src/styles/global.css`
  (no Tailwind / CSS-in-JS build step).
- Fonts via Google Fonts: Archivo Black, Instrument Serif, Geist, JetBrains Mono.

## Colour system

Two primaries only — **pink `#D4014A`** and **white** — with **black `#141414`
reserved for text/letterforms** (never a button or element fill). Buttons are
pink-filled (`.qk-cta-dark`) or white with a pink border (`.qk-cta-light`); the
old pastel tints now resolve to white via the CSS variables in `global.css`.

> The styling is kept as inline-style strings parsed by a tiny `css()` helper
> (`src/lib/css.js`) plus the shared `global.css`. This was a deliberate choice
> when porting from the original design so the look stays byte-for-byte the same.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/ (static, deploy anywhere)
npm run preview  # preview the production build
```

## Adding real photography

Every image position is an `<ImageSlot>` (`src/components/ImageSlot.jsx`).
Until a real photo is supplied it shows an on-brand placeholder carrying its
art-direction caption, so the layout reads correctly with zero assets.

To drop in real photos:

1. Put image files in `public/images/` (e.g. `public/images/sunny-hill.jpg`).
2. In `src/App.jsx`, give the matching slot a `src` (and an `alt`):

   ```jsx
   <ImageSlot src="/images/sunny-hill.jpg" alt="Sunny Hill festival crowd" ratio="4/5" />
   ```

The masonry / case / team slots are data-driven arrays at the top of
`src/App.jsx` — add a `src` field there to fill several at once.

Large hero photos can also feed straight into the cloud-gradient backgrounds
later if you want the layered, photo-bleed look from the inspiration board.

## Contact form

The contact section has a real, validated form. Out of the box it opens the
visitor's mail client with the message pre-filled (zero setup). To receive
submissions server-side instead, set the `ENDPOINT` constant near the top of
`src/App.jsx` to a form backend URL, e.g. a
[Formspree](https://formspree.io) endpoint:

```js
const ENDPOINT = 'https://formspree.io/f/your-id';
```

## Structure

```
index.html                  # Vite entry: <head>, fonts, #root
src/
  main.jsx                  # React bootstrap + <BrowserRouter>
  App.jsx                   # <Routes>: Layout wraps Home / About / Careers / Blog
  components/
    Layout.jsx              # shared chrome + Lenis / scroll-reveal / scroll logic
    Nav.jsx                 # responsive navbar (desktop pill + mobile overlay)
    Footer.jsx              # shared pink footer
    StubPage.jsx            # scaffold for the routed pages
    ImageSlot.jsx           # fillable photography slot (white + pink frame)
  pages/
    Home.jsx                # the landing page (sections + content data + form)
    About.jsx / Careers.jsx / Blog.jsx   # routed stubs (StubPage)
  lib/css.js                # 'a:b; c:d' → React style object helper
  styles/global.css         # tokens, animations, navbar, responsive, form styles
public/
  assets/qikas-logo.png     # brand mark (favicon + header/footer)
  images/                   # drop real photography here
```

- **Routing**: `Layout` renders `<Nav/>`, the active page via `<Outlet/>`, and
  `<Footer/>`. It owns the single Lenis instance, the per-page scroll-reveal
  observer, scroll-to-top / scroll-to-hash on navigation, and smooth scrolling
  for in-page anchor CTAs.
- **Navbar** (`Nav.jsx`): sticky blurred bar that hides on scroll-down / shows
  on scroll-up, an animated active-link indicator, and on mobile a hamburger
  that opens a full-screen pink overlay (animated burger→X, scroll lock,
  close on link tap / Escape).
- The `/about`, `/careers`, `/blog` routes are **styled stubs** for now — real
  content drops into `StubPage` or dedicated section components later.

## Design notes

- Brand colour `#D4014A`; soft-pink cloud system; near-black ink `#141414`;
  pink footer.
- Giant display type uses `clamp()` so it scales from phone → large desktop.
- `prefers-reduced-motion` is respected (clouds, reveals and smooth-scroll off).
- The original design is a fixed 1280px desktop canvas; this build adds the
  responsive collapses (single-column grids, hidden orbits, stacked services).

The original handoff bundle is kept in `handoff/` for reference.
