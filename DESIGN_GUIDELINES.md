# O4F Design Guidelines & System Tokens

This document defines the visual identity, design tokens, and theming principles for the O4F platform. Use these guidelines to maintain consistency across all new components and pages.

## 1. Brand Identity
- **Logo**: Always uppercase **O4F**.
- **Color Rule**: "O4" must be Blue (`var(--primary)`), "F" must be Green (`var(--secondary)`).
- **Tone**: Infrastructure-focused, deep technology, real-time systems. Avoid "marketing agency" or generic SaaS aesthetics. Think NVIDIA, Stripe, or OpenAI infrastructure.

## 2. Design Tokens (CSS Variables)

Defined in `src/index.css` under `:root` and `@theme`:

| Token | Value | Description |
|-------|-------|-------------|
| `--background` | `0 0% 0%` (Black) | Primary background color |
| `--foreground` | `0 0% 100%` (White) | Primary text color |
| `--primary` | `210 100% 60%` (Blue) | Brand color for "O4" and primary accents |
| `--secondary` | `145 100% 50%` (Green) | Brand color for "F" and secondary accents |
| `--border` | `0 0% 100% / 0.15` | Subtle white border for glass effects |
| `--radius` | `9999px` | Global pill-shape radius for buttons and nav |

## 3. Typography

### Headings
- **Font**: `Instrument Serif` (italic)
- **Class**: `.heading-italic`
- **Styles**: `font-style: italic`, `line-height: 0.9`, `letter-spacing: -0.02em`, `text-white`.
- **Usage**: Major section headlines and hero titles only.

### Body & UI
- **Font**: `Barlow` (Weights: 300, 400, 500, 600)
- **Class**: `.body-light` (for 300 weight)
- **Styles**: `font-weight: 300`, `color: rgba(255, 255, 255, 0.6)`, `text-sm`.
- **Usage**: All descriptions, UI labels, and long-form content.

## 4. Visual Effects

### Liquid Glass
Used for navigation, badges, and cards to create a futuristic, high-tech feel.

- **`.liquid-glass`**:
  - `background: rgba(255, 255, 255, 0.03)`
  - `backdrop-filter: blur(12px)`
  - `border: 1px solid rgba(255, 255, 255, 0.08)`
- **`.liquid-glass-strong`**:
  - `background: rgba(255, 255, 255, 0.08)`
  - `backdrop-filter: blur(16px)`
  - `border: 1px solid rgba(255, 255, 255, 0.15)`

### AI Processing Wave
A signature motion element used to represent "Intelligence" or "Processing".
- **Component**: `ProcessingWave` (React)
- **Visual**: 12 vertical bars with staggered sine-wave height animation.
- **Usage**: Near "Intelligent Systems" text, in the Intelligence Layer of architecture, or as a status indicator.

## 5. Component Guidelines

- **Buttons**: Always `rounded-full`. Use `.liquid-glass-strong` for primary actions and simple borders for secondary.
- **Cards**: Large radius (`rounded-3xl`), `.liquid-glass` background, subtle hover effects (e.g., `hover:border-primary/30`).
- **Layout**: High contrast (White on Black). Use large vertical spacing (`py-32` on desktop, `py-16` on mobile).
- **Icons**: Use `lucide-react`. Prefer thin-stroke icons that match the `Barlow` light weight.

## 6. Theming Principles
- **Pure Black**: Never use dark grays for backgrounds. Stick to `#000000`.
- **Subtlety**: Glows and gradients should be extremely faint (`opacity: 0.05` or `0.1`).
- **Precision**: Use monospace fonts (`font-mono`) for technical data snippets or code-like architecture visuals.
