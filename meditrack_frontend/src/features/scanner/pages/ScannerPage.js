import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import PageTransition from "../../../shared/components/PageTransition";
import QRScanner from "../components/QRScanner";
import AddMedicationModal from "../../inventory/components/AddMedicationModal";
import apiClient from "../../../shared/api/client";
const ScannerPage = () => {
    const [prefill, setPrefill] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const [scanKey, setScanKey] = useState(0);
    const handleScan = async (barcode) => {
        setStatus("Recherche du médicament...");
        try {
            const { data } = await apiClient.post("/api/user-medications/scan/", { barcode });
            setPrefill(data);
            setIsModalOpen(true);
            setStatus(null);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setStatus(error.response?.data?.detail ?? "Médicament introuvable.");
            }
            else {
                setStatus("Erreur lors de la lecture du code-barres.");
            }
        }
    };
    const handleClose = () => {
        setIsModalOpen(false);
        setPrefill(null);
        setScanKey((prev) => prev + 1);
    };
    return (_jsxs(PageTransition, { children: [_jsxs("div", { className: "space-y-6 pb-20", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Scanner" }), _jsx("p", { className: "text-sm text-[var(--text-secondary)]", children: "Scannez un code-barres pour pr\u00E9-remplir les informations." })] }), _jsx(QRScanner, { onScan: handleScan }, scanKey), status && (_jsx("div", { className: "rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-sm", children: status }))] }), _jsx(AddMedicationModal, { isOpen: isModalOpen, onClose: handleClose, prefill: prefill })] }));
};
export default ScannerPage;
