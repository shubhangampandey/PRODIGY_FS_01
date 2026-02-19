import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, ApiError } from "@/lib/api";

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("token"),
    isLoading: true,
    isAuthenticated: false,
  });

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
      return;
    }
    try {
      const data = await api<{ user: User }>("/auth/me", { auth: true });
      setState({ user: data.user, token, isLoading: false, isAuthenticated: true });
    } catch {
      localStorage.removeItem("token");
      setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = async (email: string, password: string) => {
    const data = await api<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    localStorage.setItem("token", data.token);
    setState({ user: data.user, token: data.token, isLoading: false, isAuthenticated: true });
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await api<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });
    localStorage.setItem("token", data.token);
    setState({ user: data.user, token: data.token, isLoading: false, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
