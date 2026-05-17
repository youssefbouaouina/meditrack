import React, { Suspense, lazy } from "react";
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

const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {!hideNav && <Navbar />}
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <Suspense
          fallback={
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <InventoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scanner"
              element={
                <ProtectedRoute>
                  <ScannerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interactions"
              element={
                <ProtectedRoute>
                  <InteractionsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {!hideNav && <BottomTabBar />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
