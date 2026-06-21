# O4F Design Guidelines & System Tokens

Visual identity for O4F — a systematic, multi-strategy investment firm.
The aesthetic is institutional, restrained, and motion-driven: it should read as
serious and trustworthy first, expressive second.

## 1. Brand Identity
- **Logo**: Always the tri-color **O4F** wordmark (`src/components/Logo.tsx`).
  "O" red, "4" blue, "F" `--color-secondary` (teal). Do not alter.
- **Voice**: Math-first, technology-first, talent-first. Markets are a problem of
  computation and probability. Avoid hype, fabricated returns, or AUM claims.
- **Compliance**: Never state performance figures. Keep the footer disclaimer
  (no-offer / past-performance language) on every page.

## 2. Design Tokens (`src/index.css`, `@theme`)

| Token | Value | Use |
|-------|-------|-----|
| `--color-background` | `#06080c` | Page background (near-black) |
| `--color-surface` / `-2` | `#0a0e15` / `#0f141d` | Raised bands |
| `--color-foreground` | `#eceef3` | Primary text |
| `--color-muted` | `#969cab` | Secondary text |
| `--color-faint` | `#5b616e` | Tertiary / disclaimers |
| `--color-primary` | `#4c86f0` | Accent blue (from the "4") |
| `--color-secondary` | `#2fd6b6` | Accent teal (from the "F") |
| `--color-ember` | `#d8434f` | Restrained red (sparingly) |
| `--color-paper` | `#f2eee5` | Ivory editorial inversion |
| `--color-border` | `rgba(255,255,255,.09)` | Hairline borders |

## 3. Typography
- **Display**: `Fraunces` (serif, optical sizing) via `.display` / `.display-italic`.
  Tight leading, negative tracking. Headlines and hero only.
- **Body / UI**: `Inter`. `.lead` for intros, `.muted` for secondary copy.
- **Data / labels**: `JetBrains Mono` via `.mono` and `.eyebrow` (uppercase, tracked).
- Use **sentence case** for body; eyebrows are the only uppercase element.

## 4. Motion (Framer Motion)
- `Reveal` — fade/slide-up on scroll into view (default section entrance).
- `Headline` — word-by-word mask reveal for display text.
- `Counter` — count-up metrics on view.
- `Magnetic` — subtle pointer-follow on primary buttons.
- Scroll physics via `useScroll` + `useSpring` (progress bar, pipeline line, hero parallax).
- Always respect `useReducedMotion`; keep animations on transform/opacity only.

## 5. Surfaces & Components
- **Panels/cards**: `.panel` (hairline + faint gradient) + `.panel-hover`,
  `rounded-2xl`/`rounded-3xl`. No heavy backdrop blur on cards (perf).
- **Nav**: `.glass` (blur) only on the fixed header.
- **Buttons**: `.btn-primary` (solid ivory) and `.btn-ghost`, pill radius.
- **Texture**: `.grid-bg` (masked grid) and faint `.glow-primary/secondary` only.

## 6. Principles
- Near-black backgrounds, generous vertical rhythm (`py-24 md:py-32`).
- Glows and gradients stay faint; hairlines do the structural work.
- Mobile-first: fluid `clamp()` display sizes, single-column stacks, ≤150kB JS gzip.
- One ivory editorial section (the thesis) for contrast and an investor-letter feel.
