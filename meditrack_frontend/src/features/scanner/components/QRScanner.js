import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import ScannerOverlay from "./ScannerOverlay";
const QRScanner = ({ onScan }) => {
    const [error, setError] = useState(null);
    const hasScanned = useRef(false);
    const scannerRef = useRef(null);
    useEffect(() => {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;
        scanner
            .start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 250, height: 250 } }, (decodedText) => {
            if (!hasScanned.current) {
                hasScanned.current = true;
                onScan(decodedText);
            }
        }, () => undefined)
            .catch(() => {
            setError("Autorisation caméra refusée ou indisponible.");
        });
        return () => {
            scanner
                .stop()
                .catch(() => undefined)
                .finally(() => {
                scanner.clear();
            });
        };
    }, [onScan]);
    return (_jsxs("div", { className: "relative overflow-hidden rounded-lg border border-[var(--border)] bg-black", children: [_jsx("div", { id: "qr-reader", className: "min-h-[320px]" }), _jsx(ScannerOverlay, {}), error && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 p-4 text-center text-sm text-white", children: error }))] }));
};
export default QRScanner;
