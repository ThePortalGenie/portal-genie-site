# Portal Genie — Cursor Agent Rules

These rules define how Cursor Agent should work on the Portal Genie marketing website.

Follow these rules for every implementation task.

---

# Before You Start

Before making any implementation changes:

1. Read `docs/PROJECT_BRIEF.md`
2. Read `docs/DESIGN_SYSTEM.md`
3. Read `docs/CURSOR_RULES.md`
4. Inspect the existing implementation before editing.
5. Make the smallest change that completes the requested task.

---

# 1. Source of Truth

The following documents are the project's source of truth:

- `docs/PROJECT_BRIEF.md`
  - Business strategy
  - Target audience
  - Product positioning
  - Messaging
  - Product direction

- `docs/DESIGN_SYSTEM.md`
  - Brand identity
  - Colours
  - Typography
  - Layout
  - Spacing
  - Visual principles

Read these documents before any meaningful implementation task.

Do not invent product positioning, messaging, or visual direction that conflicts with them.

---

# 2. Development Philosophy

Build the project incrementally.

- Work in small, reviewable tasks.
- Complete one feature before starting the next.
- Do not rewrite unrelated files.
- Preserve the existing project structure.
- Prefer simple, maintainable solutions over clever abstractions.
- Avoid unnecessary complexity.
- Do not install packages unless explicitly requested or genuinely required.

---

# 3. Product Positioning

Portal Genie is:

> **The Customer Experience Layer for Xero businesses.**

Do not describe Portal Genie as:

- simply a client portal
- just another Xero integration
- accounting software
- an ERP

Always communicate customer outcomes before technical features.

Respect the Xero ecosystem while keeping Portal Genie positioned as its own premium SaaS platform.

---

# 4. Design Principles

Follow the official design system.

Use:

- Official Portal Genie colours
- Inter typography
- Existing design tokens
- Consistent spacing
- Responsive layouts
- Accessible components
- Semantic HTML

The visual style should feel:

- Premium
- Modern
- Clean
- Confident
- Minimal
- Professional

Aim for the design quality of products like Stripe, Linear, Vercel, and Notion while remaining recognisably Portal Genie.

Do not introduce dark mode unless explicitly requested.

---

# 5. Implementation Standards

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS

Prefer:

- reusable components
- composition over duplication
- existing design tokens
- reusable layouts

Avoid:

- inline styles unless necessary
- unnecessary abstractions
- placeholder UI libraries
- icon libraries without approval
- unnecessary dependencies

Keep components focused, readable, and easy to maintain.

---

# 6. Validation

After implementation:

Run:

```bash
npm run build
```

Then report:

- Summary of changes
- Files changed
- Build result
- Warnings
- Errors
- Any recommendations for the next logical task

Do not claim success if the build or validation fails.

---

# 7. Git Workflow

Do not commit or push unless explicitly instructed.

Keep each implementation suitable for a single focused Git commit.

---

# 8. User Experience

Protect the quality of the existing codebase.

- Preserve working code unless the task requires changing it.
- If multiple approaches are reasonable, choose the simplest.
- Build reusable components before page-specific implementations.
- Prefer consistency over cleverness.
- Maintain accessibility.
- Maintain responsive behaviour.
- Keep animations subtle and purposeful.
- When requirements are unclear, ask rather than guessing.

---

# 9. Definition of Done

A task is complete only when:

- The requested feature is implemented.
- Existing functionality remains intact.
- The project builds successfully.
- The code matches the Project Brief.
- The implementation follows the Design System.
- The solution is production-ready.