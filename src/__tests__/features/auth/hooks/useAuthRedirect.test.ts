import { renderHook } from "@testing-library/react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { BehaviorSubject } from "rxjs";
import { useAuthContext } from "../../../../features/auth/contexts/AuthProvider";
import { useAuthRedirect } from "../../../../features/auth/hooks/useAuthRedirect";

import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock("../../../../features/auth/contexts/AuthProvider", () => ({
  useAuthContext: vi.fn(),
}));

describe("useAuthRedirect", () => {
  const mockNavigate = vi.fn();
  const mockParams = { userId: "12345" };
  const mockUserId$ = new BehaviorSubject<string | null>(null);

  beforeEach(() => {
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate
    );
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockParams
    );
    (useAuthContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      userId$: mockUserId$,
    });

    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockUserId$.next(null);
  });

  it("should redirect to home if userId is not found in context or localStorage", () => {
    renderHook(() => useAuthRedirect());

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("should redirect to user page if userId matches", () => {
    localStorage.setItem("userId", "12345");
    mockUserId$.next("12345");

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/user/12345" });
  });

  it("should redirect to home if userId does not match", () => {
    localStorage.setItem("userId", "54321");
    mockUserId$.next("12345");

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
  });
});
