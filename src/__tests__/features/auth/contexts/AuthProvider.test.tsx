import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import container from "../../../../core/di/Container";
import {
  AuthProvider,
  useAuthContext,
} from "../../../../features/auth/contexts/AuthProvider";

class MockAuthService {
  signIn = vi.fn((email, password) =>
    Promise.resolve({
      isAuthenticated:
        email === "demo@gmail.com" && password === "demoPassword",
      userId:
        email === "demo@gmail.com" && password === "demoPassword"
          ? "12345"
          : undefined,
    })
  );

  logOut = vi.fn(() => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
  });

  getAuthState = vi.fn(() => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    userId: localStorage.getItem("userId"),
  }));
}

container.register("AuthService", MockAuthService as any);

const TestComponent = () => {
  const { isAuthenticated$, userId$, signIn, logOut } = useAuthContext();

  return (
    <div>
      <div>Authenticated: {isAuthenticated$.value.toString()}</div>
      <div>User ID: {userId$.value}</div>
      <button onClick={() => signIn("demo@gmail.com", "demoPassword")}>
        Sign In
      </button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

describe("AuthProvider", () => {
  let mockAuthService: MockAuthService;

  beforeEach(() => {
    localStorage.clear();
    mockAuthService = container.resolve<MockAuthService>("AuthService");
    vi.clearAllMocks();
  });

  it("should provide initial auth state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText(/Authenticated: false/i)).toBeInTheDocument();
    expect(screen.getByText(/User ID:/i)).toBeInTheDocument();
  });
});
