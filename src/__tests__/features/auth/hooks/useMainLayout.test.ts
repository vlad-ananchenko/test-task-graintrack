import { act, renderHook } from "@testing-library/react";
import { useNavigate } from "@tanstack/react-router";
import { BehaviorSubject } from "rxjs";
import { useMainLayout } from "../../../../features/auth/hooks/useMainLayout";
import { useAuthContext } from "../../../../features/auth/contexts/AuthProvider";
import { vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../../../features/auth/contexts/AuthProvider", () => ({
  useAuthContext: vi.fn(),
}));

describe("useMainLayout", () => {
  const mockNavigate = vi.fn();
  const mockIsAuthenticated$ = new BehaviorSubject<boolean>(false);
  const mockUserId$ = new BehaviorSubject<string | null>(null);
  const mockLogOut = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useAuthContext as any).mockReturnValue({
      isAuthenticated$: mockIsAuthenticated$,
      logOut: mockLogOut,
      userId$: mockUserId$,
    });

    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated$.next(false);
    mockUserId$.next(null);
  });

  it("should return initial auth state and userId", () => {
    const { result } = renderHook(() => useMainLayout());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.userId).toBeNull();
  });

  it("should handle log out correctly", () => {
    const { result } = renderHook(() => useMainLayout());

    act(() => {
      result.current.handleLogOut();
    });

    expect(mockLogOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/auth/sign-in" });
  });

  it("should update auth state and userId correctly", () => {
    mockIsAuthenticated$.next(true);
    mockUserId$.next("12345");

    const { result } = renderHook(() => useMainLayout());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.userId).toBe("12345");
  });
});
