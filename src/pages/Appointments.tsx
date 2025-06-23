
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/DataTable";
import { AddAppointmentDialog } from "@/components/AddAppointmentDialog";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "2024-06-25",
      time: "10:00 AM",
      type: "Consultation",
      status: "Scheduled",
    },
    {
      id: 2,
      patientName: "Emily Davis",
      doctor: "Dr. Mike Wilson",
      date: "2024-06-25",
      time: "2:30 PM",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      doctor: "Dr. Lisa Brown",
      date: "2024-06-26",
      time: "9:15 AM",
      type: "Check-up",
      status: "Scheduled",
    },
  ]);

  const columns = [
    { key: "patientName", title: "Patient" },
    { key: "doctor", title: "Doctor" },
    { key: "date", title: "Date" },
    { key: "time", title: "Time" },
    { key: "type", title: "Type" },
    { key: "status", title: "Status" },
  ];

  const handleAddAppointment = (newAppointment: any) => {
    setAppointments([...appointments, newAppointment]);
    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${newAppointment.patientName} has been scheduled`,
    });
  };

  const handleEdit = (appointment: any) => {
    toast({
      title: "Edit Appointment",
      description: `Editing appointment for ${appointment.patientName}`,
    });
  };

  const handleDelete = (appointment: any) => {
    setAppointments(appointments.filter(a => a.id !== appointment.id));
    toast({
      title: "Appointment Cancelled",
      description: `Appointment for ${appointment.patientName} has been cancelled`,
    });
  };

  // Calculate dynamic stats
  const totalAppointments = appointments.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <AddAppointmentDialog onAddAppointment={handleAddAppointment} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{totalAppointments}</CardTitle>
            <CardDescription>Total Appointments</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">45</CardTitle>
            <CardDescription>This Week</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">8</CardTitle>
            <CardDescription>Pending Confirmation</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">92%</CardTitle>
            <CardDescription>Attendance Rate</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>View and manage all patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={appointments} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
