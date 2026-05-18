import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUpdateMedication } from "../hooks/useMedications";
const EditMedicationModal = ({ medication, onClose }) => {
    const updateMutation = useUpdateMedication();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState(null);
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
    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
    };
    const handleTimeChange = (index) => (event) => {
        const value = event.target.value;
        setForm((prev) => prev
            ? { ...prev, schedule_times: prev.schedule_times.map((time, i) => (i === index ? value : time)) }
            : prev);
    };
    const parseErrors = (data) => {
        const result = {};
        if (!data || typeof data !== "object")
            return result;
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                result[key] = value.join(" ");
            }
            else if (typeof value === "string") {
                result[key] = value;
            }
        });
        return result;
    };
    const handleSubmit = async (event) => {
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
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(parseErrors(error.response?.data));
            }
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4 py-6", children: _jsxs("div", { className: "w-full max-w-xl rounded-lg bg-[var(--card-bg)] p-6 shadow-[var(--shadow)]", children: [_jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Modifier le traitement" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Nom du m\u00E9dicament" }), _jsx("input", { value: form.medication.name, onChange: (event) => setForm((prev) => prev ? { ...prev, medication: { ...prev.medication, name: event.target.value } } : prev), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Dosage" }), _jsx("input", { value: form.dosage, onChange: handleChange("dosage"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Actif ?" }), _jsxs("select", { value: form.is_active ? "true" : "false", onChange: (event) => setForm((prev) => (prev ? { ...prev, is_active: event.target.value === "true" } : prev)), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", children: [_jsx("option", { value: "true", children: "Oui" }), _jsx("option", { value: "false", children: "Non" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Heures de prise" }), _jsx("div", { className: "grid gap-2 md:grid-cols-3", children: form.schedule_times.map((time, index) => (_jsx("input", { type: "time", value: time, onChange: handleTimeChange(index), className: "rounded-md border border-[var(--border)] bg-transparent px-3 py-2" }, `${time}-${index}`))) })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Stock actuel" }), _jsx("input", { type: "number", min: 0, value: form.stock_count, onChange: handleChange("stock_count"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Seuil d'alerte" }), _jsx("input", { type: "number", min: 1, value: form.stock_threshold, onChange: handleChange("stock_threshold"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] })] }), errors.non_field_errors && (_jsx("p", { className: "text-sm text-[var(--danger)]", children: errors.non_field_errors })), _jsxs("div", { className: "flex items-center justify-end gap-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "rounded-md border px-4 py-2", children: "Annuler" }), _jsx("button", { type: "submit", disabled: updateMutation.isPending, className: "rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70", children: updateMutation.isPending ? "Mise à jour..." : "Enregistrer" })] })] })] }) }));
};
export default EditMedicationModal;
