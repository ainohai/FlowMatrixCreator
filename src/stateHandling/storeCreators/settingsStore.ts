import { SettingsState } from "../../settingTypes";
import { getInitialConfigObj } from "../../utils/parseUrl";
import { recalculateMagnets } from "../epics/recalculateMagnets";
import createSettingsReducer from "../reducers/settingsReducer";
import settingsReducer from "../reducers/settingsReducer";
import createStore, { Epic, Store } from "../store";

const epics: Epic<SettingsState> = recalculateMagnets;

let store;
let initialSettings;


export function createSettingsStore(): Store<SettingsState> {
    store = createStore(createSettingsReducer(getInitialSettings()), epics);
    return store
};

export function createInitialSettings(): Store<SettingsState> {
    initialSettings = { ...getInitialConfigObj() };
    return initialSettings
};

const settingsStore = (): Store<SettingsState> => {
    if (!store) {
        throw new Error("Uninitialized settings store error")
    }
    return store;
}

export function getInitialSettings(): SettingsState {
    if (!initialSettings) {
        createInitialSettings();
    }
    return initialSettings;
}

export default settingsStore

