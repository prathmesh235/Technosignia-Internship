// All communication with the Spring Boot backend lives here.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running on port 8080?");
  }

  if (res.status === 204) return null; // DELETE succeeded, no body

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.fieldErrors = data?.errors || {};
    throw err;
  }
  return data;
}

export const getStudents = () => request("/students");
export const createStudent = (s) => request("/students", { method: "POST", body: JSON.stringify(s) });
export const updateStudent = (id, s) => request(`/students/${id}`, { method: "PUT", body: JSON.stringify(s) });
export const deleteStudent = (id) => request(`/students/${id}`, { method: "DELETE" });