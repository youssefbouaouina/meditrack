import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserMedication } from "../../../shared/types";
import { useUpdateMedication, UserMedicationPayload } from "../hooks/useMedications";

interface EditMedicationModalProps {
  medication: UserMedication | null;
  onClose: () => void;
}

const EditMedicationModal: React.FC<EditMedicationModalProps> = ({ medication, onClose }) => {
  const updateMutation = useUpdateMedication();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<UserMedicationPayload | null>(null);

  useEffect(() => {
    if (medication) {
      setForm({
        medication: {
          name: medication.medication.name,
          barcode: medication.medication.barcode,
          active_substance: medication.medication.active_substance,
          form: medication.medication.form,
          manufacturer: medication.medication.manufacturer
        },
        dosage: medication.dosage,
        frequency: medication.frequency,
        schedule_times: medication.schedule_times,
        start_date: medication.start_date,
        end_date: medication.end_date,
        stock_count: medication.stock_count,
        stock_threshold: medication.stock_threshold,
        is_active: medication.is_active,
        notes: medication.notes
      });
    }
  }, [medication]);

  if (!medication || !form) {
    return null;
  }

  const handleChange = (field: keyof UserMedicationPayload) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleTimeChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) =>
      prev
        ? { ...prev, schedule_times: prev.schedule_times.map((time, i) => (i === index ? value : time)) }
        : prev
    );
  };

  const parseErrors = (data: unknown) => {
    const result: Record<string, string> = {};
    if (!data || typeof data !== "object") return result;
    Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value.join(" ");
      } else if (typeof value === "string") {
        result[key] = value;
      }
    });
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    try {
      await updateMutation.mutateAsync({
        id: medication.id,
        payload: {
          ...form,
          stock_count: Number(form.stock_count),
          stock_threshold: Number(form.stock_threshold),
          end_date: form.end_date || null
        }
      });
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(parseErrors(error.response?.data));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-xl rounded-lg bg-[var(--card-bg)] p-6 shadow-[var(--shadow)]">
        <h2 className="mb-4 text-lg font-semibold">Modifier le traitement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nom du médicament</label>
            <input
              value={form.medication.name}
              onChange={(event) =>
                setForm((prev) =>
                  prev ? { ...prev, medication: { ...prev.medication, name: event.target.value } } : prev
                )
              }
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Dosage</label>
              <input
                value={form.dosage}
                onChange={handleChange("dosage")}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Actif ?</label>
              <select
                value={form.is_active ? "true" : "false"}
                onChange={(event) =>
                  setForm((prev) => (prev ? { ...prev, is_active: event.target.value === "true" } : prev))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              >
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Heures de prise</label>
            <div className="grid gap-2 md:grid-cols-3">
              {form.schedule_times.map((time, index) => (
                <input
                  key={`${time}-${index}`}
                  type="time"
                  value={time}
                  onChange={handleTimeChange(index)}
                  className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                />
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Stock actuel</label>
              <input
                type="number"
                min={0}
                value={form.stock_count}
                onChange={handleChange("stock_count")}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Seuil d'alerte</label>
              <input
                type="number"
                min={1}
                value={form.stock_threshold}
                onChange={handleChange("stock_threshold")}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              />
            </div>
          </div>
          {errors.non_field_errors && (
            <p className="text-sm text-[var(--danger)]">{errors.non_field_errors}</p>
          )}
          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-md border px-4 py-2">
              Annuler
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70"
            >
              {updateMutation.isPending ? "Mise à jour..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicationModal;
