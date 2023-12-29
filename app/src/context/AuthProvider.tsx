import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (status: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  setIsAuth: () => {},
});

export const useAuthProvider = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
