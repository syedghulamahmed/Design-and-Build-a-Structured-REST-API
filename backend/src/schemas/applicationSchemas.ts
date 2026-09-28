import { z } from "zod";
import { APPLICATION_STATUSES } from "../types/domain.js";

export const applicationCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  coverNote: z.string().trim().min(30).max(3000),
}).strict();

export const applicationParamsSchema = z.object({ id: z.string().uuid() });
export const applicationByInternshipParamsSchema = z.object({ internshipId: z.string().uuid() });

export const applicationStatusSchema = z.object({
  status: z.enum(APPLICATION_STATUSES),
}).strict();
