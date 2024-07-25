import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export const useObservable = <T>(observable: Observable<T>): T | undefined => {
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);

  return state;
};
