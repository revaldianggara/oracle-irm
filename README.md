# ClearSight RM

I want to redesign and SIMPLIFY the UI of an existing internal banking application

called "Intelligence Relationship Management Application (IRMA)" — a tool used by

bank Relationship Managers (RMs) to manage customer portfolios with AI assistance.

Build an interactive front-end prototype (mock/sample data is fine, no real backend

needed) that demonstrates the simplified design.

## Current design (what to simplify FROM)

- Dark navy theme: background #060c1a, card surface #0f1e35, borders #1a2e4a

- Accent colors: Oracle red #c74634, cyan #00ccff, gold #ffb830, plus separate

  green/orange/red status colors for ok/warn/danger states — currently 5+ accent

  colors competing for attention

- Left sidebar (228px) using informal pictograph-style icons (not a proper icon

  library) next to each nav label, grouped into 5 sections, 13 total navigation

  items: RM Dashboard, Customer 360, Calendar, Maturity Reminder, Product

  Recommendation, Product Approval Management, Campaign Management, Portfolio

  Alerts, AI Digital Assistant, Executive Dashboard, Performance Monitor,

  Compliance, Admin Console

- Top header with breadcrumb, date, a "PAF" system-status chip, language toggle

  (EN/ID), theme toggle, notification bell

- Dense card-grid layout: KPI cards, data tables, tag/chip badges, two-panel

  list+detail views for alerts

## What "simplify" means for this redesign — please apply these principles

1. Reduce the color palette to ONE primary accent color (keep Oracle red

   #c74634 as the brand color) + a neutral gray scale + a single semantic

   set for status (success/warning/critical) — no cyan/gold competing accents

2. Consolidate the 13 sidebar items into fewer, clearer groups — merge

   related items (e.g. group Maturity Reminder + Product Recommendation +

   Campaign Management under one "Engagement" area) and consider moving

   low-frequency items (Performance Monitor, Compliance, Admin Console)

   into a secondary/settings area instead of the primary nav

3. Use a professional, consistent icon set from a proper icon library —

   Lucide Icons (lucide.dev) is preferred (outline style, 1.5-2px stroke).

   Do not use emoji or pictograph characters anywhere in the UI, including

   the sidebar, header, buttons, or status indicators

4. Increase whitespace and reduce card density — fewer nested borders/boxes,

   clearer visual hierarchy (one dominant action per screen instead of many

   competing cards)

5. Simplify the two-panel alert list+detail pattern into a cleaner

   master-detail layout with less chrome

6. Keep information density appropriate for a professional banking tool —

   this is not a consumer app, but it currently feels cluttered; aim for

   "clean enterprise SaaS" (e.g. Linear, Stripe Dashboard) rather than

   "dense terminal dashboard"

## What to keep unchanged (functionality, not visuals)

- Same core screens and their purpose — do not remove functionality, only

  simplify how it's presented

- Oracle red as the brand identity color

- English content only for this prototype (ignore the bilingual EN/ID toggle

  for now — just build the English version)

## Functional requirement — this must be a working prototype, not a static mockup

ALL 13 sidebar navigation items must be clickable and lead to a real, populated

screen — no "coming soon" placeholders and no dead links. Specifically:

- Every sidebar item switches to its own screen when clicked, with the active

  item visually highlighted

- Every screen is filled with realistic sample banking data (fictional customer

  names, portfolio values, dates, alerts) — not empty states

- Every interactive element within each screen actually works: clicking a

  customer row opens that customer's detail/profile, clicking an alert opens

  its detail/triage view, tabs switch content, buttons trigger a visible

  state change (e.g. a confirmation, a modal, a status update), form inputs

  are editable, the AI Digital Assistant chat accepts input and returns a

  sample response

- The header controls (theme toggle, notification bell, etc.) must also be

  functional, not decorative

- Apply the simplification principles above (colors, icons, spacing, grouping)

  consistently across all 13 screens, not just a subset

Build all 13 screens listed above as a fully clickable, navigable prototype

sharing one sidebar/header shell. Use a modern component library (shadcn/ui

style is ideal, paired with Lucide Icons) so the result is easy to translate

back into production code.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://oracle-irm.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60b509a7-b21f-4b97-a775-1f9129fa9fc5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
