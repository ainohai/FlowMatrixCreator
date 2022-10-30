import { SettingsState } from "../../settingTypes";
import { getInitialConfigObj } from "../../utils/parseUrl";
import { Action, Reducer } from "../store";

export enum SettingsActionType {
  INIT,
  VALUE_CHANGE,
  SUCCESS
}

export interface SettingsAction extends Action<SettingsState> {
  type: SettingsActionType;
  payload?: { change?: { [key: string]: any } };
}

export const changeSettingValue = (
  previousState: SettingsState,
  action: SettingsAction
): SettingsState =>
({
  ...previousState,
  ...action.payload.change
});

const createSettingsReducer = (initialSettings: SettingsState): Reducer<SettingsState> => {

  const settingsReducer: Reducer<SettingsState> = (
    prevState: SettingsState = initialSettings,
    action: SettingsAction,
  ): SettingsState => {

    switch (action.type) {
      case SettingsActionType.VALUE_CHANGE:
        return changeSettingValue(prevState, action);
      default:
        return { ...prevState };
    }
  };
  return settingsReducer;
}

export default createSettingsReducer;