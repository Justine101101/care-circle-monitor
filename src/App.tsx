
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./components/Login";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Patients from "./pages/Patients";
import HealthRecords from "./pages/HealthRecords";
import Immunizations from "./pages/Immunizations";
import Appointments from "./pages/Appointments";
import SystemLogs from "./pages/SystemLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard/*" element={
              <DashboardLayout>
                <Routes>
                  <Route path="users" element={<Users />} />
                  <Route path="patients" element={<Patients />} />
                  <Route path="health-records" element={<HealthRecords />} />
                  <Route path="immunizations" element={<Immunizations />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="system-logs" element={<SystemLogs />} />
                </Routes>
              </DashboardLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
