import { filter, map, Observable, tap } from "rxjs";
import { SettingsState } from "../../settingTypes";
import { DrawingActionType } from "../reducers/drawingStateReducer";
import { SettingsAction, SettingsActionType } from "../reducers/settingsReducer";
import { Epic } from "../store";
import drawingStore from "../storeCreators/drawingStore";

export const recalculateMagnets: Epic<SettingsState> =
    (action$: Observable<SettingsAction>,
    state$?: Observable<SettingsState>) : Observable<SettingsAction> => {

  return action$.pipe(
    filter((action: SettingsAction) => action.type === SettingsActionType.VALUE_CHANGE), 
    filter((action: SettingsAction) => !!action.payload.change["NUM_OF_MAGNETS"]),
    tap(() => drawingStore().dispatch({ type: DrawingActionType.RESET_MAGNETS })))
    .pipe(map(() => {return {type: SettingsActionType.SUCCESS}}));
  }
