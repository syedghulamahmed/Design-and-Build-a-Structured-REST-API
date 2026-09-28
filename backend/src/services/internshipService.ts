import { ApiError } from "../middleware/errors.js";
import type { InternshipListQuery, Repository } from "../types/domain.js";

export class InternshipService {
  constructor(private readonly repository: Repository) {}

  list(query: InternshipListQuery) {
    return this.repository.listInternships(query);
  }

  get(id: string) {
    const internship = this.repository.getInternship(id);
    if (!internship) throw new ApiError(404, "INTERNSHIP_NOT_FOUND", "Internship not found.");
    return internship;
  }

  create(input: Parameters<Repository["createInternship"]>[0]) {
    return this.repository.createInternship(input);
  }

  update(id: string, input: Parameters<Repository["updateInternship"]>[1]) {
    const internship = this.repository.updateInternship(id, input);
    if (!internship) throw new ApiError(404, "INTERNSHIP_NOT_FOUND", "Internship not found.");
    return internship;
  }

  remove(id: string) {
    if (!this.repository.deleteInternship(id)) {
      throw new ApiError(404, "INTERNSHIP_NOT_FOUND", "Internship not found.");
    }
  }
}
