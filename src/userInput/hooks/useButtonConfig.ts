import { useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { getInitialSettings } from "../../stateHandling/storeCreators/settingsStore";
import { ButtonConfs, subscribeToButtonConfs } from "../../stateHandling/subscriptions";
import { showAdvanced } from "../../utils/parseUrl";


export function useButtonConfig(): [ButtonConfs] {


  const { SHOW_BUTTONS, SHOW_CONTROLS } = getInitialSettings();
  const [buttonConfs, setButtonConfs] = useState({ showButtons: SHOW_BUTTONS, showControls: SHOW_CONTROLS, showAdvanced: showAdvanced() });

  useEffect(() => {

    const subscriptions: Subscription[] = [
      subscribeToButtonConfs(state => setButtonConfs(state))
    ];
    return () => { subscriptions.map(it => it.unsubscribe()) };
  }, []);

  return [buttonConfs]
}