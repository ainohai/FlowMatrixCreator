import { useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { SettingsState } from "../../settingTypes";
import { SettingsActionType } from "../../stateHandling/reducers/settingsReducer";
import settingsStore, { getInitialSettings } from "../../stateHandling/storeCreators/settingsStore";
import { subscribeToSettings } from "../../stateHandling/subscriptions";

export function useSettings(): [SettingsState, (settings: SettingsState) => void] {

  const settings = getInitialSettings();
  const [state, setState] = useState({...settings});

  const setSettings = (settings: SettingsState) => settingsStore().dispatch({type: SettingsActionType.RELOAD_SETTINGS, 
    payload: {settings: settings}})

  useEffect(() => {

    const subscriptions: Subscription[] = [
      subscribeToSettings(settings => setState(state => ({ ...state, ...settings }))),
    ];
    return () => { subscriptions.map(it => it.unsubscribe()) };
  }, []);

  return [state, setSettings]
}