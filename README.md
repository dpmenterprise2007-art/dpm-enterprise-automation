# DPM Nexus ERP

DPM Enterprise Private Limited's modular ERP workspace, deployed through Cloudflare Pages.

## ERP shell currently committed
- Responsive ERP dashboard and sidebar module navigation
- **150 route/page catalog** organized into 15 groups: Overview, Sales CRM, Projects, Interior Design, BOQ & Estimation, Procurement, Inventory, Manufacturing, Marketplace, Finance, HR & Team, Field Operations, AI Studio, Automation & Integrations, System
- Global route search
- Quick launch shortcuts
- Module template with Overview/Records/Activity/Settings tabs
- AI-ready module layout
- Marketplace and Updater/Release pages in the route catalog
- React + Vite + React Router

## Important status
This commit is the **ERP front-end foundation / route shell**, not a completed production ERP. Many modules are page templates and are not yet backed by database workflows. AI actions, marketplace checkout/vendor sync, and safe automatic updates need service integrations and backend implementation. Do not treat the UI placeholders as operational features.

## Build
- Install: `npm install`
- Development: `npm run dev`
- Production build: `npm run build`
- Preview: `npm run preview`
- Cloudflare Pages build command: `npm run build`
- Cloudflare Pages output: `dist`

## Existing lead automation API
The earlier lead-hunting API and scheduled worker remain in the repo:
- `POST /api/hunt` (requires `TAVILY_API_KEY`)
- `GET /api/leads`
- `POST /api/leads`
- `PATCH /api/leads/:id`
- `GET /api/health`

## Planned production rollout
1. Authentication, organizations, role-based access control and tenant separation.
2. Shared database schema and migration framework.
3. CRM, projects, BOQ, procurement, inventory, production, finance, HR and field workflows.
4. AI gateway with model routing, tool permissions, audit trail and budget limits.
5. Marketplace vendor onboarding, product catalog, RFQs and purchase/order workflows.
6. Updater: signed release manifest, compatibility checks, backup, staged rollout, health checks, rollback. No unattended destructive updates.
7. Tests, monitoring, backup/recovery and security review.

## Credentials
Keep API keys and secrets in Cloudflare environment variables/secrets, never commit them to Git.