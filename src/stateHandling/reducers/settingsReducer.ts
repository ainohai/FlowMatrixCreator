import { config } from "../../config";
import { SettingsState } from "../../settingTypes";
import { Action, Reducer, State } from "../store";


/*export enum UserActionType {
    DRAW_AGENTS,
    CANCEL,
    VALUE_CHANGE
}

export interface UserAction extends Action {
    type: UserActionType;
    payload?: any;
 }*/

export enum SettingsActionType {
    INIT, 
    VALUE_CHANGE
}

export interface SettingsAction extends Action<SettingsState> {
    type: SettingsActionType;
    payload?: {change?: {[key: string]:any}};
 }
  

//All the settings need to be in config file, so that in future we can have multiple config files.!
const initialState: SettingsState = {...config};

export const changeSettingValue = (
    previousState: SettingsState,
    action: SettingsAction
  ): SettingsState => 
    ({
    ...previousState,
    ...action.payload.change
  });


const settingsReducer: Reducer<SettingsState> = (
  prevState: SettingsState = initialState,
   action: SettingsAction,
): SettingsState => {

  switch (action.type) {
    case SettingsActionType.VALUE_CHANGE:
      return changeSettingValue(prevState, action);
    default: 
      return prevState;
  }
};


export default settingsReducer;