import { act, renderHook } from "@testing-library/react";
import { BehaviorSubject } from "rxjs";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import container from "../../../../core/di/Container";
import { useAuth } from "../../../../features/auth/hooks/useAuth";

const mockAuthService = {
  signIn: vi.fn(),
  logOut: vi.fn(),
  getAuthState: vi.fn(),
};

describe("useAuth", () => {
  beforeEach(() => {
    vi.spyOn(container, "resolve").mockReturnValue(mockAuthService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.authService).toBe(mockAuthService);
    expect(result.current.isAuthenticated$).toBeInstanceOf(BehaviorSubject);
    expect(result.current.userId$).toBeInstanceOf(BehaviorSubject);
    expect(result.current.isAuthenticated$.value).toBe(false);
    expect(result.current.userId$.value).toBe(null);
  });

  it("should log out and update state", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logOut();
    });

    expect(mockAuthService.logOut).toHaveBeenCalled();
  });
});
