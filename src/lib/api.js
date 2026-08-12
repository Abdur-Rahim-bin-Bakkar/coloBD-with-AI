const envBase = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
const BASE_URL = `${envBase.replace(/\/$/, "").replace(/\/api\/v1$/, "")}/api/v1`;

async function request(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({
    success: false,
    message: "The server returned an unreadable response.",
  }));

  if (!res.ok || json.success === false) {
    const error = new Error(json.message || "Request failed.");
    error.status = res.status;
    throw error;
  }
  return json.data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  del: (path) => request(path, { method: "DELETE" }),
};

export const fetchPlaces = (params = {}) => {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v))
  ).toString();
  return api.get(`/places${query ? `?${query}` : ""}`);
};

export const fetchPlace = (id) => api.get(`/places/${id}`);

export const reactToPlace = (id, reaction) =>
  api.post(`/places/${id}/react`, { reaction });

export const fetchComments = (id) => api.get(`/places/${id}/comments`);

export const addComment = (id, text) =>
  api.post(`/places/${id}/comments`, { text });

export const deleteComment = (commentId) =>
  api.del(`/places/comments/${commentId}`);

export const getErrorMessage = (error) =>
  error?.message || "Something went wrong. Please try again.";