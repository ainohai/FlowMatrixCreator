import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { MagnetPoint } from "../../entities/MagnetPoint";
import { subscribeToMagnets } from "../../stateHandling/subscriptions";

export type MagnetsState = {
  showMagnets: boolean,
  showButton: boolean,
  magnets: MagnetPoint[]
};

export function useMagnets(): [MagnetsState, StateUpdater<MagnetsState>] {

  const [state, setState] = useState({ magnets: [] as MagnetPoint[], showMagnets: false, showButton: true });

  useEffect(() => {
    const subscriptions: Subscription[] = [
      subscribeToMagnets(magnets => { setState(state => ({ ...state, ...{ magnets: [...magnets] } })) })
    ];

    return () => { console.log("cleared"); subscriptions.map(it => it.unsubscribe()) };
  }, []);

  return [state, setState]
}