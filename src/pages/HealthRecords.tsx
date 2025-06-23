
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/DataTable";
import { AddHealthRecordDialog } from "@/components/AddHealthRecordDialog";
import { useToast } from "@/hooks/use-toast";

const HealthRecords = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState([
    {
      id: 1,
      patientName: "John Smith",
      recordType: "Medical Exam",
      date: "2024-06-20",
      diagnosis: "Hypertension",
      doctor: "Dr. Sarah Johnson",
      status: "Completed",
    },
    {
      id: 2,
      patientName: "Emily Davis",
      recordType: "Lab Test",
      date: "2024-06-18",
      diagnosis: "Blood Work - Normal",
      doctor: "Dr. Mike Wilson",
      status: "Completed",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      recordType: "X-Ray",
      date: "2024-06-15",
      diagnosis: "Chest X-Ray - Clear",
      doctor: "Dr. Lisa Brown",
      status: "Reviewed",
    },
  ]);

  const columns = [
    { key: "patientName", title: "Patient" },
    { key: "recordType", title: "Record Type" },
    { key: "date", title: "Date" },
    { key: "diagnosis", title: "Diagnosis/Result" },
    { key: "doctor", title: "Doctor" },
    { key: "status", title: "Status" },
  ];

  const handleAddRecord = (newRecord: any) => {
    setRecords([...records, newRecord]);
    toast({
      title: "Health Record Added",
      description: `Record for ${newRecord.patientName} has been created`,
    });
  };

  const handleEdit = (record: any) => {
    toast({
      title: "Edit Health Record",
      description: `Editing record for ${record.patientName}`,
    });
  };

  const handleDelete = (record: any) => {
    setRecords(records.filter(r => r.id !== record.id));
    toast({
      title: "Health Record Deleted",
      description: `Record for ${record.patientName} has been removed`,
    });
  };

  // Calculate dynamic stats
  const totalRecords = records.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600">Manage medical history and health data</p>
        </div>
        <AddHealthRecordDialog onAddRecord={handleAddRecord} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{totalRecords}</CardTitle>
            <CardDescription>Total Records</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">234</CardTitle>
            <CardDescription>This Month</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">12</CardTitle>
            <CardDescription>Pending Review</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">98%</CardTitle>
            <CardDescription>Completion Rate</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health Records Management</CardTitle>
          <CardDescription>View and manage all patient health records</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={records} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecords;
