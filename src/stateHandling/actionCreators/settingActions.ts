import { SettingsState } from "../../settingTypes";
import { Action } from "../store";

export enum SettingsActionType {
    INIT,
    VALUE_CHANGE,
    RELOAD_SETTINGS,
    SUCCESS
}

export interface SettingsAction extends Action<SettingsState> {
    type: SettingsActionType;
    payload?: any;
}

/**
 * Action creators
 */
export const initAction = (): SettingsAction => ({ type: SettingsActionType.INIT });
export const valueChangeAction = (key: keyof SettingsState, value: any ): SettingsAction => 
({ type: SettingsActionType.VALUE_CHANGE, 
    payload: { change: {[key]: value} }})
export const reloadSettingsAction = (settings: SettingsState ): SettingsAction => 
({type: SettingsActionType.RELOAD_SETTINGS, 
    payload: {settings: settings}});  