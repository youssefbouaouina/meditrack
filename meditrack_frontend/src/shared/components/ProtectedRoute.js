import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SkeletonCard from "./SkeletonCard";
const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (_jsx("div", { className: "mx-auto max-w-4xl px-4 py-6", children: _jsx(SkeletonCard, {}) }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return children;
};
export default ProtectedRoute;
