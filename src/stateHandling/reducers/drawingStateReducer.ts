import { MagnetPoint } from "../../entities/MagnetPoint";
import { changeStateIndex, initialState, resetMagnets, setupNextRender } from "./drawingStateUtil";
import { config } from "../../config";
import { AgentType, GridType, Rgb } from "../../entities/entityTypes";
import { CanvasSettings, SettingsState, StateOfArt } from "../../settingTypes";
import { State, Reducer, Action } from "../store";
import { subscribeToSettings } from "../subscriptions";


export interface DrawingState extends State {
  grid: GridType;
  agents: AgentType[];
  canvas: CanvasSettings;
  stateIndex: number;
  magnets: MagnetPoint[];
  nextAgentBurst: number;
};

//TODO: Fix action types
export type Payload = {phaseDone? : boolean, jumpToStage?: StateOfArt};

export interface DrawingReducer extends Reducer<DrawingState> {(
  previousState: DrawingState,
  action: DrawingAction,
  settings: SettingsState
  ) : DrawingState;
}

export enum DrawingActionType {
    INIT,
    READY_RENDER,
    SETUP_DRAW,
    JUMP_TO_INDEX,
    RESET_MAGNETS
}

export interface DrawingAction extends Action<DrawingState> {
    type: DrawingActionType;
    payload?: Payload;
 }

const init = (initialSettings: SettingsState) => {
  return initialState({
    //todo: solve why p5 gives faulty values for width & height
    width: initialSettings.CANVAS_WIDTH,
    height: initialSettings.CANVAS_HEIGHT,
    color: initialSettings.BACKGROUND_COLOR,
  }, initialSettings); 
}

 let settingsState;

 const createDrawingStateReducer = (initialSettings: SettingsState): Reducer<DrawingState> => { 

  let initState: DrawingState = init(initialSettings);
  subscribeToSettings((state) => settingsState = state);

  const drawingStateReducer: Reducer<DrawingState> = (
    prevState: DrawingState | undefined,
    action: DrawingAction
  ): DrawingState => {
  

    if (!prevState) {
      console.log("INITIALIZING !!!!")
      prevState = initState;
    }

    switch (action.type) {
      case DrawingActionType.SETUP_DRAW:
        return setupNextRender(prevState, action, settingsState);
      case DrawingActionType.JUMP_TO_INDEX:
        return changeStateIndex(prevState, action, settingsState);
      case DrawingActionType.RESET_MAGNETS:
        return resetMagnets(prevState, settingsState);
      default:   
        return {...prevState};
    }
  };
  return drawingStateReducer;
}
  export default createDrawingStateReducer;

