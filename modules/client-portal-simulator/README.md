# Client Portal Simulator

Self-contained Portal Genie Client Portal simulation used for product prototyping, internal reference, and the public marketing demo.

## Purpose

This module isolates the interactive Client Portal simulator from the marketing website. Developers can read, copy, or replicate this code without searching through homepage, pricing, or navigation components.

The simulator is **not** the production Client Portal — it mirrors the product UI and behaviour using hard-coded demo data.

## Entry component

```tsx
import { ClientPortalSimulator } from "@/modules/client-portal-simulator";

<ClientPortalSimulator mode="internal" />
<ClientPortalSimulator mode="public" />
```

| Export | Description |
|--------|-------------|
| `ClientPortalSimulator` | Root client component — portal preview + customise flyout |
| `ClientPortalSimulatorLayout` | Montserrat font + simulator scroll CSS |
| `PortalDemoMode` | `"public"` \| `"internal"` |

## Architecture

```
modules/client-portal-simulator/
├── index.ts                 # Public barrel exports
├── SimulatorLayout.tsx      # Font + scroll styles wrapper
├── components/              # All UI (desktop, mobile, setup, modals)
├── state/                   # React context, reducer, mode
├── types/                   # TypeScript domain types
├── data/                    # Demo fixtures and defaults
├── utils/                   # Formatting, folders, colours, etc.
└── styles/                  # Portal-specific scroll CSS
```

### Data flow

```
data/ (fixtures + defaults)
        ↓
state/reducer.ts (DemoPortalState + actions)
        ↓
state/context.tsx (DemoPortalProvider)
        ↓
components/ (desktop + mobile UI)
```

## Desktop implementation

| Layer | Components |
|-------|------------|
| Shell | `ClientPortalSimulator` → `PortalShell` |
| Sidebar | `DemoSidebar` |
| Header | `DemoTopBar` |
| Content | `sections/*`, `documents/DocumentViews` |
| Notice board | `DemoPortalAdvertisingPanel` |
| Setup (internal) | `ClientPortalSetupToolbar` |
| Setup (public) | `DemoFloatingControls` |
| Customise | `CustomisePortalPanel` + Design / Folder / Settings tabs |

## Mobile implementation

| Layer | Components |
|-------|------------|
| Frame | `mobile/MobilePreviewDevice`, `MobileDeviceFrame` |
| Shell | `mobile/MobilePortalShell` |
| Content | `mobile/MobilePortalContent` |
| Notice board | `mobile/MobileNoticeBoardView` |
| Icons | `mobile/folder-icons` |

## Portal state

| File | Role |
|------|------|
| `state/context.tsx` | `DemoPortalProvider`, `useDemoPortal`, `usePortalDemoMode` |
| `state/reducer.ts` | `demoPortalReducer`, selectors, Save/Publish/Reset |
| `state/mode.ts` | `PortalDemoMode` type |

Key state areas: section navigation, invoices/payment selection, branding colours, folders, notice boards, welcome message, settings (password, domain), preview mode (desktop/mobile), customise panel open/saved/published snapshots.

## Demo data

| File | Contents |
|------|----------|
| `data/constants.ts` | Brand presets, demo customer (Geoff / Aurora Global), nav items, banner assets, portal link |
| `data/mock-data.ts` | Initial invoices, quotes, credit notes, agreements, documents, notes |

## Customisation system

Opened via **Customize** (internal toolbar) or floating controls (public demo).

| Tab | Component | Features |
|-----|-----------|----------|
| Design | `CustomiseDesignTab` | Portal link, branding, logos, colours, notice board, welcome message |
| Folder Management | `CustomiseFolderManagementTab` | Add/reorder/visibility/upload/landing folder |
| Settings | `CustomiseSettingsTab` | Password, custom domain, notifications |

Actions: **Save**, **Publish**, **Reset** (via `CustomiseHeaderActions` + reducer).

## Main data models

See `types/index.ts`. Key types:

- `DemoPortalState`, `DemoPortalAction`
- `PortalFolderConfig`, `NoticeBoard`
- `BrandingTheme`, `MobileDesignTheme`, `BrandPresetId`
- `Invoice`, `Quote`, `CreditNote`, `Agreement`, `StatementEntry`
- `PortalCustomisationSnapshot`

## Assets

```
public/client-portal-simulator/
├── logos/aurora-logo.svg
└── banners/
    ├── demo-banner (21 x 21 cm).png
    ├── demo-banner (21 x 21 cm) v2.png
    └── portal-genie-win-tv.png
```

Paths are defined in `data/constants.ts` (`DEFAULT_LOGO_PATH`, `BANNER_ASSETS`).

User-uploaded logos and custom notice boards use in-memory `blob:` URLs at runtime.

## Running locally

```bash
npm run dev
```

| Route | Access |
|-------|--------|
| http://localhost:3000/internal/client-portal | Direct — internal mode |
| http://localhost:3000/demo/client-portal | Email verification gate → public mode |

## Public demo

Route: `app/demo/client-portal/page.tsx`

Verification (`DemoAccessGate`, `lib/demo-auth/*`) stays **outside** this module. After verification:

```tsx
<ClientPortalSimulator mode="public" />
```

## Internal mode

Route: `app/internal/client-portal/page.tsx`

```tsx
<ClientPortalSimulator mode="internal" />
```

Shows the setup toolbar instead of floating controls; customise panel is contained in the preview area.

## External dependencies

The module intentionally depends on:

| Dependency | Why |
|------------|-----|
| `react`, `react-dom` | UI |
| `next/font/google` | Montserrat in `SimulatorLayout` |
| `lucide-react` | Icons |
| Tailwind / site CSS tokens | `portal-blue`, `portal-navy`, `muted`, `background` in a few shared-style components |

It does **not** import marketing pages, analytics wrappers, header/footer, or pricing content.

Site-level coupling (outside module):

- `AppChrome` hides marketing header on `/demo/*` and `/internal/client-portal`
- `GenieClientRoot` hides chat widget on demo route
- Route pages handle SEO metadata and demo verification

## Porting / replication notes

To use this simulator as a reference or copy into another project, take:

```
modules/client-portal-simulator/     # entire directory
public/client-portal-simulator/      # static assets
```

Wire a thin route:

```tsx
import { ClientPortalSimulator, ClientPortalSimulatorLayout } from "@/modules/client-portal-simulator";
```

Ensure Tailwind includes the module path and site colour tokens (or replace `portal-blue` / `portal-navy` classes in `PortalSettingToggle.tsx`).

Do **not** copy `components/demo-access/`, `lib/demo-auth/`, or `app/api/demo/*` unless you need the marketing verification gate.
