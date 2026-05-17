import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { AuthTokens } from "../types";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const raw = localStorage.getItem("tokens");
  if (raw) {
    const tokens: AuthTokens = JSON.parse(raw);
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        const raw = localStorage.getItem("tokens");
        if (!raw) throw new Error("No refresh token");
        const tokens: AuthTokens = JSON.parse(raw);
        const refreshRes = await axios.post<{ access: string }>(
          `${import.meta.env.VITE_API_URL}/auth/refresh/`,
          { refresh: tokens.refresh }
        );
        const newTokens: AuthTokens = { access: refreshRes.data.access, refresh: tokens.refresh };
        localStorage.setItem("tokens", JSON.stringify(newTokens));
        original.headers.Authorization = `Bearer ${newTokens.access}`;
        return apiClient(original);
      } catch {
        localStorage.removeItem("tokens");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
