import { FC, PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { Toolbar, ToolbarButton } from "@radix-ui/react-toolbar";

import { useMainLayout } from "../../features/auth/hooks/useMainLayout";

const MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isAuthenticated, handleLogOut, userId } = useMainLayout();

  return (
    <div className="min-h-screen flex flex-col">
      <Toolbar className="bg-blue-500 text-white flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <ToolbarButton asChild>
            <Link to="/" className="text-white font-semibold text-lg">
              Home
            </Link>
          </ToolbarButton>
          {!isAuthenticated && (
            <ToolbarButton asChild>
              <Link
                to="/auth/sign-in"
                className="text-white font-semibold text-lg"
              >
                Sign In
              </Link>
            </ToolbarButton>
          )}
          {isAuthenticated && (
            <ToolbarButton asChild>
              <Link
                to={`/user/${userId}`}
                className="text-white font-semibold text-lg"
              >
                Profile
              </Link>
            </ToolbarButton>
          )}
        </div>
        {isAuthenticated && (
          <ToolbarButton asChild>
            <button
              onClick={handleLogOut}
              className="text-white font-semibold text-lg"
            >
              Log Out
            </button>
          </ToolbarButton>
        )}
      </Toolbar>
      <main className="flex-grow p-4 bg-gray-100">{children}</main>
    </div>
  );
};

export default MainLayout;
