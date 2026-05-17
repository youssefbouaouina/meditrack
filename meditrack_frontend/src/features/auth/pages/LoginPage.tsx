import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import PageTransition from "../../../shared/components/PageTransition";

interface FieldErrors {
  general?: string;
  fields: Record<string, string>;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({ fields: {} });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({ fields: {} });
    try {
      await login(username, password);
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
          general: fieldErrors.detail || "Impossible de se connecter."
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
        <h1 className="mb-2 text-2xl font-semibold">Connexion</h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Accédez à votre suivi de médicaments en toute sécurité.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nom d'utilisateur</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.fields.username && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.fields.username}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.fields.password && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.fields.password}</p>
            )}
          </div>
          {errors.general && <p className="text-sm text-[var(--danger)]">{errors.general}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Pas encore de compte ?{" "}
          <Link to="/register" className="font-medium text-[var(--accent)]">
            Créer un compte
          </Link>
        </p>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
