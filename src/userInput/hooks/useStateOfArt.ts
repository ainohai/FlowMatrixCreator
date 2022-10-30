import { useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { StateOfArt } from "../../settingTypes";
import { DrawingState } from "../../stateHandling/reducers/drawingStateReducer";
import { UserActionState } from "../../stateHandling/reducers/userActionReducer";
import { Dispatch } from "../../stateHandling/store";
import drawingStore from "../../stateHandling/storeCreators/drawingStore";
import { getInitialSettings } from "../../stateHandling/storeCreators/settingsStore";
import userActionStore from "../../stateHandling/storeCreators/userActionStore";
import { subscribeToStateOfArtIndex } from "../../stateHandling/subscriptions";



export function useStateOfArt(): [StateOfArt, Dispatch<DrawingState>, Dispatch<UserActionState>] {

  const { USED_STATES } = getInitialSettings();
  const [state, setState] = useState(USED_STATES[0]);

  useEffect(() => {
    const subscriptions: Subscription[] = [
      subscribeToStateOfArtIndex(index => { setState(USED_STATES[index]) }),
    ];

    return () => { console.log("unsubscribing"); subscriptions.map(it => it.unsubscribe()) };
  
  }, []);

  return [state, drawingStore().dispatch, userActionStore.dispatch]
}