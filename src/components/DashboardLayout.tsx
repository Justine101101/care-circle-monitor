
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-4">
          <SidebarTrigger className="mb-4" />
        </div>
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
