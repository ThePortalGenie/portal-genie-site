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
| Hero laptop (dashboard) | `/images/product/marketing/platform-overview-dashboard.png` | `priority` |
| Hero tablet (customer portal) | `/images/product/marketing/customer-portal.png` | lazy (default) |
| Hero phone (mobile portal) | `/images/product/marketing/mobile-portal.jpg` | lazy (default) |
| Platform dashboard | `/images/product/marketing/platform-overview-dashboard.png` | lazy (default) |
| Customer portal | `/images/product/marketing/customer-portal.png` | lazy (default) |

**Rules**

- Always use Next.js `Image`
- Set explicit `width`/`height` or `fill` with `aspectRatio`
- Use `object-contain` for product screenshots
- Quality: `90` for marketing assets
- Alt text lives in `content/homepage.ts`

Product screenshots use `ProductShowcase` with `BrowserFrame`. The hero device stack uses its own compact frames (see below) rather than `BrowserFrame`.

---

# Signature Hero Visual (`components/homepage/HeroVisual.tsx`)

The hero's visual identity is a **product showcase**, not a generic illustration: one dominant dashboard, floating in open space, with a slow-drifting ribbon system as Portal Genie's signature backdrop. The core principle is *one focal point — everything else supports it*. Reusable pieces live in `components/ui/hero/`:

| Component | Responsibility |
|-----------|----------------|
| `GlowLayer` | Soft radial lighting (blue/teal/white blooms) — no flat backgrounds, no linear gradients |
| `AnimatedWave` | One flowing translucent ribbon (transform-only loop, heavy blur) — Portal Genie's signature motif |
| `DeviceStack` | Laptop (dominant, ~84% width, `rotateX(4deg)` perspective), tablet (lower-right, `rotate(6deg)`, ~55% of laptop), phone (lower-left, `rotate(-8deg)`, ~35% of laptop, overlapping); each has a subtle idle float only — rotation is fixed, not animated |
| `ConnectorLines` | Short, low-opacity SVG stubs (not long sweeping curves) that trace once via `pathLength` on scroll into view |
| `FloatingBadge` | Compact (~48px tall) glass "capability node" — icon + one line of text, deliberately secondary |

**Layering (back to front)**

1. `GlowLayer` — radial lighting
2. `AnimatedWave` ribbons — pass *behind* the devices
3. Laptop — the focal point
4. Tablet + phone — overlap the laptop's corners
5. `FloatingBadge` nodes — quiet, placed in the surrounding negative space, never over a device

**Conventions**

- All hero visual components are `"use client"` and the whole composition is `aria-hidden` — decorative only; hero copy remains in a plain server-rendered column
- Motion respects `useReducedMotion()` from Framer Motion (disables floats/ribbon drift) in addition to the site's `motion-reduce:` Tailwind convention used elsewhere
- Ribbon durations are intentionally long (45s/65s/90s) so drift reads as ambient, not "animated"
- Device rotation is a fixed perspective transform, not a looping animation — only a small Y float (3–6px) keeps them feeling alive
- Ribbon and connector layers are hidden progressively on smaller breakpoints (`hidden sm:flex`, `hidden lg:flex`, `hidden md:block`) rather than unmounted, keeping the mobile composition simple
- Only `transform`, `opacity` and SVG `pathLength` are animated — no animated layout properties
- Leave generous negative space around the composition; do not fill every corner
- Copy (badge labels) and image sources live in `content/homepage.ts` under `homepage.hero.visual`

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
