
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/DataTable";

const SystemLogs = () => {
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2024-06-23 14:30:15",
      user: "Dr. Sarah Johnson",
      action: "Patient Record Updated",
      details: "Updated John Smith's medical history",
      level: "INFO",
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      timestamp: "2024-06-23 14:25:42",
      user: "Nurse Mike Chen",
      action: "Immunization Added",
      details: "Added COVID-19 vaccine record for Emily Davis",
      level: "INFO",
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      timestamp: "2024-06-23 14:20:18",
      user: "System",
      action: "Failed Login Attempt",
      details: "Invalid credentials for admin@healthcare.com",
      level: "WARNING",
      ipAddress: "203.0.113.42",
    },
    {
      id: 4,
      timestamp: "2024-06-23 14:15:33",
      user: "Admin Lisa Wilson",
      action: "User Account Created",
      details: "Created new nurse account for Jennifer Lee",
      level: "INFO",
      ipAddress: "192.168.1.102",
    },
  ]);

  const columns = [
    { key: "timestamp", title: "Timestamp" },
    { key: "user", title: "User" },
    { key: "action", title: "Action" },
    { key: "details", title: "Details" },
    { 
      key: "level", 
      title: "Level",
      render: (value: string) => (
        <Badge 
          variant={value === "WARNING" ? "destructive" : value === "ERROR" ? "destructive" : "default"}
        >
          {value}
        </Badge>
      )
    },
    { key: "ipAddress", title: "IP Address" },
  ];

  const enhancedColumns = columns.map(col => ({
    ...col,
    render: col.render || ((value: any) => value)
  }));

  const CustomDataTable = ({ columns, data }: { columns: any[], data: any[] }) => {
    return (
      <div className="rounded-md border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={column.key} className="text-left p-4 font-medium">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b last:border-0">
                {columns.map((column) => (
                  <td key={column.key} className="p-4">
                    {column.render ? column.render(item[column.key]) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="text-gray-600">Monitor system activity and security events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">1,247</CardTitle>
            <CardDescription>Total Log Entries</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">89</CardTitle>
            <CardDescription>Today's Activities</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">3</CardTitle>
            <CardDescription>Warning Events</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">0</CardTitle>
            <CardDescription>Critical Errors</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity Log</CardTitle>
          <CardDescription>Real-time monitoring of system events and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomDataTable columns={enhancedColumns} data={logs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
