import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { Theme } from "@radix-ui/themes";

import container from "../core/di/Container";
import AuthService from "../core/services/AuthService";
import { AuthProvider } from "../features/auth/contexts/AuthProvider";
import { router } from "./router";
import "@radix-ui/themes/styles.css";

container.register("AuthService", AuthService);

const App: React.FC = () => {
  const authServiceInstance = container.resolve<AuthService>("AuthService");
  console.log("Resolved AuthService instance:", authServiceInstance);

  return (
    <AuthProvider>
      <Theme>
        <RouterProvider router={router}></RouterProvider>
      </Theme>
    </AuthProvider>
  );
};

export default App;
