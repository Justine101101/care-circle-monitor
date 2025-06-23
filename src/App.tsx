
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/DashboardLayout";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Patients from "./pages/Patients";
import HealthRecords from "./pages/HealthRecords";
import Immunizations from "./pages/Immunizations";
import Appointments from "./pages/Appointments";
import SystemLogs from "./pages/SystemLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
