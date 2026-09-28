import { randomUUID } from "node:crypto";
import type {
  Application,
  ApplicationStatus,
  Internship,
  InternshipListQuery,
  PaginatedInternships,
  Repository,
} from "../types/domain.js";

export class MemoryRepository implements Repository {
  private internships: Internship[];
  private applications: Application[];

  constructor(seed: { internships: Internship[]; applications?: Application[] }) {
    this.internships = structuredClone(seed.internships);
    this.applications = structuredClone(seed.applications ?? []);
  }

  listInternships(query: InternshipListQuery): PaginatedInternships {
    const search = query.search?.toLowerCase();
    let rows = this.internships.filter((item) => {
      const locationMatch = !query.location || item.location.toLowerCase() === query.location.toLowerCase();
      const categoryMatch = !query.category || item.category.toLowerCase() === query.category.toLowerCase();
      const searchMatch = !search || [item.title, item.company, item.description, ...item.tags]
        .some((value) => value.toLowerCase().includes(search));
      return locationMatch && categoryMatch && searchMatch;
    });

    rows.sort((a, b) => {
      const left = a[query.sortBy];
      const right = b[query.sortBy];
      const comparison = left.localeCompare(right);
      return query.sortOrder === "asc" ? comparison : -comparison;
    });

    const start = (query.page - 1) * query.limit;
    const data = rows.slice(start, start + query.limit);
    return {
      data: structuredClone(data),
      pagination: {
        page: query.page,
        limit: query.limit,
        total: rows.length,
        totalPages: Math.ceil(rows.length / query.limit),
      },
    };
  }

  getInternship(id: string): Internship | undefined {
    const row = this.internships.find((item) => item.id === id);
    return row ? structuredClone(row) : undefined;
  }

  createInternship(input: Omit<Internship, "id" | "createdAt" | "updatedAt">): Internship {
    const now = new Date().toISOString();
    const row: Internship = { ...structuredClone(input), id: randomUUID(), createdAt: now, updatedAt: now };
    this.internships.unshift(row);
    return structuredClone(row);
  }

  updateInternship(id: string, input: Omit<Internship, "id" | "createdAt" | "updatedAt">): Internship | undefined {
    const index = this.internships.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    const current = this.internships[index];
    if (!current) return undefined;
    const row: Internship = { ...structuredClone(input), id, createdAt: current.createdAt, updatedAt: new Date().toISOString() };
    this.internships[index] = row;
    return structuredClone(row);
  }

  deleteInternship(id: string): boolean {
    const exists = this.internships.some((item) => item.id === id);
    if (!exists) return false;
    this.internships = this.internships.filter((item) => item.id !== id);
    this.applications = this.applications.filter((item) => item.internshipId !== id);
    return true;
  }

  listApplications(internshipId: string): Application[] {
    return structuredClone(this.applications.filter((item) => item.internshipId === internshipId));
  }

  getApplication(id: string): Application | undefined {
    const row = this.applications.find((item) => item.id === id);
    return row ? structuredClone(row) : undefined;
  }

  createApplication(input: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">): Application {
    const now = new Date().toISOString();
    const row: Application = { ...structuredClone(input), id: randomUUID(), status: "submitted", createdAt: now, updatedAt: now };
    this.applications.unshift(row);
    return structuredClone(row);
  }

  updateApplicationStatus(id: string, status: ApplicationStatus): Application | undefined {
    const index = this.applications.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    const current = this.applications[index];
    if (!current) return undefined;
    const row: Application = { ...current, status, updatedAt: new Date().toISOString() };
    this.applications[index] = row;
    return structuredClone(row);
  }
}
