import { SettingsState } from "../../settingTypes";
import { SettingsAction, SettingsActionType } from "../actionCreators/settingActions";
import { Reducer } from "../store";
import produce from "immer";


export const changeSettingValue = (
  previousState: SettingsState,
  action: SettingsAction
): SettingsState =>
(produce(previousState, state => {
  const {change} = action.payload;
  Object.assign(state, change )
}));

const createSettingsReducer = (initialSettings: SettingsState): Reducer<SettingsState> => {

  const settingsReducer: Reducer<SettingsState> = (
    prevState: SettingsState = initialSettings,
    action: SettingsAction,
  ): SettingsState => {

    switch (action.type) {
      case SettingsActionType.VALUE_CHANGE:
        return changeSettingValue(prevState, action);
      case SettingsActionType.RELOAD_SETTINGS:
          return produce(prevState, () => {return action.payload.settings})
      default:
        return { ...prevState };
    }
  };
  return settingsReducer;
}

export default createSettingsReducer;