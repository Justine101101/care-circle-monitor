
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/DataTable";
import { AddImmunizationDialog } from "@/components/AddImmunizationDialog";
import { useToast } from "@/hooks/use-toast";

const Immunizations = () => {
  const { toast } = useToast();
  const [immunizations, setImmunizations] = useState([
    {
      id: 1,
      patientName: "John Smith",
      vaccine: "COVID-19 Pfizer",
      date: "2024-06-15",
      doseNumber: "Booster",
      administeredBy: "Nurse Mike Chen",
      nextDue: "2025-06-15",
    },
    {
      id: 2,
      patientName: "Emily Davis",
      vaccine: "Influenza",
      date: "2024-06-10",
      doseNumber: "Annual",
      administeredBy: "Nurse Sarah Lee",
      nextDue: "2025-06-10",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      vaccine: "Tetanus",
      date: "2024-06-05",
      doseNumber: "1st",
      administeredBy: "Dr. Lisa Brown",
      nextDue: "2034-06-05",
    },
  ]);

  const columns = [
    { key: "patientName", title: "Patient" },
    { key: "vaccine", title: "Vaccine" },
    { key: "date", title: "Date Given" },
    { key: "doseNumber", title: "Dose" },
    { key: "administeredBy", title: "Administered By" },
    { key: "nextDue", title: "Next Due" },
  ];

  const handleAddImmunization = (newImmunization: any) => {
    setImmunizations([...immunizations, newImmunization]);
    toast({
      title: "Immunization Added",
      description: `${newImmunization.vaccine} for ${newImmunization.patientName} has been recorded`,
    });
  };

  const handleEdit = (immunization: any) => {
    toast({
      title: "Edit Immunization",
      description: `Editing ${immunization.vaccine} record for ${immunization.patientName}`,
    });
  };

  const handleDelete = (immunization: any) => {
    setImmunizations(immunizations.filter(i => i.id !== immunization.id));
    toast({
      title: "Immunization Record Deleted",
      description: `${immunization.vaccine} record for ${immunization.patientName} has been removed`,
    });
  };

  // Calculate dynamic stats
  const totalImmunizations = immunizations.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Immunizations</h1>
          <p className="text-gray-600">Track and manage patient vaccinations</p>
        </div>
        <AddImmunizationDialog onAddImmunization={handleAddImmunization} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{totalImmunizations}</CardTitle>
            <CardDescription>Total Vaccines Given</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">145</CardTitle>
            <CardDescription>This Month</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">67</CardTitle>
            <CardDescription>Due This Week</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">94%</CardTitle>
            <CardDescription>Vaccination Rate</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Immunization Records</CardTitle>
          <CardDescription>View and manage all vaccination records</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={immunizations} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Immunizations;
