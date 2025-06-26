
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, FileText, Syringe, Calendar, Activity, LayoutDashboard } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Admin Dashboard",
      description: "System overview and administrative controls",
      icon: LayoutDashboard,
      href: "/dashboard/admin",
    },
    {
      title: "User Management",
      description: "Manage healthcare staff and administrators",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: "Patient Records",
      description: "Comprehensive patient information management",
      icon: UserCheck,
      href: "/dashboard/patients",
    },
    {
      title: "Health Records",
      description: "Medical history and health data tracking",
      icon: FileText,
      href: "/dashboard/health-records",
    },
    {
      title: "Immunizations",
      description: "Vaccine tracking and management",
      icon: Syringe,
      href: "/dashboard/immunizations",
    },
    {
      title: "Appointments",
      description: "Schedule and manage patient appointments",
      icon: Calendar,
      href: "/dashboard/appointments",
    },
    {
      title: "System Logs",
      description: "Monitor system activity and security",
      icon: Activity,
      href: "/dashboard/system-logs",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            HEALTHCARE MONITORING SYSTEM IN BARANGAY HAPPY HOMES OLD LUCBAN, BAGUIO CITY
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive Healthcare Management System
          </p>
          <Link to="/dashboard/admin">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Access Admin Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={feature.href}>
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
