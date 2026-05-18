import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import PageTransition from "../../../shared/components/PageTransition";
const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({ fields: {} });
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({ fields: {} });
        try {
            await login(username, password);
            navigate("/");
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;
                const fieldErrors = {};
                if (data) {
                    Object.entries(data).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            fieldErrors[key] = value.join(" ");
                        }
                        else if (typeof value === "string") {
                            fieldErrors[key] = value;
                        }
                    });
                }
                setErrors({
                    fields: fieldErrors,
                    general: fieldErrors.detail || "Impossible de se connecter."
                });
            }
            else {
                setErrors({ fields: {}, general: "Erreur inattendue." });
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(PageTransition, { children: _jsxs("div", { className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center", children: [_jsx("h1", { className: "mb-2 text-2xl font-semibold", children: "Connexion" }), _jsx("p", { className: "mb-6 text-sm text-[var(--text-secondary)]", children: "Acc\u00E9dez \u00E0 votre suivi de m\u00E9dicaments en toute s\u00E9curit\u00E9." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Nom d'utilisateur" }), _jsx("input", { value: username, onChange: (event) => setUsername(event.target.value), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.fields.username && (_jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.fields.username }))] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Mot de passe" }), _jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.fields.password && (_jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.fields.password }))] }), errors.general && _jsx("p", { className: "text-sm text-[var(--danger)]", children: errors.general }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70", children: isSubmitting ? "Connexion..." : "Se connecter" })] }), _jsxs("p", { className: "mt-4 text-sm text-[var(--text-secondary)]", children: ["Pas encore de compte ?", " ", _jsx(Link, { to: "/register", className: "font-medium text-[var(--accent)]", children: "Cr\u00E9er un compte" })] })] }) }));
};
export default LoginPage;
