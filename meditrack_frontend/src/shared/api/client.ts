import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { AuthTokens } from "../types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  res => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const raw = localStorage.getItem("tokens");
        if (!raw) throw new Error("No refresh");
        const tokens: AuthTokens = JSON.parse(raw);
        const refreshRes = await axios.post(
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
