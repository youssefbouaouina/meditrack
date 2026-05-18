import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAddMedication } from "../hooks/useMedications";
const defaultScheduleTimes = {
    once_daily: ["08:00"],
    twice_daily: ["08:00", "20:00"],
    three_times_daily: ["08:00", "14:00", "20:00"],
    custom: ["08:00"]
};
const AddMedicationModal = ({ isOpen, onClose, prefill }) => {
    const addMutation = useAddMedication();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
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
    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleMedicationChange = (field) => (event) => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            medication: { ...prev.medication, [field]: value }
        }));
    };
    const handleFrequencyChange = (event) => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            frequency: value,
            schedule_times: defaultScheduleTimes[value]
        }));
    };
    const handleTimeChange = (index) => (event) => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            schedule_times: prev.schedule_times.map((time, i) => (i === index ? value : time))
        }));
    };
    const addCustomTime = () => {
        setForm((prev) => ({ ...prev, schedule_times: [...prev.schedule_times, "08:00"] }));
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
            else if (value && typeof value === "object") {
                Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                    if (Array.isArray(nestedValue)) {
                        result[nestedKey] = nestedValue.join(" ");
                    }
                    else if (typeof nestedValue === "string") {
                        result[nestedKey] = nestedValue;
                    }
                });
            }
        });
        return result;
    };
    const handleSubmit = async (event) => {
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
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(parseErrors(error.response?.data));
            }
        }
    };
    if (!isOpen) {
        return null;
    }
    return (_jsx("div", { className: "fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4 py-6", children: _jsxs("div", { className: "w-full max-w-xl rounded-lg bg-[var(--card-bg)] p-6 shadow-[var(--shadow)]", children: [_jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Ajouter un m\u00E9dicament" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Nom du m\u00E9dicament" }), _jsx("input", { value: form.medication.name, onChange: handleMedicationChange("name"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.name && _jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.name })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Dosage" }), _jsx("input", { value: form.dosage, onChange: handleChange("dosage"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", required: true }), errors.dosage && _jsx("p", { className: "mt-1 text-xs text-[var(--danger)]", children: errors.dosage })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Fr\u00E9quence" }), _jsxs("select", { value: form.frequency, onChange: handleFrequencyChange, className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", children: [_jsx("option", { value: "once_daily", children: "1 fois / jour" }), _jsx("option", { value: "twice_daily", children: "2 fois / jour" }), _jsx("option", { value: "three_times_daily", children: "3 fois / jour" }), _jsx("option", { value: "custom", children: "Personnalis\u00E9" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Heures de prise" }), _jsx("div", { className: "grid gap-2 md:grid-cols-3", children: timeInputs.map((time, index) => (_jsx("input", { type: "time", value: time, onChange: handleTimeChange(index), className: "rounded-md border border-[var(--border)] bg-transparent px-3 py-2" }, `${time}-${index}`))) }), form.frequency === "custom" && (_jsx("button", { type: "button", onClick: addCustomTime, className: "mt-2 text-sm font-medium text-[var(--accent)]", children: "+ Ajouter une heure" }))] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Date de d\u00E9but" }), _jsx("input", { type: "date", value: form.start_date, onChange: handleChange("start_date"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Date de fin" }), _jsx("input", { type: "date", value: form.end_date ?? "", onChange: (event) => setForm((prev) => ({ ...prev, end_date: event.target.value || null })), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Stock actuel" }), _jsx("input", { type: "number", min: 0, value: form.stock_count, onChange: handleChange("stock_count"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Seuil d'alerte" }), _jsx("input", { type: "number", min: 1, value: form.stock_threshold, onChange: handleChange("stock_threshold"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Notes" }), _jsx("textarea", { value: form.notes, onChange: handleChange("notes"), className: "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2", rows: 3 })] }), errors.non_field_errors && (_jsx("p", { className: "text-sm text-[var(--danger)]", children: errors.non_field_errors })), _jsxs("div", { className: "flex items-center justify-end gap-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "rounded-md border px-4 py-2", children: "Annuler" }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-70", children: isSubmitting ? "Ajout..." : "Ajouter" })] })] })] }) }));
};
export default AddMedicationModal;
