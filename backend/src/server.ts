import "dotenv/config";
import express from "express";
import cors from "cors";
import { repository } from "./data/seed.js";
import { InternshipService } from "./services/internshipService.js";
import { ApplicationService } from "./services/applicationService.js";
import { createInternshipRouter } from "./routes/internshipRoutes.js";
import { createApplicationRouter } from "./routes/applicationRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

app.disable("x-powered-by");
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ data: { status: "ok", service: "talentbridge-api" } });
});

const internshipService = new InternshipService(repository);
const applicationService = new ApplicationService(repository);

app.use("/api/internships", createInternshipRouter(internshipService, applicationService));
app.use("/api/applications", createApplicationRouter(applicationService));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TalentBridge API listening on http://localhost:${port}`);
});

export { app };
