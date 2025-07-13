const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function login({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login fallido");
  return await res.json(); // debería devolver datos del usuario
}

export async function register(data: { email: string; password: string; username: string }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registro fallido");
  return await res.json();
}

export async function logout() {
  await fetch(`${API_URL}/logout`, { method: "POST" });
}
