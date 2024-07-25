import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { BehaviorSubject } from "rxjs";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
  isAuthenticated$: BehaviorSubject<boolean>;
  userId$: BehaviorSubject<string | null>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ isAuthenticated: boolean; userId?: string }>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { isAuthenticated, userId } = auth.authService.getAuthState();
    auth.isAuthenticated$.next(isAuthenticated);
    auth.userId$.next(userId);
    setIsLoading(false);
  }, [auth]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await auth.signIn(email, password);
      if (result) {
        auth.isAuthenticated$.next(result.isAuthenticated);
        auth.userId$.next(result.userId || null);
      }
      return result;
    },
    [auth]
  );

  const logOut = useCallback(() => {
    auth.logOut();
    auth.isAuthenticated$.next(false);
    auth.userId$.next(null);
  }, [auth]);

  const value = useMemo(
    () => ({ ...auth, signIn, logOut }),
    [auth, signIn, logOut]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
