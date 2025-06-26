
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Shield, Save } from "lucide-react";

interface SecuritySettingsDialogProps {
  children: React.ReactNode;
}

export const SecuritySettingsDialog = ({ children }: SecuritySettingsDialogProps) => {
  const { toast } = useToast();
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordComplexity, setPasswordComplexity] = useState('medium');
  const [loginAttempts, setLoginAttempts] = useState('5');
  const [auditLogging, setAuditLogging] = useState(true);
  const [encryptData, setEncryptData] = useState(true);

  const handleSaveSettings = () => {
    const settings = {
      twoFactorAuth,
      sessionTimeout: parseInt(sessionTimeout),
      passwordComplexity,
      maxLoginAttempts: parseInt(loginAttempts),
      auditLogging,
      encryptData,
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage for demo purposes
    localStorage.setItem('security_settings', JSON.stringify(settings));

    toast({
      title: "Security Settings Updated",
      description: "Your security configuration has been saved successfully",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </DialogTitle>
          <DialogDescription>
            Configure system security and access controls
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Two-Factor Authentication</label>
              <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
            </div>
            <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Session Timeout (minutes)</label>
            <Input 
              type="number" 
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              placeholder="Session timeout in minutes"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password Complexity</label>
            <Select value={passwordComplexity} onValueChange={setPasswordComplexity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - 6+ characters</SelectItem>
                <SelectItem value="medium">Medium - 8+ chars, mixed case</SelectItem>
                <SelectItem value="high">High - 12+ chars, symbols, numbers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Login Attempts</label>
            <Input 
              type="number" 
              value={loginAttempts}
              onChange={(e) => setLoginAttempts(e.target.value)}
              placeholder="Maximum failed login attempts"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Audit Logging</label>
              <p className="text-xs text-muted-foreground">Log all user activities</p>
            </div>
            <Switch checked={auditLogging} onCheckedChange={setAuditLogging} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Data Encryption</label>
              <p className="text-xs text-muted-foreground">Encrypt sensitive data at rest</p>
            </div>
            <Switch checked={encryptData} onCheckedChange={setEncryptData} />
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Security Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
