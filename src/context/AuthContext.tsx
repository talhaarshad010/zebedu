import React, { createContext, useContext, useState } from 'react';

type UserRole = 'student' | 'instructor' | null;

interface AuthContextType {
  role: UserRole;
  signIn: (role: UserRole) => void;
  signOut: () => void;
  isFirstTime: boolean;
  completeSetup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const signIn = (newRole: UserRole) => setRole(newRole);
  const signOut = () => setRole(null);
  const completeSetup = () => setIsFirstTime(false);

  return (
    <AuthContext.Provider value={{ role, signIn, signOut, isFirstTime, completeSetup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
