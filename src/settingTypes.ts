import { Rgb } from "./entities/entityTypes";
import { State } from "./stateHandling/store";

export enum StateOfArt {
    SETUP = "SETUP",
    DRAW_GRID = "DRAW_GRID",
    DRAW_AGENTS = "DRAW_AGENTS",
    DRAW_HELPER_GRID= "DRAW_HELPER_GRID" ,
    DRAW_MAGNETS = "DRAW_MAGNETS",
    CONFIRM_DRAW = "CONFIRM_DRAW",
    CLEAR_SCREEN ="CLEAR_SCREEN",
    PAUSE = "PAUSE",
    RESET ="RESET",
    END ="END",
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
    FORCE_MULTIPLIER: number,
  
    MAX_STROKE: number,
    DEFAULT_LIFESPAN: number,
    MAXIMUM_VELOCITY: number,
    MAXIMUM_ACC: number,
    ADD_TO_OLD_VELOCITY: boolean,
    FRICTION_MULTIPLIER: number,
  
    COLOR_PALETTE: Rgb[],
    BACKGROUND_COLOR: Rgb,
    FADING: number,

    SHOW_CONTROLS: boolean,
    SHOW_BUTTONS: boolean
  }

export type CanvasSettings = {
    height?: number;
    width?: number;
    color?: Rgb;
};