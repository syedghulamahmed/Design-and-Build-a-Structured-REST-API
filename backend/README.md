# TalentBridge REST API — Task 3

Layered Node.js + Express + TypeScript REST API for the TalentBridge internship domain. The data layer is deliberately an in-memory repository so Task 4 can replace it with PostgreSQL without changing routes/controllers.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

API base: `http://localhost:4000/api`

## Route map

- `GET /api/internships` — paginated/filterable/sortable list
- `POST /api/internships` — create internship
- `GET /api/internships/:id` — retrieve internship
- `PUT /api/internships/:id` — replace internship
- `DELETE /api/internships/:id` — delete internship
- `GET /api/internships/:id/applications` — list applications for a posting
- `POST /api/internships/:id/applications` — submit application
- `GET /api/applications/:id` — retrieve application
- `PATCH /api/applications/:id/status` — advance application status
- `GET /health` — health check

See `../openapi.yaml` and `../postman/TalentBridge-Task3.postman_collection.json` for the full contract and runnable request sequence.
