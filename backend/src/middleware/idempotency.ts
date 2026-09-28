import crypto from "node:crypto";
import type { RequestHandler } from "express";

interface CachedResponse {
  status: number;
  body: unknown;
}

const cache = new Map<string, CachedResponse>();

export const idempotency: RequestHandler = (req, res, next) => {
  const key = req.get("Idempotency-Key");
  if (!key) {
    next();
    return;
  }

  if (key.length > 255) {
    res.status(400).json({
      error: { code: "INVALID_IDEMPOTENCY_KEY", message: "Idempotency-Key must be 255 characters or fewer." },
    });
    return;
  }

  const fingerprint = crypto
    .createHash("sha256")
    .update(`${req.method}:${req.originalUrl}:${JSON.stringify(req.body ?? {})}`)
    .digest("hex");
  const cacheKey = `${key}:${fingerprint}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    res.status(cached.status).json(cached.body);
    return;
  }

  const originalJson = res.json.bind(res);
  res.json = ((body: unknown) => {
    if (res.statusCode < 500) {
      cache.set(cacheKey, { status: res.statusCode, body });
    }
    return originalJson(body);
  }) as typeof res.json;

  next();
};
