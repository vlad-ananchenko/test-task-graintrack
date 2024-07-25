import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useAuthContext } from "../contexts/AuthProvider";

const useAuthRedirect = () => {
  const { userId$ } = useAuthContext();
  const navigate = useNavigate();
  const params = useParams({ from: "/user/$userId" });

  useEffect(() => {
    const subscription = userId$.subscribe((currentUserId) => {
      const storedUserId = localStorage.getItem("userId");

      if (!currentUserId || storedUserId !== params.userId) {
        navigate({ to: "/" });
      } else if (currentUserId === params.userId) {
        navigate({ to: `/user/${params.userId}` });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [params.userId, userId$, navigate]);

  useEffect(() => {
    console.log("Current user ID from context:", userId$.value);
  }, [userId$]);
};

export { useAuthRedirect };
