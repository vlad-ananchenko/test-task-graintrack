import { act, renderHook } from "@testing-library/react";
import { Subject, Subscription } from "rxjs";
import { vi } from "vitest";
import { useObservable } from "../../../shared/utils/useObservable";

describe("useObservable", () => {
  it("should update state based on observable emissions", () => {
    const subject = new Subject<number>();
    const { result } = renderHook(() => useObservable(subject.asObservable()));

    expect(result.current).toBeUndefined();

    act(() => {
      subject.next(1);
    });
    expect(result.current).toBe(1);

    act(() => {
      subject.next(2);
    });
    expect(result.current).toBe(2);

    act(() => {
      subject.next(3);
    });
    expect(result.current).toBe(3);
  });

  it("should unsubscribe on unmount", () => {
    const subscription = new Subscription();
    const unsubscribeSpy = vi.spyOn(subscription, "unsubscribe");

    const mockObservable = {
      subscribe: () => subscription,
    };

    const { unmount } = renderHook(() => useObservable(mockObservable as any));

    unmount();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
