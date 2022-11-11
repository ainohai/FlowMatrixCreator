import { SettingsState, StateOfArt } from "../../settingTypes";
import { DrawingState } from "../reducers/drawingStateReducer";
import { Action } from "../store";

//TODO: Fix action types
export type Payload = {phaseDone? : boolean, jumpToStage?: StateOfArt};

export enum DrawingActionType {
    INIT,
    READY_RENDER,
    SETUP_DRAW,
    JUMP_TO_INDEX,
    RESET_MAGNETS,
    SUCCESS
}

export interface DrawingAction extends Action<DrawingState> {
    type: DrawingActionType;
    payload?: Payload;
 }


/**
 * Action creators
 */
export const initDrawingAction = (): DrawingAction => ({ type: DrawingActionType.INIT });
export const successDrawingAction = (): DrawingAction => ({ type: DrawingActionType.SUCCESS });