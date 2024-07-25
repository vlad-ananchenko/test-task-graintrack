import { useState, FormEvent, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../../auth/contexts/AuthProvider";

interface FormState {
  email: string;
  password: string;
}

const useSignInForm = () => {
  const { signIn } = useAuthContext();
  const [state, setState] = useState<FormState>({ email: "", password: "" });

  const navigate = useNavigate();

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, email: e.target.value }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, password: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const result = await signIn(state.email, state.password);
      if (result?.isAuthenticated && result.userId) {
        navigate({ to: `/user/${result.userId}` });
      }
    },
    [state.email, state.password, signIn, navigate]
  );

  return {
    email: state.email,
    password: state.password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useSignInForm;
