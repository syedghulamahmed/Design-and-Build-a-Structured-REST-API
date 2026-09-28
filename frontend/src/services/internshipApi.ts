import type { ApplicationFormData, Internship } from "../types/internship";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api").replace(/\/$/, "");

interface ListResponse {
  data: Internship[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

interface ItemResponse<T> {
  data: T;
}

interface ApiErrorPayload {
  error?: { code?: string; message?: string; details?: unknown };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`;
    try {
      const payload = (await response.json()) as ApiErrorPayload;
      message = payload.error?.message ?? message;
    } catch {
      // Keep the HTTP fallback message when the response is not JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function fetchInternships(): Promise<Internship[]> {
  const response = await request<ListResponse>("/internships?limit=50&sortBy=createdAt&sortOrder=desc");
  return response.data;
}

export async function fetchInternship(id: string): Promise<Internship> {
  const response = await request<ItemResponse<Internship>>(`/internships/${id}`);
  return response.data;
}

export async function submitApplication(
  internshipId: string,
  form: ApplicationFormData,
): Promise<void> {
  await request(`/internships/${internshipId}/applications`, {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify(form),
  });
}
