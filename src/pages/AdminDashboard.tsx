import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, FileText, Syringe, Calendar, Activity, TrendingUp, AlertTriangle, Shield, Database } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { GenerateReportDialog } from "@/components/GenerateReportDialog";
import { SecuritySettingsDialog } from "@/components/SecuritySettingsDialog";
import { BackupSystemDialog } from "@/components/BackupSystemDialog";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data for charts
  const userGrowthData = [
    { month: 'Jan', users: 45 },
    { month: 'Feb', users: 52 },
    { month: 'Mar', users: 61 },
    { month: 'Apr', users: 58 },
    { month: 'May', users: 67 },
    { month: 'Jun', users: 73 },
  ];

  const departmentData = [
    { name: 'General Medicine', value: 35, color: '#3b82f6' },
    { name: 'Pediatrics', value: 25, color: '#10b981' },
    { name: 'Emergency', value: 20, color: '#f59e0b' },
    { name: 'Administration', value: 12, color: '#ef4444' },
    { name: 'Nursing', value: 8, color: '#8b5cf6' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Dr. Sarah Johnson",
      action: "Updated patient record",
      time: "5 minutes ago",
      type: "update"
    },
    {
      id: 2,
      user: "Nurse Mike Chen",
      action: "Added new immunization record",
      time: "12 minutes ago",
      type: "create"
    },
    {
      id: 3,
      user: "Admin Lisa Wilson",
      action: "Created new user account",
      time: "25 minutes ago",
      type: "create"
    },
    {
      id: 4,
      user: "Dr. Johnson",
      action: "Scheduled appointment",
      time: "1 hour ago",
      type: "schedule"
    },
  ];

  const systemHealth = {
    database: 98,
    server: 99,
    backup: 95,
    security: 100
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Healthcare System Overview & Management</p>
        </div>
        <GenerateReportDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Database className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </GenerateReportDialog>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">6</span> completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              User Growth Trend
            </CardTitle>
            <CardDescription>Monthly user registration over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Staff distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Performance</span>
                <span>{systemHealth.database}%</span>
              </div>
              <Progress value={systemHealth.database} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Uptime</span>
                <span>{systemHealth.server}%</span>
              </div>
              <Progress value={systemHealth.server} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backup Status</span>
                <span>{systemHealth.backup}%</span>
              </div>
              <Progress value={systemHealth.backup} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Security Score</span>
                <span>{systemHealth.security}%</span>
              </div>
              <Progress value={systemHealth.security} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.type === 'create' ? 'default' : activity.type === 'update' ? 'secondary' : 'outline'}
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => navigate('/dashboard/users')}
            >
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <GenerateReportDialog>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">View Reports</span>
              </Button>
            </GenerateReportDialog>
            <SecuritySettingsDialog>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Shield className="h-6 w-6 mb-2" />
                <span className="text-sm">Security Settings</span>
              </Button>
            </SecuritySettingsDialog>
            <BackupSystemDialog>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Database className="h-6 w-6 mb-2" />
                <span className="text-sm">Backup System</span>
              </Button>
            </BackupSystemDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
