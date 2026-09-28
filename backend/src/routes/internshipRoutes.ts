import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { idempotency } from "../middleware/idempotency.js";
import { internshipCreateSchema, internshipListQuerySchema, internshipParamsSchema } from "../schemas/internshipSchemas.js";
import { applicationCreateSchema, applicationByInternshipParamsSchema } from "../schemas/applicationSchemas.js";
import type { InternshipService } from "../services/internshipService.js";
import type { ApplicationService } from "../services/applicationService.js";
import { internshipController } from "../controllers/internshipController.js";
import { applicationController } from "../controllers/applicationController.js";

export function createInternshipRouter(internshipService: InternshipService, applicationService: ApplicationService) {
  const router = Router();
  const internships = internshipController(internshipService);
  const applications = applicationController(applicationService);

  router.get("/", validate("query", internshipListQuerySchema), internships.list);
  router.post("/", idempotency, validate("body", internshipCreateSchema), internships.create);
  router.get("/:id", validate("params", internshipParamsSchema), internships.get);
  router.put("/:id", validate("params", internshipParamsSchema), validate("body", internshipCreateSchema), internships.update);
  router.delete("/:id", validate("params", internshipParamsSchema), internships.remove);

  router.get("/:internshipId/applications", validate("params", applicationByInternshipParamsSchema), applications.listForInternship);
  router.post("/:internshipId/applications", idempotency, validate("params", applicationByInternshipParamsSchema), validate("body", applicationCreateSchema), applications.create);

  return router;
}
