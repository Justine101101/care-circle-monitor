
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/DataTable";
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { useToast } from "@/hooks/use-toast";

const Patients = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      lastVisit: "2024-06-20",
    },
    {
      id: 2,
      name: "Emily Davis",
      age: 32,
      gender: "Female",
      phone: "+1-555-0124",
      email: "emily.davis@email.com",
      lastVisit: "2024-06-18",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 67,
      gender: "Male",
      phone: "+1-555-0125",
      email: "robert.johnson@email.com",
      lastVisit: "2024-06-15",
    },
  ]);

  const columns = [
    { key: "name", title: "Patient Name" },
    { key: "age", title: "Age" },
    { key: "gender", title: "Gender" },
    { key: "phone", title: "Phone" },
    { key: "email", title: "Email" },
    { key: "lastVisit", title: "Last Visit" },
  ];

  const handleAddPatient = (newPatient: any) => {
    setPatients([...patients, newPatient]);
    toast({
      title: "Patient Added",
      description: `${newPatient.name} has been registered`,
    });
  };

  const handleEdit = (patient: any) => {
    toast({
      title: "Edit Patient",
      description: `Editing ${patient.name}'s record`,
    });
  };

  const handleDelete = (patient: any) => {
    setPatients(patients.filter(p => p.id !== patient.id));
    toast({
      title: "Patient Record Deleted",
      description: `${patient.name}'s record has been removed`,
    });
  };

  // Calculate dynamic stats
  const totalPatients = patients.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <AddPatientDialog onAddPatient={handleAddPatient} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{totalPatients}</CardTitle>
            <CardDescription>Total Patients</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">89</CardTitle>
            <CardDescription>New This Month</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">456</CardTitle>
            <CardDescription>Active Patients</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">23</CardTitle>
            <CardDescription>Critical Cases</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>View and manage all patient information</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={patients} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
