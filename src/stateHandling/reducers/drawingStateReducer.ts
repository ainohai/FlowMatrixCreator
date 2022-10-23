import { MagnetPoint } from "../../entities/MagnetPoint";
import { changeStateIndex, initialState, resetMagnets, setupNextRender } from "./drawingStateUtil";
import { config } from "../../config";
import { AgentType, GridType, Rgb } from "../../entities/entityTypes";
import { CanvasSettings, StateOfArt } from "../../settingTypes";
import { State, Reducer, Action } from "../store";

//TODO:Get these by observable
const { CANVAS_WIDTH: windowWidth, CANVAS_HEIGHT: windowHeight, BACKGROUND_COLOR : backgroundColor } = config;

export interface DrawingState extends State {
  grid: GridType;
  agents: AgentType[];
  canvas: CanvasSettings;
  stateIndex: number;
  magnets: MagnetPoint[];
  nextAgentBurst: number;
};

//TODO: could be prettier  
export type Payload = {phaseDone? : boolean, jumpToStage?: StateOfArt};

export enum DrawingActionType {
    SETUP_DRAW,
    JUMP_TO_INDEX,
    RESET_MAGNETS
}

export interface DrawingAction  extends Action<DrawingState> {
    type: DrawingActionType;
    payload?: Payload;
 }



const initState: () => DrawingState = () => initialState({
    //todo: solve why p5 gives faulty values for width & height
    width: windowWidth,
    height: windowHeight,
    color: backgroundColor,
  }); 

  const drawingStateReducer: Reducer<DrawingState> = (
    prevState: DrawingState = initState(),
    action: DrawingAction
  ): DrawingState => {
  
    switch (action.type) {
      case DrawingActionType.SETUP_DRAW:
        return setupNextRender(prevState, action);
      case DrawingActionType.JUMP_TO_INDEX:
        return changeStateIndex(prevState, action);
      case DrawingActionType.RESET_MAGNETS:
        return resetMagnets(prevState);
      default:   
        return prevState;
    }
  };
  
  export default drawingStateReducer;

