import { describe, it, expect, vi } from "vitest";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";

describe("createRouter", () => {
  it("should create a router with the provided route tree", () => {
    const mockCreateRouter = vi.fn(createRouter);
    const router = mockCreateRouter({ routeTree });

    expect(mockCreateRouter).toHaveBeenCalledWith({ routeTree });
    expect(router.routeTree).toBe(routeTree);
  });

  it("should register the router in the module", () => {
    const mockCreateRouter = vi.fn(createRouter);
    const router = mockCreateRouter({ routeTree });

    expect(router).toBeDefined();
    expect(router.routeTree).toBe(routeTree);
  });
});
