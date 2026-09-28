import type { RequestHandler } from "express";
import type { InternshipListQuery } from "../types/domain.js";
import { InternshipService } from "../services/internshipService.js";

export function internshipController(service: InternshipService) {
  const list: RequestHandler = (req, res) => {
    const result = service.list(req.query as unknown as InternshipListQuery);
    res.status(200).json(result);
  };

  const get: RequestHandler = (req, res) => {
    res.status(200).json({ data: service.get(req.params.id) });
  };

  const create: RequestHandler = (req, res) => {
    res.status(201).json({ data: service.create(req.body) });
  };

  const update: RequestHandler = (req, res) => {
    res.status(200).json({ data: service.update(req.params.id, req.body) });
  };

  const remove: RequestHandler = (req, res) => {
    service.remove(req.params.id);
    res.status(204).send();
  };

  return { list, get, create, update, remove };
}
