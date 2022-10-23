import { take } from "rxjs";
import { SettingsState } from "../../settingTypes";
import drawingStateReducer from "../reducers/drawingStateReducer";
import settingsReducer from "../reducers/settingsReducer";
import createStore from "../store";


const settingsStore = createStore(settingsReducer); 
 
export default settingsStore;
export const settings = settingsStore.last as () => SettingsState

