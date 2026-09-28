import type { RequestHandler } from "express";
import { ApplicationService } from "../services/applicationService.js";

export function applicationController(service: ApplicationService) {
  const listForInternship: RequestHandler = (req, res) => {
    res.status(200).json({ data: service.listForInternship(req.params.internshipId) });
  };

  const get: RequestHandler = (req, res) => {
    res.status(200).json({ data: service.get(req.params.id) });
  };

  const create: RequestHandler = (req, res) => {
    res.status(201).json({ data: service.create(req.params.internshipId, req.body) });
  };

  const updateStatus: RequestHandler = (req, res) => {
    res.status(200).json({ data: service.updateStatus(req.params.id, req.body.status) });
  };

  return { listForInternship, get, create, updateStatus };
}
