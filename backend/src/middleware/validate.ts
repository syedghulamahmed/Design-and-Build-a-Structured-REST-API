import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export function validate(
  target: "body" | "params" | "query",
  schema: ZodType,
): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      next(result.error);
      return;
    }
    req[target] = result.data;
    next();
  };
}
