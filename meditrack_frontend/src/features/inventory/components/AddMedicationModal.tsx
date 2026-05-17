import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAddMedication, UserMedicationPayload, MedicationPayload } from "../hooks/useMedications";

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: Partial<MedicationPayload> | null;
}

const defaultScheduleTimes: Record<UserMedicationPayload["frequency"], string[]> = {
  once_daily: ["08:00"],
  twice_daily: ["08:00", "20:00"],
  three_times_daily: ["08:00", "14:00", "20:00"],
  custom: ["08:00"]
};

const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ isOpen, onClose, prefill }) => {
  const addMutation = useAddMedication();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<UserMedicationPayload>({
    medication: {
      name: "",
      barcode: null,
      active_substance: "",
      form: "",
      manufacturer: ""
    },
    dosage: "",
    frequency: "once_daily",
    schedule_times: defaultScheduleTimes.once_daily,
    start_date: new Date().toISOString().slice(0, 10),
    end_date: null,
    stock_count: 0,
    stock_threshold: 7,
    is_active: true,
    notes: ""
  });

  const isSubmitting = addMutation.isPending;

  useEffect(() => {
    if (prefill && isOpen) {
      setForm((prev) => ({
        ...prev,
        medication: {
          ...prev.medication,
          ...prefill,
          barcode: prefill.barcode ?? null
        }
      }));
    }
  }, [prefill, isOpen]);

  const timeInputs = useMemo(() => form.schedule_times, [form.schedule_times]);

  const handleChange = (field: keyof UserMedicationPayload) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicationChange = (field: keyof MedicationPayload) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      medication: { ...prev.medication, [field]: value }
    }));
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as UserMedicationPayload["frequency"];
    setForm((prev) => ({
      ...prev,
      frequency: value,
      schedule_times: defaultScheduleTimes[value]
    }));
  };

  const handleTimeChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      schedule_times: prev.schedule_times.map((time, i) => (i === index ? value : time))
    }));
  };

  const addCustomTime = () => {
    setForm((prev) => ({ ...prev, schedule_times: [...prev.schedule_times, "08:00"] }));
  };

  const parseErrors = (data: unknown) => {
    const result: Record<string, string> = {};
    if (!data || typeof data !== "object") return result;
    Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value.join(" ");
      } else if (typeof value === "string") {
        result[key] = value;
      } else if (value && typeof value === "object") {
        Object.entries(value as Record<string, unknown>).forEach(([nestedKey, nestedValue]) => {
          if (Array.isArray(nestedValue)) {
            result[nestedKey] = nestedValue.join(" ");
          } else if (typeof nestedValue === "string") {
            result[nestedKey] = nestedValue;
          }
        });
      }
    });
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    try {
      await addMutation.mutateAsync({
        ...form,
        stock_count: Number(form.stock_count),
        stock_threshold: Number(form.stock_threshold),
        end_date: form.end_date || null
      });
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(parseErrors(error.response?.data));
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-xl rounded-lg bg-[var(--card-bg)] p-6 shadow-[var(--shadow)]">
        <h2 className="mb-4 text-lg font-semibold">Ajouter un médicament</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nom du médicament</label>
            <input
              value={form.medication.name}
              onChange={handleMedicationChange("name")}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              required
            />
            {errors.name && <p className="mt-1 text-xs text-[var(--danger)]">{errors.name}</p>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Dosage</label>
              <input
                value={form.dosage}
                onChange={handleChange("dosage")}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                required
              />
              {errors.dosage && <p className="mt-1 text-xs text-[var(--danger)]">{errors.dosage}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Fréquence</label>
              <select
                value={form.frequency}
                onChange={handleFrequencyChange}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              >
                <option value="once_daily">1 fois / jour</option>
                <option value="twice_daily">2 fois / jour</option>
                <option value="three_times_daily">3 fois / jour</option>
                <option value="custom">Personnalisé</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Heures de prise</label>
            <div className="grid gap-2 md:grid-cols-3">
              {timeInputs.map((time, index) => (
                <input
                  key={`${time}-${index}`}
                  type="time"
                  value={time}
                  onChange={handleTimeChange(index)}
                  className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                />
              ))}
            </div>
            {form.frequency === "custom" && (
              <button
                type="button"
                onClick={addCustomTime}
                className="mt-2 text-sm font-medium text-[var(--accent)]"
              >
                + Ajouter une heure
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Date de début</label>
              <input
                type="date"
                value={form.start_date}
                onChange={handleChange("start_date")}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Date de fin</label>
              <input
                type="date"
                value={form.end_date ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, end_date: event.target.value || null }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              />
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
          <div>
            <label className="mb-1 block text-sm font-medium">Notes</label>
            <textarea
              value={form.notes}
              onChange={handleChange("notes")}
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
              rows={3}
            />
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
              disabled={isSubmitting}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70"
            >
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicationModal;
