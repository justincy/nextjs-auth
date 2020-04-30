import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  React.useEffect(() => {
    const initializeAuth = async () => {
      const response = await fetch('/api/checkAuth');
      setAuthenticated(response.status === 200);
    };
    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
