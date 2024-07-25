import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { useParams } from "@tanstack/react-router";
import UserPage from "../../pages/UserPage";
import { useAuthContext } from "../../features/auth/contexts/AuthProvider";

vi.mock("@tanstack/react-router", () => ({
  useParams: vi.fn(),
}));

vi.mock("../../features/auth/contexts/AuthProvider", () => ({
  useAuthContext: vi.fn(),
}));

vi.mock("../../features/auth/hooks/useAuthRedirect", () => ({
  useAuthRedirect: vi.fn(),
}));

describe("UserPage", () => {
  // @ts-ignore
  const mockUseParams = useParams as vi.Mock;
  // @ts-ignore

  const mockUseAuthContext = useAuthContext as vi.Mock;

  beforeEach(() => {
    mockUseParams.mockReturnValue({ userId: "12345" });
    mockUseAuthContext.mockReturnValue({ userId$: { value: "12345" } });
  });

  it("renders UserPage with correct user ID", () => {
    render(<UserPage />);

    expect(screen.getByText(/User ID: 12345/i)).toBeInTheDocument();
  });

  it("renders Unauthorized if user IDs do not match", () => {
    mockUseParams.mockReturnValue({ userId: "67890" });
    render(<UserPage />);

    expect(screen.getByText(/Unauthorized.../i)).toBeInTheDocument();
  });
});
