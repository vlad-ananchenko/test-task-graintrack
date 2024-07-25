import { createLazyFileRoute } from "@tanstack/react-router";

import SignInPage from "../../pages/auth/SignInPage";

export const Route = createLazyFileRoute("/auth/sign-in")({
  component: () => <SignInPage />,
});
