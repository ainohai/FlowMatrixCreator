import { Rgb } from "./entities/entityTypes";
import { SettingsAction } from "./stateHandling/actionCreators/settingActions";
import { DrawingState } from "./stateHandling/reducers/drawingStateReducer";
import { Dispatch, State } from "./stateHandling/store";

export enum StateOfArt {
  SETUP = "SETUP",
  DRAW_GRID = "DRAW_GRID",
  DRAW_AGENTS = "DRAW_AGENTS",
  DRAW_HELPER_GRID = "DRAW_HELPER_GRID",
  DRAW_MAGNETS = "DRAW_MAGNETS",
  CONFIRM_DRAW = "CONFIRM_DRAW",
  CLEAR_SCREEN = "CLEAR_SCREEN",
  PAUSE = "PAUSE",
  RESET = "RESET",
  END = "END",
}

export enum AgentDrawingModeType {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE"
}

export type NumberConfig = [string, number, number, number | undefined];
export type AgentDrawingMode = {
  [mode in AgentDrawingModeType]: { percentage: number; };
};

export enum Comparator {
  EQUALS = "EQUALS",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN = "GREATER_THAN",
  CHANGED = "CHANGED" // === equals
}

export type Trigger = {
  drawingKey: keyof DrawingState,
  comparator: Comparator,
  value: any
}

export type Recipe = {
  triggers: Trigger[], //All triggers need to match to dispatch
  action: SettingsAction 
} 

export interface SettingsState extends State {
  USED_STATES: StateOfArt[],

  CANVAS_WIDTH: number,
  CANVAS_HEIGHT: number,

  TOTAL_BURSTS: number,
  BURST_SIZE: number,
  OFFSET: number,
  MIN_AGENTS: number,
  RANDOM_START: boolean,

  GRID_SIZE: number, //px
  HELPER_GRID_SIZE: number, //px

  NUM_OF_MAGNETS: number,
  MAGNET_STRENGTH_MAX: number,
  //Multiplier constant. Similar to G in gravity calculations.
  MAGNET_FORCE_MULTIPLIER: number,

  MAX_STROKE: number,
  DEFAULT_LIFESPAN: number,
  MAXIMUM_VELOCITY: number,
  MAXIMUM_ACC: number,
  ADD_TO_OLD_VELOCITY: boolean,
  VELOCITY_MULTIPLIER: number,

  COLOR_PALETTE: Rgb[],
  BACKGROUND_COLOR: Rgb,
  FADING: number,

  SHOW_CONTROLS: boolean,
  SHOW_BUTTONS: boolean,

  UI_CONFIGS: NumberConfig[]

  AGENT_DRAWING_MODES: AgentDrawingMode
}

export type CanvasSettings = {
  height?: number;
  width?: number;
  color?: Rgb;
};