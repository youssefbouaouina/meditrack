import React, { useState } from "react";
import axios from "axios";
import PageTransition from "../../../shared/components/PageTransition";
import QRScanner from "../components/QRScanner";
import AddMedicationModal from "../../inventory/components/AddMedicationModal";
import apiClient from "../../../shared/api/client";
import { MedicationPayload } from "../../inventory/hooks/useMedications";

const ScannerPage: React.FC = () => {
  const [prefill, setPrefill] = useState<Partial<MedicationPayload> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [scanKey, setScanKey] = useState(0);

  const handleScan = async (barcode: string) => {
    setStatus("Recherche du médicament...");
    try {
      const { data } = await apiClient.post<MedicationPayload>("/api/user-medications/scan/", { barcode });
      setPrefill(data);
      setIsModalOpen(true);
      setStatus(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus(error.response?.data?.detail ?? "Médicament introuvable.");
      } else {
        setStatus("Erreur lors de la lecture du code-barres.");
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setPrefill(null);
    setScanKey((prev) => prev + 1);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-2xl font-semibold">Scanner</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Scannez un code-barres pour pré-remplir les informations.
          </p>
        </div>
        <QRScanner key={scanKey} onScan={handleScan} />
        {status && (
          <div className="rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-sm">
            {status}
          </div>
        )}
      </div>
      <AddMedicationModal isOpen={isModalOpen} onClose={handleClose} prefill={prefill} />
    </PageTransition>
  );
};

export default ScannerPage;
