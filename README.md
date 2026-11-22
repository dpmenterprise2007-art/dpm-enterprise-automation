# DPM Enterprise + DPM Nexus — Unified Platform

A unified digital platform for **DPM Enterprise Private Limited**. The public-facing company website and internal Nexus ERP live in one React application and share brand/navigation.

## Current implementation (frontend foundation)
- Premium public company homepage with service sections, contact CTA, and Nexus entry links.
- DPM Nexus ERP responsive shell with 15 business module groups and 150 catalog routes.
- Search across module/page routes.
- Workspace dashboard with quick links and status indicators.
- Generic record workspace for module pages: create, search and delete records.
- Browser-local persistence for prototype records (localStorage).
- Responsive sidebar, mobile layout, and shared design system.

> **Prototype boundary:** Current saved records are local to the browser. This is not yet a multi-user production database. Auth, shared server-side persistence, permissions, real integrations, and AI provider credentials must be configured and implemented before production operational use.

## Public website sections
- Brand / interior / turnkey / furniture manufacturing
- Services: residential, corporate, commercial, institutional, kitchens, custom furniture
- Company overview and project process
- Project discovery CTA and enquiry contact links
- Direct phone, email and WhatsApp links

## Nexus modules (150 route catalog)
Overview, Sales CRM, Projects, Interior Design, BOQ & Estimation, Procurement, Inventory, Manufacturing, Marketplace, Finance, HR & Team, Field Operations, AI Studio, Automation & Integrations, System.

## Technology
- React 18 + Vite
- React Router 6
- Lucide React icons
- Cloudflare Pages static frontend

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```
Cloudflare Pages: build command `npm run build`; output directory `dist`.

## Backend roadmap
1. Auth and tenant/company roles.
2. Shared database schema and migrations (Cloudflare D1 or Supabase; select and configure).
3. API validation, rate limiting and audit trail.
4. CRM, leads, contacts, quotes, project, BOQ and procurement workflows.
5. Finance, inventory, manufacturing, HR and field modules.
6. AI gateway with scoped tools, model routing, secrets, budgets and audit.
7. Marketplace vendors, catalog, RFQs and order lifecycle.
8. Email/WhatsApp integrations, automations, scheduler and webhooks.
9. Signed updater, version compatibility, backups, health checks and rollback.
10. Unit/integration/E2E tests, monitoring, security and release checks.

## Existing API notes
Earlier lead automation endpoints exist in the repository. Verify their current implementation and required Cloudflare bindings/secrets before relying on them:
- `POST /api/hunt`
- `GET /api/leads`
- `POST /api/leads`
- `PATCH /api/leads/:id`
- `GET /api/health`

Never commit secrets or API keys.