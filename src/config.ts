import { getScheme } from './utils/colorUtil';

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

//default configurations
export const config = {

  //In execution order.
  //In future it would be nice to let user decide from UI if they want to draw helpers or not.
  USED_STATES: [
    StateOfArt.SETUP,
    //StateOfArt.DRAW_GRID,
    //StateOfArt.DRAW_HELPER_GRID,
    StateOfArt.DRAW_MAGNETS,
    StateOfArt.CONFIRM_DRAW,
    StateOfArt.CLEAR_SCREEN,
    StateOfArt.DRAW_AGENTS,
    StateOfArt.END,
    StateOfArt.RESET,
  ] as StateOfArt[],

  TOTAL_BURSTS: 200,
  BURST_SIZE: 500,
  OFFSET: 50,
  MIN_AGENTS: 200,
  RANDOM_START: true,

  GRID_SIZE: 10, //px
  HELPER_GRID_SIZE: 100, //px

  NUM_OF_MAGNETS: 4,
  MAGNET_STRENGTH_MAX: 30,
  //Multiplier constant. Similar to G in gravity calculations.
  FORCE_MULTIPLIER: 10,

  MAX_STROKE: 5,
  DEFAULT_LIFESPAN: 3,
  MAXIMUM_VELOCITY: 5,
  MAXIMUM_ACC: 1,
  ADD_TO_OLD_VELOCITY: true,
  FRICTION_MULTIPLIER: 0.5,

  COLOR_PALETTE: getScheme(),
  BACKGROUND_COLOR: { r: 35, g: 38, b: 38, opacity: 255 },
  FADING: 0.8,
} as const;
