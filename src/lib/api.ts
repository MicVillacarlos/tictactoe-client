const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown
): Promise<T> {
  const headers: HeadersInit = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${baseUrl}${url}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed with status ${res.status}`);
  }

  return res.json();
}
export const api = {
  get: <T>(url: string) => request<T>(url, "GET"),
  post: <T>(url: string, body: unknown) => request<T>(url, "POST", body),
  put: <T>(url: string, body: unknown) => request<T>(url, "PUT", body),
  patch: <T>(url: string, body: unknown) => request<T>(url, "PATCH", body),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};
