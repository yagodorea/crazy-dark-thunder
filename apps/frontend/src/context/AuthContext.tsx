import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  apiKey: string | null;
  isAuthenticated: boolean;
  login: (key: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'dnd-api-key';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });

  const isAuthenticated = apiKey !== null;

  const login = (key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
  };

  return (
    <AuthContext.Provider value={{ apiKey, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
