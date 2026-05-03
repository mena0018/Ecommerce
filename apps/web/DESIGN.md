---
name: Store
description: Editorial fashion storefront — precise, effortless, brand-forward.
colors:
  accent: "#c9826b"
  accent-deep: "#a85f4a"
  accent-muted: "#e8c4b8"
  surface: "#faf7f5"
  surface-dark: "#141210"
  neutral-900: "#1a1614"
  neutral-700: "#5c4f4a"
  neutral-400: "#9e8e88"
  neutral-200: "#e8e0dc"
  neutral-100: "#f4efec"
  destructive: "#b34040"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "10px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  "2xl": "96px"
components:
  button-primary:
    backgroundColor: "{colors.neutral-900}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-700}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.none}"
    padding: "12px 0px"
  product-card:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.md}"
    padding: "0px"
---

# Design System: Store

## 1. Overview

**Creative North Star: "The Quiet Wardrobe"**

This system is built on deliberate restraint. Every screen gives the product image room to speak before any interface element reaches for attention. The brand accent — a warm terracotta — appears selectively, never as decoration, always as direction. Whitespace is the primary design element on brand surfaces; density only appears where the user is transacting.

The catalog surfaces step back entirely. Navigation disappears into the edges. Product photography fills the frame. Typography is light-weight at display scale, medium-weight at functional scale — the contrast signals where to read versus where to act.

This system explicitly rejects: chaotic grids packed with promotion badges, neon sale callouts, discount banners above the fold, stock-photo hero sections, generic SaaS-cream color fields, and the fast-fashion visual language of Shein.

**Key Characteristics:**

- Flat surfaces, no shadows — depth comes from scale contrast and spacing rhythm
- Warm terracotta accent used on ≤10% of any surface — primary CTA, hover states, active selection
- Inter at 300 weight for display and headline — the lightness reads as confidence, not weakness
- Brand-tinted neutrals throughout: no pure black (#000) or pure white (#fff) anywhere
- Sharp corners on interactive components (buttons, inputs) — reinforces the editorial, non-consumer feel
- `prefers-reduced-motion` respected: all transitions optional, not structural

## 2. Colors: The Terracotta Edit

A warm-neutral palette with one committed accent. The base is barely-warm off-white in light mode and a dark brownish-charcoal in dark mode — both tinted toward the terracotta hue so the accent always feels at home.

### Primary

- **Terracotta** (`#c9826b` / `oklch(0.62 0.09 35)`): The singular accent. Used on primary CTA buttons (hover state), active navigation states, price highlights, and focus rings. Appears on ≤10% of any screen.
- **Deep Terracotta** (`#a85f4a` / `oklch(0.52 0.1 35)`): Pressed/active state of primary accent. Never used as a base color.

### Secondary

- **Muted Blush** (`#e8c4b8` / `oklch(0.84 0.04 35)`): Background tint for selected chips, hover states on product cards in dark mode, subtle callout backgrounds.

### Neutral

- **Ink** (`#1a1614` / `oklch(0.14 0.005 35)`): Primary text and button backgrounds. Tinted warm — never pure black.
- **Ash** (`#5c4f4a` / `oklch(0.4 0.015 35)`): Secondary text, metadata (prices, descriptions), muted labels.
- **Stone** (`#9e8e88` / `oklch(0.63 0.015 35)`): Tertiary text, placeholder text, disabled states.
- **Linen** (`#e8e0dc` / `oklch(0.9 0.01 35)`): Borders, dividers, input strokes.
- **Parchment** (`#f4efec` / `oklch(0.95 0.007 35)`): Card backgrounds, image placeholders, skeleton loaders.
- **Cream** (`#faf7f5` / `oklch(0.98 0.005 35)`): Page background in light mode.
- **Charcoal** (`#141210` / `oklch(0.11 0.005 35)`): Page background in dark mode.

### Named Rules

**The One Warmth Rule.** Every neutral must carry a terracotta tint — even the darkest ink and the lightest cream. Chroma 0.005–0.015 is enough. Pure black and pure white are prohibited.

**The Rare Accent Rule.** Terracotta appears on ≤10% of any given screen. Its rarity is what makes it feel intentional. If terracotta is everywhere, it becomes wallpaper.

## 3. Typography

**Display + Body Font:** Inter (variable, Google Fonts)
**No secondary typeface.** A single, well-set sans-serif used across all weights.

**Character:** Inter at 300 weight reads editorial and continental — closer to a Parisian boutique than a tech startup. The contrast between thin display text and medium-weight UI labels creates a clear two-tier hierarchy without needing a second typeface.

### Hierarchy

- **Display** (300, clamp(2.5rem–5rem), 1.05lh, -0.03em tracking): Homepage hero headlines and brand statements. Maximum 4-6 words per line. Never used in the product catalog.
- **Headline** (300, clamp(1.5rem–2.25rem), 1.1lh, -0.02em tracking): Section titles on the homepage, product name at top of PDP.
- **Title** (500, 1rem, 1.4lh): Navigation links, card product names, modal titles, form section headers.
- **Body** (400, 0.875rem, 1.6lh): Product descriptions, cart line items, checkout form labels. Max line length 65ch.
- **Label** (500, 0.6875rem, 1lh, 0.08em tracking, uppercase): Price badges, filter chips, category tags, button text. All-caps only at label scale — never on body copy or titles.

### Named Rules

**The Weight-Two Rule.** The system uses exactly two functional weights: 300 (editorial, display) and 500 (functional, actionable). Weight 400 for body copy only. No 600, 700, or 800 anywhere.

## 4. Elevation

This system is entirely flat. No box shadows on any surface, card, modal, or button. Depth is expressed exclusively through:

- **Scale contrast**: large whitespace fields beside dense content zones
- **Tonal layering**: Parchment (`#f4efec`) card backgrounds atop Cream (`#faf7f5`) page backgrounds — one tonal step apart
- **Border strokes**: Linen (`#e8e0dc`) 1px borders on inputs and dividers when structural separation is needed

### Named Rules

**The No-Shadow Rule.** If you reach for `box-shadow`, stop. Use a background-tint shift or a 1px border instead. Shadows belong to a different design language than this one.

## 5. Components

### Buttons

Buttons are sharp-cornered (border-radius: 0) and carry uppercase label text. The primary action is black-on-cream by default; terracotta on hover. Ghost buttons are text-only with no background, just a color shift.

- **Shape:** No radius (0px). Never rounded on buttons.
- **Primary:** Ink background (`#1a1614`) + Cream text, 12px/32px padding. Hover → Terracotta background (`#c9826b`) with 200ms ease-out transition.
- **Outline:** 1px Linen border, transparent background, Ink text. Hover → Parchment background.
- **Ghost:** No background, no border, Ash text. Hover → Ink text. Used for icon-only nav actions (search, cart, account).
- **Focus:** 2px terracotta ring offset 2px — visible, consistent.
- **Disabled:** 40% opacity, pointer-events none.

### Product Cards

The card is the catalog's workhorse. Product image dominates; metadata is secondary.

- **Image container:** Parchment background, `rounded-md` (8px), aspect-square. Image fills with `object-cover`.
- **Hover:** Image scales to 103% (not 105% — subtler) over 300ms ease-out. No shadow appears.
- **Title:** Title weight (500, 0.875rem), below the image with 12px gap.
- **Price:** Ash color, same size as title. No sale price / original price callout styling (no crossed-out prices, no red badges).
- **Border:** None at rest.

### Inputs / Fields

Inputs are borderless except for a bottom stroke — form-field style rather than boxed.

- **Style:** Transparent background, 1px bottom border in Linen, no left/right/top border. Radius: 0.
- **Placeholder:** Stone color.
- **Focus:** Bottom border shifts to Ink (1px → 2px). No ring, no glow.
- **Error:** Bottom border in Destructive red (`#b34040`).
- **Disabled:** 40% opacity.

### Navigation

The header is a fixed thin bar that recedes behind content — it should not compete with what's below it.

- **Height:** 64px.
- **Background:** Cream at 95% opacity with `backdrop-blur` — the page scrolls visible but smeared behind it.
- **Logo/brand:** Title weight, tight tracking, uppercase. Links to homepage.
- **Nav links:** Title weight, Ash color at rest, Ink on hover. 200ms color transition.
- **Icon actions (search, account, cart):** Ghost button sizing, 16px icons. Terracotta on active/filled state (e.g. cart has items).
- **Mobile:** Hamburger menu or bottom sheet — nav links collapse below `md` breakpoint.

### Product Hero (Signature Component)

The homepage is built around a full-bleed editorial hero: large display text over or beside a full-width image. No button centered on a gradient overlay — the CTA sits below or beside the image, as text with an arrow, not a filled button.

- **Layout:** Two-column on desktop (image left, text right, or full-bleed with text overlay in a corner)
- **Text position:** Bottom-left or bottom-right corner with generous padding — never centered
- **CTA style:** Link-style with right arrow, not a filled button. The image does the selling.

## 6. Do's and Don'ts

### Do:

- **Do** keep Inter at 300 weight for all display and headline text. The lightness is the brand.
- **Do** leave generous whitespace between sections — 96px between major blocks on desktop.
- **Do** use the terracotta accent on primary CTA hover states, active nav states, and focus rings only.
- **Do** tint every neutral toward terracotta, even slightly (chroma 0.005 is enough).
- **Do** use sharp corners (border-radius: 0) on all interactive controls — buttons, inputs, chips.
- **Do** keep product card hover effects subtle — 103% scale over 300ms, no shadow.
- **Do** respect `prefers-reduced-motion` — wrap all transition and animation CSS in a motion media query.
- **Do** treat the homepage as a brand statement — one hero image, one headline, one CTA. Not a grid.

### Don't:

- **Don't** use pure black (`#000`) or pure white (`#fff`) anywhere. Every surface must carry a terracotta tint.
- **Don't** show discount banners, sale badges, or promotional callouts above the fold. This is not Shein.
- **Don't** pack the homepage with a product grid. The catalog starts on `/store`, not on `/`.
- **Don't** use `box-shadow` anywhere. Flat-by-default; depth comes from tonal contrast and spacing.
- **Don't** use rounded corners on buttons or inputs. Sharp edges are intentional.
- **Don't** use gradient text (`background-clip: text`). Single solid color only.
- **Don't** use side-stripe border accents (`border-left > 1px` as a colored stripe). Rewrite with background tint.
- **Don't** repeat the terracotta accent more than 10% of any screen. Overuse kills the effect.
- **Don't** use uppercase text above label scale. Uppercase body copy or headlines are not this system.
- **Don't** stack multiple promotions or CTAs. One primary action per screen section.
