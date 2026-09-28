import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { applicationParamsSchema, applicationStatusSchema } from "../schemas/applicationSchemas.js";
import { ApplicationService } from "../services/applicationService.js";
import { applicationController } from "../controllers/applicationController.js";

export function createApplicationRouter(service: ApplicationService) {
  const router = Router();
  const controller = applicationController(service);
  router.get("/:id", validate("params", applicationParamsSchema), controller.get);
  router.patch("/:id/status", validate("params", applicationParamsSchema), validate("body", applicationStatusSchema), controller.updateStatus);
  return router;
}
