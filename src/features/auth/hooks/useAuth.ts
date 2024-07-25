import { useMemo } from "react";
import { BehaviorSubject } from "rxjs";

import container from "../../../core/di/Container";
import AuthService from "../../../core/services/AuthService";

export const useAuth = () => {
  const authService = useMemo(
    () => container.resolve<AuthService>("AuthService"),
    []
  );
  const isAuthenticated$ = useMemo(
    () => new BehaviorSubject<boolean>(false),
    []
  );
  const userId$ = useMemo(() => new BehaviorSubject<string | null>(null), []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ isAuthenticated: boolean; userId?: string }> => {
    const result = await authService.signIn(email, password).toPromise();
    return result || { isAuthenticated: false, userId: undefined };
  };

  const logOut = () => {
    authService.logOut();
  };

  return {
    authService,
    isAuthenticated$,
    userId$,
    signIn,
    logOut,
  };
};
