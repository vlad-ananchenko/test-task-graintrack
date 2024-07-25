import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SignInPage from "../../../pages/auth/SignInPage";
import { AuthProvider } from "../../../features/auth/contexts/AuthProvider";
import container from "../../../core/di/Container";

class MockAuthService {
  signIn = vi
    .fn()
    .mockResolvedValue({ isAuthenticated: true, userId: "12345" });

  getAuthState = vi
    .fn()
    .mockReturnValue({ isAuthenticated: true, userId: "12345" });
}

beforeAll(() => {
  container.register("AuthService", MockAuthService);
});

vi.mock("../../../features/forms/components/SignInForm", () => {
  return {
    default: () => <div data-testid="signin-form">SignInForm</div>,
  };
});

describe("SignInPage", () => {
  it("renders SignInForm", () => {
    render(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    );

    expect(screen.getByTestId("signin-form")).toBeInTheDocument();
  });
});
