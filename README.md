# TalentBridge — Week 2 Task 3

Structured REST API for the NeuroFive Solutions Full Stack Web Development internship task.

## What is included

- `backend/` — Node.js 20+ + Express + TypeScript API
- `frontend/` — React + TypeScript frontend wired to the API
- `openapi.yaml` — complete API contract
- `postman/TalentBridge-Task3.postman_collection.json` — every endpoint demonstrated
- `docs/API_DESIGN_RESEARCH.md` — Stripe conventions + RFC 9457 comparison
- `docs/STATUS_TRANSITIONS.md` — application workflow rules

## Architecture

```text
routes → controllers → services → repository/data layer
```

The repository is in-memory for Task 3. Replacing `MemoryRepository` with a PostgreSQL implementation in Task 4 should not require route/controller changes.

## Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API runs at `http://localhost:4000`.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL=http://localhost:4000/api` in `frontend/.env` if needed.

## Required behavior covered

- Full internship CRUD
- Nested application create/list
- Application get/update-status
- Server-side validation with Zod
- Pagination, filtering, search, sorting
- Consistent JSON error envelope
- Centralized error middleware
- `201`, `204`, `400`, `404`, `409`, `422`, and `500` handling
- Allowed application status transitions
- Idempotency-Key support for POST requests
- OpenAPI documentation
- Postman collection covering every endpoint
