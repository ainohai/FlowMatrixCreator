import { AgentDrawingMode, AgentDrawingModeType, Comparator, NumberConfig, Recipe, SettingsState, StateOfArt } from './settingTypes';
import { valueChangeAction } from './stateHandling/actionCreators/settingActions';
import { getScheme } from './utils/colorUtil';

export const recipes : Recipe[] = [];
/*  {triggers: [{drawingKey: "nextAgentBurst", comparator: Comparator.CHANGED, value: 9}],
   action: valueChangeAction("COLOR_PALETTE", getScheme())},
   {triggers: [{drawingKey: "nextAgentBurst", comparator: Comparator.CHANGED, value: 10}],
   action: valueChangeAction("MAXIMUM_VELOCITY",50)},
   {triggers: [{drawingKey: "nextAgentBurst", comparator: Comparator.CHANGED, value: 10}],
   action: valueChangeAction("DEFAULT_LIFESPAN",50)},
   {triggers: [{drawingKey: "nextAgentBurst", comparator: Comparator.CHANGED, value: 11}],
   action: valueChangeAction("NUM_OF_MAGNETS",12)},
   {triggers: [{drawingKey: "nextAgentBurst", comparator: Comparator.CHANGED, value: 41}],
   action: valueChangeAction("COLOR_PALETTE", getScheme())},
   {triggers: [{drawingKey: "nextAgentBurst", comparator: Comparator.CHANGED, value: 51}],
   action: valueChangeAction("NUM_OF_MAGNETS",2)}
];*/

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
  MAGNET_FORCE_MULTIPLIER: 10.0,

  MAX_STROKE: 15,
  DEFAULT_LIFESPAN: 2,
  MAXIMUM_VELOCITY: 5.0,
  MAXIMUM_ACC: 1.0,
  ADD_TO_OLD_VELOCITY: true,
  VELOCITY_MULTIPLIER: 0.5,

  COLOR_PALETTE: getScheme(),
  BACKGROUND_COLOR: { r: 35, g: 38, b: 38, opacity: 255 },
  FADING: 0.8,

  AGENT_DRAWING_MODES: 
     {[AgentDrawingModeType.CIRCLE]: {percentage: 1}} as AgentDrawingMode,

  UI_CONFIGS: [
    ["DEFAULT_LIFESPAN", 1, 150, 1],
    ["MAXIMUM_VELOCITY", 0.001, 300, undefined],
    ["MAXIMUM_ACC", 0.001, 10, undefined],
    ["MAX_STROKE", 1, 50, undefined],
    ["BURST_SIZE", 1, 1000, undefined],
    ["TOTAL_BURSTS", 1, 2000,1],
    ["MIN_AGENTS", 1, 300, 1],
    ["FADING", 0.001, 100, undefined],
    ["NUM_OF_MAGNETS", 1, 20, 1]] as NumberConfig[],
} as const;
