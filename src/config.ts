import { SettingsState, StateOfArt } from './settingTypes';
import { getScheme } from './utils/colorUtil';

//default configurations
export const config: SettingsState = {

  //In execution order.
  //In future it would be nice to let user decide from UI if they want to draw helpers or not.
  USED_STATES: [
    StateOfArt.SETUP,
    //StateOfArt.DRAW_GRID,
    //StateOfArt.DRAW_HELPER_GRID,
    //StateOfArt.DRAW_MAGNETS,
    //StateOfArt.CONFIRM_DRAW,
    //StateOfArt.CLEAR_SCREEN,
    StateOfArt.DRAW_AGENTS,
    StateOfArt.END,
    StateOfArt.RESET,
    StateOfArt.CONFIRM_DRAW,
    StateOfArt.CLEAR_SCREEN,
  ] as StateOfArt[],

  CANVAS_WIDTH: window.innerWidth,
  CANVAS_HEIGHT: window.innerHeight,

  SHOW_CONTROLS: true,
  SHOW_BUTTONS: true,

  TOTAL_BURSTS: 100,
  BURST_SIZE: 200,
  OFFSET: 5,
  MIN_AGENTS: 200,
  RANDOM_START: true,

  GRID_SIZE: 10, //px
  HELPER_GRID_SIZE: 100, //px

  NUM_OF_MAGNETS: 4,
  MAGNET_STRENGTH_MAX: 30,
  //Multiplier constant. Similar to G in gravity calculations.
  FORCE_MULTIPLIER: 10,

  MAX_STROKE: 5,
  DEFAULT_LIFESPAN: 5,
  MAXIMUM_VELOCITY: 5,
  MAXIMUM_ACC: 1,
  ADD_TO_OLD_VELOCITY: true,
  FRICTION_MULTIPLIER: 0.5,

  COLOR_PALETTE: getScheme(),
  BACKGROUND_COLOR: { r: 35, g: 38, b: 38, opacity: 255 },
  FADING: 0.8,
} as const;
