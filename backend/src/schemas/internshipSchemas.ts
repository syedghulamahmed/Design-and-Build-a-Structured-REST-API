import { z } from "zod";

const stringList = z.array(z.string().trim().min(1)).min(1).max(20);

export const internshipCreateSchema = z.object({
  title: z.string().trim().min(3).max(120),
  company: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(80),
  type: z.string().trim().min(2).max(50),
  duration: z.string().trim().min(2).max(50),
  stipend: z.string().trim().min(2).max(80),
  tags: stringList,
  description: z.string().trim().min(30).max(3000),
  responsibilities: stringList,
  requirements: stringList,
}).strict();

export const internshipUpdateSchema = internshipCreateSchema;

export const internshipParamsSchema = z.object({ id: z.string().uuid() });

export const internshipListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(9),
  location: z.string().trim().max(100).optional(),
  category: z.string().trim().max(80).optional(),
  search: z.string().trim().max(120).optional(),
  sortBy: z.enum(["createdAt", "title", "company", "location"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
