import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import apiClient from "../shared/api/client";
import axios from "axios";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const bootstrap = async () => {
            const raw = localStorage.getItem("tokens");
            if (raw) {
                const saved = JSON.parse(raw);
                setTokens(saved);
                try {
                    const { data } = await apiClient.get("/auth/me/");
                    setUser(data);
                }
                catch {
                    localStorage.removeItem("tokens");
                    setTokens(null);
                }
            }
            setIsLoading(false);
        };
        bootstrap();
    }, []);
    const login = async (username, password) => {
        const { data } = await apiClient.post("/auth/login/", { username, password });
        localStorage.setItem("tokens", JSON.stringify({ access: data.access, refresh: data.refresh }));
        setTokens({ access: data.access, refresh: data.refresh });
        setUser(data.user);
    };
    const register = async (payload) => {
        const { data } = await apiClient.post("/auth/register/", payload);
        localStorage.setItem("tokens", JSON.stringify({ access: data.access, refresh: data.refresh }));
        setTokens({ access: data.access, refresh: data.refresh });
        setUser(data.user);
    };
    const logout = async () => {
        try {
            if (tokens?.refresh) {
                await apiClient.post("/auth/logout/", { refresh: tokens.refresh });
            }
        }
        catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error;
            }
        }
        finally {
            localStorage.removeItem("tokens");
            setTokens(null);
            setUser(null);
        }
    };
    const value = useMemo(() => ({ user, tokens, isLoading, login, register, logout }), [user, tokens, isLoading]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
