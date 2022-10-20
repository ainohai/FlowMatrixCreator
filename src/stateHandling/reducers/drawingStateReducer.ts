import { MagnetPoint } from "../../entities/MagnetPoint";
import { changeStateIndex, initialState, setupNextRender } from "./drawingStateUtil";
import { config, StateOfArt } from "../../config";
import { AgentType, GridType, Rgb } from "../../entities/entityTypes";

//Get these by observable
const { CANVAS_WIDTH: windowWidth, CANVAS_HEIGHT: windowHeight, BACKGROUND_COLOR : backgroundColor } = config;

/*const stateSubject = new BehaviorSubject(initState);
const stateObs = () => stateSubject;

updateStateTrigger.subscribe((payload) => 
    { 
      let state = stateSubject.getValue();
      stateSubject.next(updateState(state, payload))
  });
*/

export type DrawingReducer = (
    previousState: DrawingState,
    action: DrawingAction
  ) => DrawingState;

//TODO: could be prettier  
export type Payload = {phaseDone? : boolean, jumpToStage?: StateOfArt};

export enum DrawingActionType {
    SETUP_DRAW,
    JUMP_TO_INDEX
}

export type DrawingAction = {
    type: DrawingActionType;
    payload?: Payload;
 }

export type DrawingState = {
    grid: GridType;
    agents: AgentType[];
    canvas: CanvasSettings;
    stateIndex: number;
    magnets: MagnetPoint[];
    nextAgentBurst: number;
  };
  
export type CanvasSettings = {
    height?: number;
    width?: number;
    color?: Rgb;
};

const initState: DrawingState = initialState({
    //todo: solve why p5 gives faulty values for width & height
    width: windowWidth,
    height: windowHeight,
    color: backgroundColor,
  }); 

  const drawingStateReducer = (
    prevState: DrawingState = initState,
    action: DrawingAction
  ): DrawingState => {
  
    switch (action.type) {
      case DrawingActionType.SETUP_DRAW:
        return setupNextRender(prevState, action);
      case DrawingActionType.JUMP_TO_INDEX:
        return changeStateIndex(prevState, action);    
      default:   
        return prevState;
    }
  };
  
  export default drawingStateReducer;
