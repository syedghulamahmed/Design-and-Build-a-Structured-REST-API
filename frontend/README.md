# TalentBridge Frontend — Task 3

React + TypeScript frontend updated to consume the live TalentBridge REST API instead of `mock-data.json`.

Set `VITE_API_BASE_URL` in `.env` and run `npm run dev`.

The application list uses `GET /api/internships`, detail pages use `GET /api/internships/:id`, and applications use `POST /api/internships/:id/applications` with real network loading and error handling.
