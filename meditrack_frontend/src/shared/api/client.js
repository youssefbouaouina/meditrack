import axios from "axios";
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});
apiClient.interceptors.request.use((config) => {
    const raw = localStorage.getItem("tokens");
    if (raw) {
        const tokens = JSON.parse(raw);
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
});
apiClient.interceptors.response.use(response => response, async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && original && !original._retry) {
        original._retry = true;
        try {
            const raw = localStorage.getItem("tokens");
            if (!raw)
                throw new Error("No refresh token");
            const tokens = JSON.parse(raw);
            const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, { refresh: tokens.refresh });
            const newTokens = { access: refreshRes.data.access, refresh: tokens.refresh };
            localStorage.setItem("tokens", JSON.stringify(newTokens));
            original.headers.Authorization = `Bearer ${newTokens.access}`;
            return apiClient(original);
        }
        catch {
            localStorage.removeItem("tokens");
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});
export default apiClient;
