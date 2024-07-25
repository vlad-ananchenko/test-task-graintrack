import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useObservable } from "../../../shared/utils/useObservable";
import { useAuthContext } from "../contexts/AuthProvider";

export const useMainLayout = () => {
  const { isAuthenticated$, logOut, userId$ } = useAuthContext();
  const isAuthenticated = useObservable(isAuthenticated$);
  const userId = useObservable(userId$);
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    logOut();
    navigate({ to: "/auth/sign-in" });
  }, [logOut, navigate]);

  return { isAuthenticated, handleLogOut, userId };
};
