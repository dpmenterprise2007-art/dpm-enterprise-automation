# DPM Enterprise Automation

Cloudflare Pages + React lead-discovery and CRM for DPM Enterprise Private Limited.

## Built so far
- React dashboard, lead pipeline, manual lead capture and stage controls
- Live public-source project search using Tavily
- Candidate search results saved into D1 (when D1 is configured)
- Scheduled daily public-source lead hunt worker (separate Cloudflare Worker)
- URL deduplication, lead scoring, build workflow
- Approval-first outreach: no unattended email/calling

## Pages deployment
1. Connect this repository to Cloudflare Pages.
2. Build command: `npm run build`; output directory: `dist`.
3. Create Cloudflare D1 database `dpm-leads`.
4. Run `db/schema.sql` in D1 Console.
5. Add Pages D1 binding named `DB`.
6. Add Pages environment variable `TAVILY_API_KEY`.
7. Deploy.

## Scheduled hunter deployment
The scheduled search is a separate Worker under `worker/`.
1. Create a Worker and deploy using `worker/index.js` and `worker/wrangler.toml` (or run Wrangler from the worker folder).
2. Set Worker secret `TAVILY_API_KEY`.
3. Set the D1 database binding `DB` to the same `dpm-leads` database and replace the placeholder database ID.
4. Cron is set to daily at 03:00 UTC (08:30 India time).

## API
- `GET /api/health`
- `GET /api/leads`
- `POST /api/leads`
- `PATCH /api/leads/:id`
- `POST /api/hunt`

## Next phases
- Better entity deduplication and buyer verification checklist
- Public procurement source-specific monitors (GeM, eProcure, rail/coal/PSU, private projects)
- Outreach draft queue with approval
- Approved email integration
- Call task / click-to-call with consent and human control
- Daily digest and follow-up reminders

Never commit credentials. Search results are leads to verify—not confirmed buyers, live tenders, or permission to contact.