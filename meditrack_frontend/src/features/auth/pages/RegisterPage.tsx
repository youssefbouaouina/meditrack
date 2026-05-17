import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import PageTransition from "../../../shared/components/PageTransition";

interface FieldErrors {
  general?: string;
  fields: Record<string, string>;
}

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({ fields: {} });

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({ fields: {} });
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as Record<string, string[] | string> | undefined;
        const fieldErrors: Record<string, string> = {};
        if (data) {
          Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              fieldErrors[key] = value.join(" ");
            } else if (typeof value === "string") {
              fieldErrors[key] = value;
            }
          });
        }
        setErrors({
          fields: fieldErrors,
          general: fieldErrors.detail || "Impossible de créer le compte."
        });
      } else {
        setErrors({ fields: {}, general: "Erreur inattendue." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
        <h1 className="mb-2 text-2xl font-semibold">Créer un compte</h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Rejoignez MediTrack pour suivre vos traitements.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nom d'utilisateur</label>
            <input
              value={form.username}
              onChange={handleChange("username")}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.fields.username && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.fields.username}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.fields.email && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.fields.email}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.fields.password && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.fields.password}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Confirmer le mot de passe</label>
            <input
              type="password"
              value={form.password_confirm}
              onChange={handleChange("password_confirm")}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.fields.password_confirm && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.fields.password_confirm}</p>
            )}
          </div>
          {errors.general && <p className="text-sm text-[var(--danger)]">{errors.general}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70"
          >
            {isSubmitting ? "Création..." : "Créer mon compte"}
          </button>
        </form>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Déjà inscrit ?{" "}
          <Link to="/login" className="font-medium text-[var(--accent)]">
            Se connecter
          </Link>
        </p>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;
