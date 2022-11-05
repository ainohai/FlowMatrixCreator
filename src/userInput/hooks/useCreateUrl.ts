import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { SettingsState } from "../../settingTypes";
import { getInitialSettings } from "../../stateHandling/storeCreators/settingsStore";
import { subscribeToSettings } from "../../stateHandling/subscriptions";

export type UrlState = {
    urlCreated: string;
    showButtons: boolean;
    showConfigs: boolean;
    showAdvanced: boolean;
    settings: SettingsState;
};

export function useCreateUrl(): [UrlState, StateUpdater<UrlState>] {

    const settings = getInitialSettings();

    const [state, setState] = useState(
        {
            urlCreated: "",
            showButtons: settings.SHOW_BUTTONS,
            showConfigs: settings.SHOW_CONTROLS,
            settings: settings
        } as UrlState);


    useEffect(() => {

        const subscriptions: Subscription[] = [
            subscribeToSettings(settings => setState(state => ({ ...state, settings }))),
        ];
        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, []);

    return [state, setState]
}