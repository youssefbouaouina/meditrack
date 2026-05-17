import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import apiClient from "../shared/api/client";
import { AuthTokens, User } from "../shared/types";
import axios from "axios";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface AuthResponse extends AuthTokens {
  user: User;
}

interface AuthContextValue {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const raw = localStorage.getItem("tokens");
      if (raw) {
        const saved: AuthTokens = JSON.parse(raw);
        setTokens(saved);
        try {
          const { data } = await apiClient.get<User>("/auth/me/");
          setUser(data);
        } catch {
          localStorage.removeItem("tokens");
          setTokens(null);
        }
      }
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login/", { username, password });
    localStorage.setItem("tokens", JSON.stringify({ access: data.access, refresh: data.refresh }));
    setTokens({ access: data.access, refresh: data.refresh });
    setUser(data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const { data } = await apiClient.post<AuthResponse>("/auth/register/", payload);
    localStorage.setItem("tokens", JSON.stringify({ access: data.access, refresh: data.refresh }));
    setTokens({ access: data.access, refresh: data.refresh });
    setUser(data.user);
  };

  const logout = async () => {
    try {
      if (tokens?.refresh) {
        await apiClient.post("/auth/logout/", { refresh: tokens.refresh });
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }
    } finally {
      localStorage.removeItem("tokens");
      setTokens(null);
      setUser(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, tokens, isLoading, login, register, logout }),
    [user, tokens, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
