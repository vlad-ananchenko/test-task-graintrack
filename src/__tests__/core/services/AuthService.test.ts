import { describe, it, expect, beforeEach } from "vitest";
import AuthService from "../../../core/services/AuthService";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    localStorage.clear();
  });

  it("should sign in with correct credentials", async () => {
    const result = await authService
      .signIn("demo@gmail.com", "demoPassword")
      .toPromise();
    expect(result?.isAuthenticated).toBe(true);
    expect(result?.userId).toBe("12345");
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
    expect(localStorage.getItem("userId")).toBe("12345");
  });

  it("should not sign in with incorrect credentials", async () => {
    const result = await authService
      .signIn("wrong@gmail.com", "wrongPassword")
      .toPromise();
    expect(result?.isAuthenticated).toBe(false);
    expect(result?.userId).toBeUndefined();
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
  });

  it("should log out", () => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", "12345");
    authService.logOut();
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
  });

  it("should get auth state", () => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", "12345");
    const authState = authService.getAuthState();
    expect(authState.isAuthenticated).toBe(true);
    expect(authState.userId).toBe("12345");
  });
});
