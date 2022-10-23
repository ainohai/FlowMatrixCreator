import { config } from "../../config";
import { SettingsState } from "../../settingTypes";
import { Action, Reducer, State } from "../store";


export enum UserActionType {
    SAVE,
    SUCCESS
}

export interface UserAction extends Action<UserActionType> {
    type: UserActionType;
    payload?: any;
 }

 export interface UserActionState extends State { }

//All the settings need to be in config file, so that in future we can have multiple config files.!
const initialState: SettingsState = {...config};

const userReducer: Reducer<UserActionState> = (
  prevState: UserActionState = initialState,
   action: UserAction,
): UserActionState => {

  switch (action.type) {
    default: 
      return prevState;
  }
};


export default userReducer;