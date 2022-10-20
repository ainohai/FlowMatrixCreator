import { Observable } from "rxjs";
import { config } from "../../config";
import { Action, State } from "../store";


export enum UserActionType {
    DRAW_AGENTS,
    CANCEL,
    VALUE_CHANGE
}

export interface UserAction extends Action {
    type: UserActionType;
    payload?: any;
 }

export enum SettingsActionType {
    INIT, 
    VALUE_CHANGE
}

export interface SettingsAction extends Action {
    type: SettingsActionType;
    payload?: any;
 }
  

 //todo
export interface SettingsState extends State { 
};

const initialState: SettingsState = {...config};

export const dummyReducer = (
    previousState: SettingsState,
    action: SettingsAction
  ): SettingsState => ({
    ...previousState,
    dummy: {...{changes: "my changes made"}}
  });

/**
 * Takes in action, returns the new state. 
 * @param state: current application state
 * @param action: action fired in the application
 * @returns state: the new application state
 */
const settingsReducer = (
  prevState: SettingsState = initialState,
   action: SettingsAction,
): SettingsState => {

  switch (action.type) {
    case SettingsActionType.VALUE_CHANGE:
      return dummyReducer(prevState, action);
    default: 
      return prevState;
  }
};


export default settingsReducer;