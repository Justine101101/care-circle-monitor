
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper functions to safely access localStorage
const safeLocalStorageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn('localStorage access denied:', error);
    return null;
  }
};

const safeLocalStorageSet = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn('localStorage write denied:', error);
  }
};

const safeLocalStorageRemove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('localStorage remove denied:', error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = safeLocalStorageGet('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.warn('Failed to parse saved user data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app, this would be an actual API request
      const savedUsersString = safeLocalStorageGet('registeredUsers');
      const savedUsers = savedUsersString ? JSON.parse(savedUsersString) : [];
      const user = savedUsers.find((u: any) => u.username === username && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        safeLocalStorageSet('user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, username: string, password: string, role: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app, this would be an actual API request
      const savedUsersString = safeLocalStorageGet('registeredUsers');
      const savedUsers = savedUsersString ? JSON.parse(savedUsersString) : [];
      
      // Check if user already exists
      if (savedUsers.find((u: any) => u.username === username)) {
        return false;
      }

      const newUser = {
        id: Date.now(),
        name,
        username,
        password,
        role
      };

      savedUsers.push(newUser);
      safeLocalStorageSet('registeredUsers', JSON.stringify(savedUsers));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      safeLocalStorageSet('user', JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    safeLocalStorageRemove('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
