
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Database, Download, Upload, Clock } from "lucide-react";

interface BackupSystemDialogProps {
  children: React.ReactNode;
}

export const BackupSystemDialog = ({ children }: BackupSystemDialogProps) => {
  const { toast } = useToast();
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleManualBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simulate backup process
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast({
            title: "Backup Complete",
            description: "System backup has been created successfully",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRestoreBackup = () => {
    toast({
      title: "Restore Initiated",
      description: "Please select a backup file to restore from",
    });
  };

  const handleSaveBackupSettings = () => {
    const settings = {
      autoBackup,
      backupFrequency,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('backup_settings', JSON.stringify(settings));

    toast({
      title: "Backup Settings Saved",
      description: "Your backup configuration has been updated",
    });
  };

  const recentBackups = [
    { id: 1, date: '2024-01-15 14:30', size: '1.2 GB', status: 'Complete' },
    { id: 2, date: '2024-01-14 14:30', size: '1.1 GB', status: 'Complete' },
    { id: 3, date: '2024-01-13 14:30', size: '1.0 GB', status: 'Complete' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup System
          </DialogTitle>
          <DialogDescription>
            Manage system backups and restore points
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleManualBackup}
              disabled={isBackingUp}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isBackingUp ? 'Creating Backup...' : 'Create Manual Backup'}
            </Button>
            <Button 
              variant="outline"
              onClick={handleRestoreBackup}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Restore from Backup
            </Button>
          </div>

          {isBackingUp && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backup Progress</span>
                <span>{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </div>
          )}

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Backup Settings</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Automatic Backups</label>
                <p className="text-xs text-muted-foreground">Enable scheduled backups</p>
              </div>
              <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Frequency</label>
              <Select value={backupFrequency} onValueChange={setBackupFrequency} disabled={!autoBackup}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveBackupSettings} variant="outline" className="w-full">
              Save Backup Settings
            </Button>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Recent Backups</h4>
            <div className="space-y-2">
              {recentBackups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{backup.date}</p>
                      <p className="text-xs text-gray-500">{backup.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {backup.status}
                    </span>
                    <Button size="sm" variant="outline">
                      Restore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
