import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import SkeletonCard from "./shared/components/SkeletonCard";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Navbar from "./shared/components/Navbar";
import BottomTabBar from "./shared/components/BottomTabBar";
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage"));
const InventoryPage = lazy(() => import("./features/inventory/pages/InventoryPage"));
const ScannerPage = lazy(() => import("./features/scanner/pages/ScannerPage"));
const CalendarPage = lazy(() => import("./features/calendar/pages/CalendarPage"));
const InteractionsPage = lazy(() => import("./features/interactions/pages/InteractionsPage"));
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});
const AppLayout = () => {
    const location = useLocation();
    const hideNav = ["/login", "/register"].includes(location.pathname);
    return (_jsxs("div", { className: "min-h-screen bg-[var(--bg-primary)]", children: [!hideNav && _jsx(Navbar, {}), _jsx("main", { className: "mx-auto max-w-6xl px-4 py-6 md:px-6", children: _jsx(Suspense, { fallback: _jsxs("div", { className: "space-y-4", children: [_jsx(SkeletonCard, {}), _jsx(SkeletonCard, {})] }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(InventoryPage, {}) }) }), _jsx(Route, { path: "/scanner", element: _jsx(ProtectedRoute, { children: _jsx(ScannerPage, {}) }) }), _jsx(Route, { path: "/calendar", element: _jsx(ProtectedRoute, { children: _jsx(CalendarPage, {}) }) }), _jsx(Route, { path: "/interactions", element: _jsx(ProtectedRoute, { children: _jsx(InteractionsPage, {}) }) })] }) }) }), !hideNav && _jsx(BottomTabBar, {})] }));
};
const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsx(ThemeProvider, { children: _jsx(BrowserRouter, { children: _jsx(AppLayout, {}) }) }) }) }));
};
export default App;
