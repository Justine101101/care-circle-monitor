
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Activity, UserPlus, LogIn } from 'lucide-react';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (currentView === 'login') {
        const success = await login(formData.username, formData.password);
        if (success) {
          toast({
            title: "Login Successful",
            description: "Welcome to the Healthcare Monitoring System",
          });
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid username or password",
            variant: "destructive"
          });
        }
      } else if (currentView === 'register') {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Registration Failed",
            description: "Passwords do not match",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        if (!formData.name || !formData.username || !formData.password || !formData.role) {
          toast({
            title: "Registration Failed",
            description: "Please fill in all fields",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        const success = await register(formData.name, formData.username, formData.password, formData.role);
        if (success) {
          toast({
            title: "Registration Successful",
            description: "Account created successfully",
          });
        } else {
          toast({
            title: "Registration Failed",
            description: "Username already exists or registration failed",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  const toggleMode = (mode: 'login' | 'register') => {
    setCurrentView(mode);
    setFormData({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: ''
    });
  };

  if (currentView === 'forgot-password') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Activity className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Healthcare Monitoring System
            </h1>
            <p className="text-gray-600">
              Barangay Happy Homes Old Lucban, Baguio City
            </p>
          </div>
          <ForgotPassword onBack={() => setCurrentView('login')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Healthcare Monitoring System
          </h1>
          <p className="text-gray-600">
            Barangay Happy Homes Old Lucban, Baguio City
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {currentView === 'login' ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
              {currentView === 'login' ? 'Login' : 'Sign Up'}
            </CardTitle>
            <CardDescription>
              {currentView === 'login' 
                ? 'Enter your credentials to access the system' 
                : 'Create a new account to get started'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentView === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required={currentView === 'register'}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {currentView === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={handleRoleChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthcare Worker">Healthcare Worker</SelectItem>
                        <SelectItem value="Administrator">Administrator</SelectItem>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Nurse">Nurse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (currentView === 'login' ? 'Login' : 'Sign Up')}
              </Button>
            </form>

            {currentView === 'login' && (
              <div className="mt-4 text-center">
                <Button 
                  variant="link" 
                  onClick={() => setCurrentView('forgot-password')}
                  className="text-sm text-blue-600"
                >
                  Forgot Password?
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                onClick={() => toggleMode(currentView === 'login' ? 'register' : 'login')}
                className="text-sm"
              >
                {currentView === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Login"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
