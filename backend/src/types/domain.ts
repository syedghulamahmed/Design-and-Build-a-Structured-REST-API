export const APPLICATION_STATUSES = [
  "submitted",
  "under_review",
  "accepted",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  duration: string;
  stipend: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  internshipId: string;
  name: string;
  email: string;
  coverNote: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InternshipListQuery {
  page: number;
  limit: number;
  location?: string;
  category?: string;
  search?: string;
  sortBy: "createdAt" | "title" | "company" | "location";
  sortOrder: "asc" | "desc";
}

export interface PaginatedInternships {
  data: Internship[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Repository {
  listInternships(query: InternshipListQuery): PaginatedInternships;
  getInternship(id: string): Internship | undefined;
  createInternship(input: Omit<Internship, "id" | "createdAt" | "updatedAt">): Internship;
  updateInternship(id: string, input: Omit<Internship, "id" | "createdAt" | "updatedAt">): Internship | undefined;
  deleteInternship(id: string): boolean;
  listApplications(internshipId: string): Application[];
  getApplication(id: string): Application | undefined;
  createApplication(input: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">): Application;
  updateApplicationStatus(id: string, status: ApplicationStatus): Application | undefined;
}
