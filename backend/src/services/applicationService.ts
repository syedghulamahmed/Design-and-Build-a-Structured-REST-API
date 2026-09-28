import { ApiError } from "../middleware/errors.js";
import type { ApplicationStatus, Repository } from "../types/domain.js";

const allowedTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  submitted: ["under_review"],
  under_review: ["accepted", "rejected"],
  accepted: [],
  rejected: [],
};

export class ApplicationService {
  constructor(private readonly repository: Repository) {}

  listForInternship(internshipId: string) {
    if (!this.repository.getInternship(internshipId)) {
      throw new ApiError(404, "INTERNSHIP_NOT_FOUND", "Internship not found.");
    }
    return this.repository.listApplications(internshipId);
  }

  get(id: string) {
    const application = this.repository.getApplication(id);
    if (!application) throw new ApiError(404, "APPLICATION_NOT_FOUND", "Application not found.");
    return application;
  }

  create(internshipId: string, input: Parameters<Repository["createApplication"]>[0]) {
    if (!this.repository.getInternship(internshipId)) {
      throw new ApiError(404, "INTERNSHIP_NOT_FOUND", "Internship not found.");
    }
    return this.repository.createApplication({ ...input, internshipId });
  }

  updateStatus(id: string, nextStatus: ApplicationStatus) {
    const current = this.repository.getApplication(id);
    if (!current) throw new ApiError(404, "APPLICATION_NOT_FOUND", "Application not found.");

    if (!allowedTransitions[current.status].includes(nextStatus)) {
      throw new ApiError(
        409,
        "INVALID_STATUS_TRANSITION",
        `Cannot change application status from ${current.status} to ${nextStatus}.`,
        { currentStatus: current.status, requestedStatus: nextStatus, allowedTransitions: allowedTransitions[current.status] },
      );
    }

    return this.repository.updateApplicationStatus(id, nextStatus)!;
  }
}
