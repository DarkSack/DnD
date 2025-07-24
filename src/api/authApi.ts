import type { LoginResponse, RegisterResponse } from "@/Interfaces/Auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function register({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    if (!response.ok) {
      throw new Error(`Registro fallido: ${response.status}`);
    }

    const result: RegisterResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}

