import { useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { SettingsState } from "../../settingTypes";
import settingsStore, { getInitialSettings } from "../../stateHandling/storeCreators/settingsStore";
import { subscribeToSettings } from "../../stateHandling/subscriptions";

export function useSettings(): [SettingsState | {}] {

  const settings = getInitialSettings();
  const [state, setState] = useState({ settings: settings });

  useEffect(() => {

    const subscriptions: Subscription[] = [
      subscribeToSettings(settings => setState(state => ({ ...state, settings }))),
    ];
    return () => { subscriptions.map(it => it.unsubscribe()) };
  }, []);

  return [state]
}