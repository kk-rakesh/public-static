# O4F Cockpit — Design Package (Round 1)

Internal staff cockpit for O4F Phase 1. Wireframes, clickable prototype, and information architecture for the operational screens that wrap the OMS, derivatives, and RMS systems into one app.

**Branch:** `phase1-cockpit-wireframes` (off `main` in `public-static/`)
**Status:** Round 1 ships the operational core — `/today` + `/orders` + `/killswitch`. Round 2 covers `/rms`, `/backtest`, `/history`, `/admin/*`, `/login`.

## Quickstart

Open `00-overview.html` in a browser. Every artifact is linked from there.

```sh
open design/00-overview.html
```

Or jump directly:

```sh
open design/01-information-architecture.html   # sitemap, roles, flows
open design/wireframes/02-today.html           # the central screen
open design/wireframes/03-orders.html          # live order board
open design/wireframes/04-killswitch.html      # emergency stop
open design/prototype/index.html               # clickable demo
```

The wireframes are self-contained HTML — no build, no dependencies. Open them in any modern browser.

## What's in this package

| File | Purpose |
|---|---|
| `00-overview.html` | Entry point — links to everything, status checklist, Round 2 backlog, open questions |
| `01-information-architecture.html` | Sitemap, role-permission matrix, 3 critical flows (candidate→execution, kill switch, RMS daily toggle), data dependencies per screen, deploy-surface constraints |
| `wireframes/02-today.html` | The central operational screen. Desktop + tablet + mobile frames, state matrix for candidate cards, 15 annotations explaining design choices |
| `wireframes/03-orders.html` | Live order board. Desktop with detail drawer + mobile card view, 9 annotations |
| `wireframes/04-killswitch.html` | Emergency stop. Disarmed state + armed state + mobile confirmation modal, 14 annotations |
| `prototype/index.html` | Clickable React-via-CDN demo. Hash routing, mock data, simulated SSE. Approve / pause / cancel / kill all work in-memory |

## Design language

Wireframes use the existing O4F design tokens from `DESIGN_GUIDELINES.md`:
- Pure black background (`#000`)
- `Instrument Serif` italic for headings, `Barlow` 300/400/500 for body, `JetBrains Mono` for data
- `--primary` electric blue (`hsl(210, 100%, 60%)`) for "O4" and primary accents
- `--secondary` electric green (`hsl(145, 100%, 50%)`) for "F" and success/pos states
- Glass-effect cards (`rgba(255,255,255,0.03)` + 12px blur)
- Status pill color mapping is **consistent across the cockpit**: blue=auto/pending, amber=needs-attention/partial, green=working/filled, red=danger/rejected, muted=cancelled/terminal

## Architectural decisions baked into this round

| Decision | Choice | Where to challenge |
|---|---|---|
| Repo home | Extend `public-static/` (add `/app/*` routes) | overview Q2 |
| Strategy→trade flow | **Hybrid**: auto-execute if notional &lt; threshold, manual approval above; kill switch always available | `02-today.html` annotation ⑤; state matrix |
| Order updates | WebSocket / SSE push + polling fallback | `01-information-architecture.html` data deps table |
| Daily auth (Zerodha) | Manual admin endpoint (already shipped in `oms/`) | — |
| Mobile strategy | TWA + WKWebView wrap the same Vite SPA; design respects 360×640 viewport | IA → deploy surfaces table |

## What's deliberately NOT in Round 1

- `/rms` rule editor (deferred to Round 2)
- `/backtest` UX (will likely iframe `backtesting/ui-solid` initially)
- `/history` PnL screen
- `/admin/users` + `/admin/audit`
- `/login` — auth provider not yet chosen
- BFF skeleton — design now, build after wireframes approved
- Production code in `public-static/src/app/*` — wireframes only

## How to read a wireframe HTML file

Each wireframe file has the structure:
1. **Document header** — title, lede, what the screen does in 2-3 sentences
2. **Frame sections** — one per breakpoint (desktop / tablet / mobile). Each frame is a labeled box with the screen rendered inside. Multiple frames per file so you can compare layouts at a glance.
3. **Annotations** — numbered callouts after each frame explaining specific design choices. Click any annotation number to see the rationale.
4. **State matrices** — for screens with multiple object states (e.g. candidate cards on `/today`), a table showing state · visual · trigger · admin actions · next states.

The annotation text is the most important part — it's where design intent lives. App-team can implement from wireframes alone, but the annotations tell them *why*.

## Questions to resolve before Round 2 finishes (see overview)

1. **Auth provider** — Clerk / Auth0 / self-rolled JWT
2. **BFF or direct API calls** — cleaner vs faster
3. **SSE host** — BFF or OMS direct
4. **AUTO_THRESHOLD** default value — ₹50k? Tunable per-RMS-rule?
5. **Manual signal entry** in `/today` — does Rakesh's Telegram bot pipe in, or do we add a "+ Add candidate" button?

Reply on the branch PR or ping in #o4f-phase1.
