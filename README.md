# DPM Enterprise Automation

A Cloudflare Pages + React lead-discovery and CRM starter for DPM Enterprise Private Limited.

## Current MVP
- React dashboard and lead pipeline
- Manual lead capture
- Pipeline stages: New → Verified → Contact Ready → Contacted → Follow-up → Won / Closed
- Public-source project hunting using Tavily search API
- D1 persistence when configured
- Approval-first approach: no automatic bulk email or calling

## Deploy
1. Connect this repository to Cloudflare Pages.
2. Build command: `npm run build`; output: `dist`.
3. Create a Cloudflare D1 database named `dpm-leads`.
4. Run `db/schema.sql` in D1 Console.
5. Add Pages binding `DB` to the D1 database.
6. Set environment variable `TAVILY_API_KEY` for live public search.
7. Deploy.

## API
- `GET /api/health`
- `GET /api/leads`
- `POST /api/leads`
- `PATCH /api/leads/:id`
- `POST /api/hunt`

## Roadmap
1. Scheduled public-source searches and query rotation.
2. Deduplication, buyer matching, and lead verification.
3. Outreach draft queue with human approval.
4. Email integration after approval.
5. Click-to-call / call task creation, not unattended cold calling.
6. Daily digest, follow-up reminders, and audit history.

Never commit API keys. Search results are candidate leads and must be independently verified before outreach.