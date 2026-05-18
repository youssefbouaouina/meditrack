import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import PageTransition from "../../../shared/components/PageTransition";
const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({ fields: {} });
    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({ fields: {} });
        try {
            await register(form);
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
                    general: fieldErrors.detail || "Impossible de créer le compte."
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
    return (_jsx(PageTransition, { children: _jsxs("div", { className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center", children: [_jsx("h1", { className: "mb-2 text-2xl font-semibold", children: "Cr\u00E9er un compte" }), _jsx("p", { className: "mb-6 text-sm text-[var(--text-secondary)]", children: "Rejoignez MediTrack pour suivre vos traitements." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Nom d'utilisateur" }), _jsx("input", { value: form.username, onChange: handleChange("username"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.fields.username && (_jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.fields.username }))] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Email" }), _jsx("input", { type: "email", value: form.email, onChange: handleChange("email"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.fields.email && (_jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.fields.email }))] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Mot de passe" }), _jsx("input", { type: "password", value: form.password, onChange: handleChange("password"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.fields.password && (_jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.fields.password }))] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Confirmer le mot de passe" }), _jsx("input", { type: "password", value: form.password_confirm, onChange: handleChange("password_confirm"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.fields.password_confirm && (_jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.fields.password_confirm }))] }), errors.general && _jsx("p", { className: "text-sm text-[var(--danger)]", children: errors.general }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70", children: isSubmitting ? "Création..." : "Créer mon compte" })] }), _jsxs("p", { className: "mt-4 text-sm text-[var(--text-secondary)]", children: ["D\u00E9j\u00E0 inscrit ?", " ", _jsx(Link, { to: "/login", className: "font-medium text-[var(--accent)]", children: "Se connecter" })] })] }) }));
};
export default RegisterPage;
