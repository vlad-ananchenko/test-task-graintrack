import { useParams } from "@tanstack/react-router";
import { useAuthRedirect } from "../features/auth/hooks/useAuthRedirect";
import { useAuthContext } from "../features/auth/contexts/AuthProvider";

const UserPage = () => {
  useAuthRedirect();
  const { userId } = useParams({ from: "/user/$userId" });
  const { userId$ } = useAuthContext();

  if (userId !== userId$.value) {
    return <div>Unauthorized...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-cyan-500">User ID: {userId}</h1>
    </div>
  );
};

export default UserPage;
