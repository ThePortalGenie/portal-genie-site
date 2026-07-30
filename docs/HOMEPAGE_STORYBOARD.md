# Portal Genie — Homepage Storyboard

**Version:** 1.0  
**Status:** Active  
**Purpose:** Single source of truth for homepage narrative, content, visuals, and interactions

This document defines the complete homepage story, section-by-section blueprint, and visual asset strategy. It aligns with `docs/PROJECT_BRIEF.md`, `docs/DESIGN_SYSTEM.md`, `docs/HOMEPAGE.md`, and `docs/SITEMAP.md`.

When building or refining homepage sections, read this document first.

---

## Homepage narrative arc

The homepage tells one story in sequence:

1. **Immediate clarity** — What is The Portal Genie, and who is it for?
2. **Trust** — Why should a Xero business take this seriously?
3. **Positive positioning** — The Portal Genie complements and extends Xero.
4. **Platform proof** — What The Portal Genie brings together as one experience.
5. **Recognition** — Visitors see their current customer experience challenges.
6. **Category clarity** — The Customer Experience Layer sits between Xero and customers.
7. **Capability depth** — Outcome-led features, not a feature dump.
8. **Xero relationship** — Works alongside Xero; never replaces it.
9. **Audience relevance** — This is for owners, finance teams, operations, and practice staff.
10. **Outcomes** — What the business gains.
11. **Proof** — Real businesses, real results.
12. **Confidence** — FAQ removes uncertainty.
13. **Action** — Book a Demo.

**Primary goal:** Generate demo bookings.  
**Primary CTA:** Book a Demo (`content/buttons.ts` → `config/links.ts`)  
**Secondary CTA:** See the Platform

**Five-second test:** I use Xero → The Portal Genie works with Xero → it improves my customer's experience → it reduces administration → it is simple to implement → I should book a demo.

---

## Brand messaging rules (homepage)

Always refer to **The Portal Genie** by full name where appropriate. Use "Portal Genie" only where it reads naturally in body copy.

**Preferred language**

- Built for Xero businesses
- Works alongside Xero
- Complements Xero
- Extends the value of Xero
- Customer Experience Layer

**Avoid**

- Replacing Xero
- Fixing Xero
- Implying Xero is lacking
- Criticism of Xero or Xero businesses
- Describing The Portal Genie as merely a client portal or Xero integration

---

## Visual asset strategy

All homepage visuals should be stored in structured directories under `public/images/`.

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `public/images/product/` | Real Portal Genie product screenshots | Dashboard, customer portal, documents, messaging, payments |
| `public/images/illustrations/` | Minimal diagrams and supporting visuals | Customer Experience Layer diagram, workflow illustrations |
| `public/images/frames/` | Browser and device frames for presenting screenshots | Browser chrome, desktop frame, mobile frame |
| `public/images/logos/` | Brand logos (existing) | Primary logo, white logo |

**Visual priority:** Real product before illustrations. Use illustrations only when a screenshot cannot explain the concept.

**Naming convention:** `{section}-{subject}-{variant}.{ext}`  
Examples: `hero-dashboard-desktop.png`, `platform-documents-portal.png`, `diagram-customer-experience-layer.svg`

---

## Section index

| # | Section | Component | Status | Content source |
|---|---------|-----------|--------|----------------|
| — | Header | `components/navigation/Header.tsx` | Built | `content/navigation.ts`, `config/links.ts`, `config/site.ts` |
| 1 | Hero | `components/homepage/Hero.tsx` | Built | `homepage.hero` |
| 2 | Trust Bar | `components/homepage/TrustBar.tsx` | Built | `homepage.trustBar` |
| 3 | Value Extension | `components/homepage/ValueExtension.tsx` | Built | `homepage.valueExtension` |
| 4 | Platform Overview | `components/homepage/PlatformOverview.tsx` | Built | `homepage.platformOverview` |
| 5 | The Problem | `components/homepage/Problem.tsx` | Planned | `homepage.problem` |
| 6 | Customer Experience Layer | `components/homepage/ExperienceLayer.tsx` | Planned | `homepage.experienceLayer` |
| 7 | Core Features | `components/homepage/CoreFeatures.tsx` | Planned | `homepage.coreFeatures` |
| 8 | Xero Relationship | `components/homepage/XeroRelationship.tsx` | Planned | `homepage.xeroRelationship` |
| 9 | Audience | `components/homepage/Audience.tsx` | Planned | `homepage.audience` |
| 10 | Customer Outcomes | `components/homepage/CustomerOutcomes.tsx` | Planned | `homepage.customerOutcomes` |
| 11 | Customer Proof | `components/homepage/CustomerProof.tsx` | Planned | `homepage.customerProof` |
| 12 | FAQ | `components/homepage/Faq.tsx` | Planned | `homepage.faq` |
| 13 | Final CTA | `components/homepage/FinalCta.tsx` | Planned | `homepage.finalCta` |
| — | Footer | `components/navigation/Footer.tsx` | Planned | `content/navigation.ts`, `content/footer.ts` |

---

## Global — Header

**Purpose**  
Provide persistent navigation and primary actions across the homepage journey.

**Key message**  
The Portal Genie is a premium SaaS platform built for Xero businesses.

**Content source**  
- Labels: `content/navigation.ts`  
- URLs: `config/links.ts`  
- Logo: `config/site.ts`

**Primary visual**  
Official Portal Genie logo (`public/images/logos/portal-genie-logo.png`)

**Emotional outcome**  
Calm confidence. The site feels established, trustworthy, and easy to navigate.

**Animations / interactions**  
- Sticky header with subtle backdrop blur  
- Nav link hover: Portal Blue colour + underline (200ms)  
- Mobile menu panel (planned)  
- No parallax or heavy motion

---

## Section 1 — Hero

**Purpose**  
Immediately explain what The Portal Genie is, who it is for, and what to do next.

**Key message**  
The Portal Genie is the Customer Experience Layer for Xero businesses.

**Content source**  
`content/homepage.ts` → `homepage.hero`

| Element | Current copy |
|---------|--------------|
| Eyebrow | Built for Xero businesses |
| Headline | The Customer Experience Layer for Xero businesses. |
| Supporting copy | Transform how your customers interact… / Deliver a modern self-service experience… |
| Value statements | Built for Xero businesses · Works alongside Xero · No disruption to existing workflows |
| Primary CTA | Book a Demo |
| Secondary CTA | See the Platform |

**Primary visual**  
Product mock-up in browser frame.

| Phase | Asset | Location |
|-------|-------|----------|
| Current | CSS/HTML product mock-up | `components/homepage/ProductMockup.tsx` |
| Target | Real dashboard screenshot in browser frame | `public/images/product/hero-dashboard-desktop.png` wrapped in `public/images/frames/browser-desktop.png` |

**Emotional outcome**  
Immediate understanding and curiosity. Visitor thinks: "This looks like real software, built for businesses like mine."

**Animations / interactions (planned)**  
- None currently  
- Future: subtle fade-in on load (respect `prefers-reduced-motion`)  
- No continuous animation on mock-up

---

## Section 2 — Trust Bar

**Purpose**  
Build immediate credibility without dominating the page.

**Key message**  
The Portal Genie is built for Xero businesses and works alongside existing workflows.

**Content source**  
`content/homepage.ts` → `homepage.trustBar`

| Item |
|------|
| Built for Xero businesses |
| Works alongside Xero |
| No disruption to existing workflows |
| Secure cloud platform |

**Primary visual**  
Lucide check icons only. No photography or screenshots.

**Emotional outcome**  
Reassurance. Low-friction confirmation that this fits their world.

**Animations / interactions**  
None. Static, understated strip with subtle top/bottom borders.

---

## Section 3 — Value Extension

**Purpose**  
Position The Portal Genie as complementing and extending the value of Xero — not replacing it.

**Key message**  
Extend the value of Xero for your customers.

**Content source**  
`content/homepage.ts` → `homepage.valueExtension`

| Card | Title |
|------|-------|
| 1 | Connected customer experience |
| 2 | More time for meaningful work |
| 3 | Works alongside Xero |

**Primary visual**  
Lucide icons in subtle Portal Blue icon containers. No illustration.

**Emotional outcome**  
Optimism and alignment. Visitor feels The Portal Genie enhances what they already trust in Xero.

**Animations / interactions (planned)**  
- None currently  
- Future: optional subtle card hover lift (border emphasis only, no shadow glow)

---

## Section 4 — Platform Overview

**Purpose**  
Introduce The Portal Genie as a unified customer experience platform — not a feature list, but the capabilities that form one cohesive product.

**Key message**  
One platform for the complete customer experience.

**Content source**  
`content/homepage.ts` → `homepage.platformOverview`

| Pillar |
|--------|
| Secure Customer Portal |
| Document Management |
| Secure Messaging |
| Online Payments |
| Digital Forms & Workflows |
| Customer Self-Service |

**Primary visual**  
Product mock-up above pillar grid (current). Target: real platform screenshot.

| Phase | Asset | Location |
|-------|-------|----------|
| Current | Shared product mock-up | `components/homepage/ProductMockup.tsx` |
| Target | Platform overview screenshot | `public/images/product/platform-overview-desktop.png` |
| Future per pillar | Optional pillar-specific screenshots | `public/images/product/platform-{pillar-slug}.png` |

**Emotional outcome**  
Comprehension. Visitor sees a complete, credible platform — not a single-purpose tool.

**Animations / interactions (planned)**  
- None currently  
- Future: optional screenshot carousel or tab switch between pillar views (minimal, purposeful)

---

## Section 5 — The Problem (planned)

**Purpose**  
Help visitors recognise customer experience frustrations in their own business — without criticising Xero.

**Key message**  
Customer expectations have moved beyond email and manual document sharing.

**Content source (planned)**  
`content/homepage.ts` → `homepage.problem`

**Supporting content themes**

- Customers request the same documents repeatedly
- Communication is fragmented across email
- Administration consumes valuable team time
- The customer experience feels less professional than the business behind it

**Primary visual**  
Minimal illustration or abstract representation of fragmentation — not negative Xero imagery.

| Asset | Location |
|-------|----------|
| Fragmented experience illustration | `public/images/illustrations/problem-fragmented-experience.svg` |

**Emotional outcome**  
Recognition. Visitor thinks: "Yes, that's our business — but Xero isn't the issue; the customer experience layer is missing."

**Animations / interactions (planned)**  
- Subtle fade-in on scroll  
- No distracting motion

---

## Section 6 — Customer Experience Layer (planned)

**Purpose**  
Show visually where The Portal Genie fits in the relationship between Xero and customers.

**Key message**  
Xero runs your business. The Portal Genie runs your customer experience.

**Content source (planned)**  
`content/homepage.ts` → `homepage.experienceLayer`

**Diagram structure**

```
Xero
  ↓
The Portal Genie — Customer Experience Layer
  ↓
Your Customers
```

**Primary visual**  
Core category diagram — owned visual asset.

| Asset | Location |
|-------|----------|
| Customer Experience Layer diagram | `public/images/illustrations/diagram-customer-experience-layer.svg` |

**Emotional outcome**  
Clarity. Visitor understands the category and The Portal Genie's role instantly.

**Animations / interactions (planned)**  
- Optional subtle step reveal on scroll (fade/slide, 200ms stagger)  
- Respects reduced motion

---

## Section 7 — Core Features (planned)

**Purpose**  
Present major capabilities linked to customer outcomes — not a technical feature dump.

**Key message**  
Every capability exists to improve the customer's experience.

**Content source (planned)**  
`content/homepage.ts` → `homepage.coreFeatures`

**Feature themes (outcome-led)**

- Customers always know where to find their invoices
- Give customers instant access to everything they need
- Make getting paid simple
- Reduce repeated document sending
- Provide secure customer self-service
- Strengthen your brand with a professional experience

**Primary visual**  
Real product screenshots per feature — one screenshot per feature block.

| Asset | Location |
|-------|----------|
| Feature screenshots | `public/images/product/feature-{slug}.png` |

**Emotional outcome**  
Confidence in depth. Visitor sees practical value beyond the overview.

**Animations / interactions (planned)**  
- Optional alternating layout (text left / screenshot right)  
- Screenshot hover: none or subtle border emphasis only

---

## Section 8 — Xero Relationship (planned)

**Purpose**  
Reinforce that The Portal Genie works with Xero, complements Xero, and never replaces it.

**Key message**  
Your team continues working in Xero. Your customers get a better experience.

**Content source (planned)**  
`content/homepage.ts` → `homepage.xeroRelationship`

**Primary visual**  
Split visual: Xero workflow (business side) + Portal Genie customer portal (customer side). Do not imply official Xero endorsement.

| Asset | Location |
|-------|----------|
| Xero + Portal Genie relationship visual | `public/images/illustrations/xero-relationship-workflow.svg` |
| Customer portal screenshot | `public/images/product/xero-customer-portal.png` |

**Emotional outcome**  
Safety. Visitor feels this extends their existing investment in Xero.

**Animations / interactions (planned)**  
- None or minimal diagram highlight on scroll

---

## Section 9 — Audience (planned)

**Purpose**  
Help different visitor types see themselves in the story.

**Key message**  
The Portal Genie is built for the people who run and serve Xero businesses.

**Content source (planned)**  
`content/homepage.ts` → `homepage.audience`

**Audience groups**

- Business owners and managing directors
- Finance and office managers
- Operations and administrators
- Accountants and bookkeepers

**Primary visual**  
Text-led cards with Lucide icons. No stock photography in MVP.

**Emotional outcome**  
Personal relevance. Visitor thinks: "This is for someone like me."

**Animations / interactions (planned)**  
None.

---

## Section 10 — Customer Outcomes (planned)

**Purpose**  
Shift focus from software to business results.

**Key message**  
The Portal Genie helps Xero businesses deliver outcomes, not just software.

**Content source (planned)**  
`content/homepage.ts` → `homepage.customerOutcomes`

**Outcome themes**

- Reduce administration
- Improve customer satisfaction
- Save valuable staff time
- Deliver a premium customer experience
- Improve payment completion
- Strengthen your brand

**Primary visual**  
Outcome stat cards or icon grid. No fabricated metrics until verified.

**Emotional outcome**  
Motivation. Visitor connects product capabilities to business value.

**Animations / interactions (planned)**  
- Optional count-up for verified statistics only (future, when data available)

---

## Section 11 — Customer Proof (planned)

**Purpose**  
Build trust through testimonials, case studies, and business outcomes.

**Key message**  
Xero businesses are already delivering better customer experiences with The Portal Genie.

**Content source (planned)**  
`content/homepage.ts` → `homepage.customerProof`

**Primary visual**  
Real testimonials and case study quotes. Real business names and outcomes only — no placeholder claims.

| Asset | Location |
|-------|----------|
| Customer logos (when approved) | `public/images/logos/customers/{name}.png` |

**Emotional outcome**  
Social proof. Visitor thinks: "Others like me trust this."

**Animations / interactions (planned)**  
- Optional testimonial carousel (minimal, manual or auto with pause)  
- Respects reduced motion

---

## Section 12 — FAQ (planned)

**Purpose**  
Reduce uncertainty and pre-empt implementation objections.

**Key message**  
The Portal Genie is straightforward to understand and implement alongside Xero.

**Content source (planned)**  
`content/homepage.ts` → `homepage.faq`

**Question themes**

- Does it replace Xero?
- Is it difficult to implement?
- Can customers access documents securely?
- Can it be customised?
- Is support included?

**Primary visual**  
Text-only accordion. No imagery required.

**Emotional outcome**  
Confidence and reduced friction before demo booking.

**Animations / interactions (planned)**  
- Accordion expand/collapse (200ms height transition)  
- Keyboard accessible with visible focus states

---

## Section 13 — Final CTA (planned)

**Purpose**  
Close the homepage with a clear invitation to book a demonstration.

**Key message**  
Your customers always know where to go.

**Content source (planned)**  
`content/homepage.ts` → `homepage.finalCta`  
CTA label: `content/buttons.ts` → `buttons.bookDemo`  
URL: `config/links.ts` → `links.bookDemo`

**Primary visual**  
Text-led CTA block on Portal Navy background. No illustration.

**Emotional outcome**  
Decision. Visitor is ready to take the next step.

**Animations / interactions (planned)**  
- Button hover: Portal Blue darken (200ms)  
- No entrance animations

---

## Global — Footer (planned)

**Purpose**  
Provide site navigation, legal links, and persistent access to Login and Book a Demo.

**Key message**  
The Portal Genie is a complete, trustworthy platform.

**Content source (planned)**  
- `content/navigation.ts`  
- `content/footer.ts` (planned)  
- `config/links.ts`

**Primary visual**  
Portal Navy background, white text, logo mark.

**Emotional outcome**  
Continued trust and easy access to next steps.

**Animations / interactions**  
Link hover colour transition only.

---

## Content architecture reference

All homepage copy lives in `content/homepage.ts` under the `homepage` object. Components render content only — no hardcoded marketing copy.

| Key | Section | Status |
|-----|---------|--------|
| `homepage.hero` | Hero | Built |
| `homepage.trustBar` | Trust Bar | Built |
| `homepage.valueExtension` | Value Extension | Built |
| `homepage.platformOverview` | Platform Overview | Built |
| `homepage.problem` | The Problem | Planned |
| `homepage.experienceLayer` | Customer Experience Layer | Planned |
| `homepage.coreFeatures` | Core Features | Planned |
| `homepage.xeroRelationship` | Xero Relationship | Planned |
| `homepage.audience` | Audience | Planned |
| `homepage.customerOutcomes` | Customer Outcomes | Planned |
| `homepage.customerProof` | Customer Proof | Planned |
| `homepage.faq` | FAQ | Planned |
| `homepage.finalCta` | Final CTA | Planned |

Button labels: `content/buttons.ts`  
URLs: `config/links.ts`  
Company and site config: `config/company.ts`, `config/site.ts`

---

## Design and motion principles

Apply `docs/DESIGN_SYSTEM.md` to every section.

- Generous whitespace (72px mobile / 96px tablet / 120px desktop section spacing)
- Restrained colour: ~80% off-white, ~15% Portal Navy, ~5% accents
- Prefer borders over shadows
- No gradients, glassmorphism, or heavy shadows
- Real product screenshots over generic illustrations
- All motion must respect `prefers-reduced-motion`
- Fade, slide, and hover only — no parallax or continuous movement

---

## Implementation checklist

When building a new homepage section:

1. Read this storyboard for purpose, message, visual, and emotional outcome
2. Add content to `content/homepage.ts`
3. Create component in `components/homepage/`
4. Add section to `app/page.tsx` in storyboard order
5. Place visual assets in the correct `public/images/` directory
6. Run `npm run build`
7. Verify responsive behaviour and accessibility

---

## Definition of success

A visitor completes the homepage journey thinking:

> "I already use Xero. The Portal Genie is exactly what my business has been missing. It doesn't replace Xero — it completes it. I should book a demo."

If the homepage consistently creates that reaction, it has achieved its purpose.
