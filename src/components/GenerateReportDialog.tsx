
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText } from "lucide-react";

interface GenerateReportDialogProps {
  children: React.ReactNode;
}

export const GenerateReportDialog = ({ children }: GenerateReportDialogProps) => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [includeCharts, setIncludeCharts] = useState(false);
  const [includeUserData, setIncludeUserData] = useState(false);
  const [includeSystemMetrics, setIncludeSystemMetrics] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!reportType || !dateRange) {
      toast({
        title: "Missing Information",
        description: "Please select report type and date range",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const reportData = {
        type: reportType,
        dateRange,
        includeCharts,
        includeUserData,
        includeSystemMetrics,
        generatedAt: new Date().toISOString(),
        filename: `${reportType}-report-${Date.now()}.pdf`
      };

      // Create a mock download
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = reportData.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsGenerating(false);
      toast({
        title: "Report Generated",
        description: `${reportType} report has been generated and downloaded`,
      });
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Report
          </DialogTitle>
          <DialogDescription>
            Configure and generate system reports
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user-activity">User Activity Report</SelectItem>
                <SelectItem value="system-performance">System Performance Report</SelectItem>
                <SelectItem value="patient-statistics">Patient Statistics Report</SelectItem>
                <SelectItem value="appointment-summary">Appointment Summary Report</SelectItem>
                <SelectItem value="security-audit">Security Audit Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Include Options</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="charts" 
                  checked={includeCharts}
                  onCheckedChange={setIncludeCharts}
                />
                <label htmlFor="charts" className="text-sm">Include Charts and Graphs</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="userdata" 
                  checked={includeUserData}
                  onCheckedChange={setIncludeUserData}
                />
                <label htmlFor="userdata" className="text-sm">Include User Data</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="metrics" 
                  checked={includeSystemMetrics}
                  onCheckedChange={setIncludeSystemMetrics}
                />
                <label htmlFor="metrics" className="text-sm">Include System Metrics</label>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>Generating Report...</>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
