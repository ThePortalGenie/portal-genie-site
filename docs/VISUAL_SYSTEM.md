# Portal Genie Visual System

**Version:** 1.0  
**Status:** Active  
**Purpose:** Implementation reference for reusable UI patterns on the marketing site

This document complements `docs/DESIGN_SYSTEM.md` with concrete component and utility conventions used in the codebase.

---

# Architecture

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Marketing copy | `content/` | Headlines, descriptions, CTAs, feature lists |
| Configuration | `config/` | URLs, site metadata, app host |
| Presentation | `components/` | Layout and rendering only — no hardcoded copy |
| Homepage sections | `components/homepage/` | Section-specific composition |
| Shared UI | `components/ui/` | Reusable primitives |

---

# Section Spacing

Standard content sections use the `Section` component:

```tsx
<Section background="background">{/* content */}</Section>
<Section background="surface">{/* content */}</Section>
```

**Padding rhythm**

| Breakpoint | Vertical padding |
|------------|------------------|
| Mobile | 72px (`py-[72px]`) |
| Tablet | 96px (`md:py-24`) |
| Desktop | 120px (`lg:py-[120px]`) |

**Exceptions**

- **Hero** — asymmetric padding for navigation clearance (`pt-8` → `lg:pt-16`)
- **Trust Bar** — compact utility strip with internal padding only

**Background alternation**

Sections alternate between `background` (#FAFBFB) and `surface` (#ffffff) to create visual rhythm without heavy dividers.

---

# Container

All sections use `components/ui/Container.tsx`:

- Max width: `75rem` (1200px)
- Horizontal padding: `px-6 md:px-8`

Never introduce ad-hoc max-width values for page-level content.

---

# Typography

| Element | Classes |
|---------|---------|
| Eyebrow | `text-sm font-medium tracking-wide text-portal-blue` |
| H1 (Hero only) | `text-4xl … lg:text-5xl font-semibold tracking-tight text-portal-navy` |
| H2 (Section) | `text-3xl sm:text-4xl font-semibold tracking-tight text-portal-navy` |
| Body | `text-base sm:text-lg leading-relaxed text-portal-navy/75` |
| Small / supporting | `text-sm text-portal-navy/70` |

Use `SectionHeader` for centred or left-aligned section introductions:

```tsx
<SectionHeader title="…" description="…" />
<SectionHeader eyebrow="…" title="…" description="…" align="left" />
```

**Spacing after headers**

- Eyebrow → H2: `mt-3`
- H2 → body: `mt-6`
- Header block → content grid: `mt-12 lg:mt-16`

---

# Buttons

Use `ButtonLink` for all action CTAs:

```tsx
<ButtonLink href={href} variant="primary">Book a Demo</ButtonLink>
<ButtonLink href={href} variant="secondary">See the Platform</ButtonLink>
```

| Property | Value |
|----------|-------|
| Height | 44px (`h-11`) |
| Radius | `rounded-button` (12px) |
| Primary | Portal Blue background, white text |
| Secondary | Surface background, navy text, muted border |
| Focus | Global `:focus-visible` outline (Portal Blue, 2px) |

Header text links (Login) remain plain `Link` components — not button-styled.

---

# Cards

Use the `Card` family from `components/ui/Card.tsx`:

```tsx
<Card interactive variant="surface">
  <IconBadge icon={Icon} />
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
</Card>
```

| Property | Value |
|----------|-------|
| Radius | `rounded-card` (20px) |
| Border | `border-muted/20` |
| Padding | `p-6 lg:p-8` |
| Shadow | `0 8px 24px -8px rgba(17,33,54,0.08)` (interactive only) |
| Hover | `-translate-y-0.5`, border emphasis |

**Variants**

- `surface` — white card on background sections
- `background` — subtle contrast card on surface sections

Set `interactive` for hover lift and shadow. All homepage feature/capability cards use `interactive`.

---

# Icons

Use `IconBadge` for card and feature icons:

| Property | Value |
|----------|-------|
| Container | `size-10` (40px) |
| Icon | `size-5` (20px) |
| Stroke | `strokeWidth={2}` |
| Colour | Portal Blue on `portal-blue/10` background |

Inline list icons (Trust Bar, Customer Experience features): `size-4`, Portal Teal.

All decorative icons include `aria-hidden="true"`.

---

# Grid Layouts

**Three-column capability grid**

```
mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8
```

**Two-column split**

```
grid items-start gap-12 lg:grid-cols-2 lg:gap-16
```

Customer Experience uses `items-center` for copy/visual balance.

---

# Images

| Asset | Path | Loading |
|-------|------|---------|
| Hero illustration | `/images/product/marketing/hero-connected-experience.png` | eager (`priority`) |
| Platform dashboard | `/images/product/marketing/platform-overview-dashboard.png` | lazy (default) |
| Customer portal | `/images/product/marketing/customer-portal.png` | lazy (default) |

**Rules**

- Always use Next.js `Image`
- Set explicit `width`/`height` or `fill` with `aspectRatio`
- Use `object-contain` for product screenshots
- Quality: `90` for marketing assets
- Alt text (or decorative marking) lives in `content/homepage.ts`

Product screenshots use `ProductShowcase` with `BrowserFrame`. The hero illustration is the one exception — see below.

---

# Signature Hero Visual (`components/homepage/HeroIllustration.tsx`)

The hero's visual identity is a single branded illustration (`hero-connected-experience.png`), not a product screenshot or an abstract composition — real dashboards, tablets and phones are showcased further down the homepage (Platform Overview, Customer Experience). It is deliberately **unframed**: no card, browser frame, device mockup or coloured background. The source artwork has a transparent background (see below) so the wave reads as if it emerges from the page rather than sitting in a picture frame.

On large screens the wave is deliberately **integrated** rather than sat beside the copy: it reaches left, underneath the text column, so it feels like one continuous composition ("headline → wave → CTAs") instead of a `Text | Image` split. It's mirrored horizontally (`-scale-x-100`) so the artwork's thin, quiet "entry" point sits near the headline and its brighter, thicker body sweeps down and out to the right past the CTAs, guiding the eye down the page rather than sideways across it.

| Property | Value |
|----------|-------|
| Width (mobile/tablet, `<lg`) | Static, in-flow: ~90% width stacked beneath the copy on mobile, scales fluidly up to `sm:max-w-[560px]`. No overlap with the copy — matches the current mobile/small-tablet behaviour exactly. |
| Width (`lg`, 1024–1279px) | `position: absolute`, fixed `650px`, reduced overlap/bleed compared to `xl` — a deliberately calmer "tablet" treatment |
| Width (`xl`, 1280px+) | `position: absolute`, fixed `1100px`, allowed to overlap further behind the text column and bleed past the viewport edge on common laptop/desktop widths |
| Horizontal position (`lg`/`xl`) | Driven by `centerOffsetPx` in `heroIllustrationLayout.ts` → `left: calc(50vw - Npx)` via CSS custom properties (`.hero-wave-wrapper` in `globals.css`). **Not** a plain `vw` value — the copy column stops growing at `max-w-content` (1200px), so plain `vw` caused the wave to drift further into the text on ultrawide screens. Current offsets: `lg: 140px`, `xl: 290px`. Lower the offset to shift the wave right; raise it to shift left. |
| Vertical position (desktop) | `topPercent` in `heroIllustrationLayout.ts` (currently `6%`), anchored by `top` only (no vertical centring) so the mirrored wave's sweep — entry near the headline, thick body near the CTAs — has room to play out down the section |
| Layering | The text column (`relative z-10`) sits in a higher stacking context than the illustration (`z-index: auto`), so the wave always renders *behind* Background → Wave → Headline/copy/CTAs, regardless of DOM order. The illustration wrapper is `pointer-events-none`, so it never intercepts clicks even where it overlaps interactive content. |
| Overflow | The `<section>` carries `relative overflow-hidden` so any bleed past the viewport (or past the section's bottom edge, reinforcing "the wave continues toward the sections below") is clipped cleanly — no horizontal scrollbar, just a "continues past the edge" illusion |
| Depth | A single, extremely low-opacity ambient glow (`bg-portal-blue/5`, `blur-[130px]`, `-inset-[15%]`, `-z-10`) extending beyond the artwork's own box, plus a soft `drop-shadow` on the image itself — both intentionally close to subconscious |
| Entrance | One-shot fade + rise: opacity `0→1`, `translateY` `24px→0`, 0.8s `easeOut` |
| Idle motion | Infinite, barely-visible float: `translateY` `0→-4px→0`, 10s `easeInOut`, looping — implemented as a separate nested `motion.div` so it never fights the entrance animation |
| Accessibility | Purely decorative alongside the headline/copy: rendered with `alt=""` and `aria-hidden="true"`; a human-readable `description` is kept in `content/homepage.ts` for maintainers |
| Reduced motion | `useReducedMotion()` disables both the idle float and the keyframed entrance (falls back to a plain opacity/position transition) |

**Image quality**

The source PNG has a transparent background, produced by removing the artwork's original opaque-white canvas (`scripts/make-hero-transparent.mjs`, "unscreen" technique against the backed-up source in `assets/source-images/`). This makes image quality non-negotiable: at the framework's default optimisation quality (75), lossy WebP/AVIF re-encoding visibly bleeds a faint haze into the alpha channel across the whole canvas, which reads as a soft rectangular box behind the artwork. `next.config.ts` allowlists `qualities: [75, 100]`, and `HeroIllustration` explicitly requests `quality={100}` to avoid this.

Copy/asset path lives in `content/homepage.ts` under `homepage.hero.illustration`.

---

# Motion

Scroll-reveal animation uses `useScrollReveal`:

```tsx
const { ref, isVisible } = useScrollReveal(0.1);

<Card reveal={isVisible} revealDelay={index * SCROLL_REVEAL_STAGGER_MS} interactive />
```

| Property | Value |
|----------|-------|
| Effect | Fade + `translate-y-4` → `translate-y-0` |
| Duration | 500ms |
| Stagger | 120ms (`SCROLL_REVEAL_STAGGER_MS`) |
| Reduced motion | `motion-reduce:` overrides disable transform/opacity transitions |

Only `BeyondTransaction` and `Features` use scroll reveal. Static sections have no entrance animation.

---

# Homepage Section Order

1. Hero
2. Trust Bar
3. Value Extension
4. Platform Overview
5. Customer Experience
6. Beyond the Transaction
7. Features

Footer — not yet implemented.

---

# Audit Checklist (Sprint 17)

When adding new sections, verify:

- [ ] Copy in `content/`, URLs in `config/`
- [ ] Uses `Section` + `Container`
- [ ] Uses `SectionHeader` for headings
- [ ] Cards use `Card` + `IconBadge`
- [ ] CTAs use `ButtonLink`
- [ ] Images use Next.js `Image` with alt text
- [ ] Heading hierarchy is semantic (one H1, H2 per section)
- [ ] Background alternates with adjacent sections
