import { Rgb } from './utils/utils';
import * as ColorScheme from 'color-scheme';
import hexRgb, { RgbaObject } from 'hex-rgb';

export enum StateOfArt {
  SETUP,
  DRAW_GRID,
  DRAW_AGENTS,
  DRAW_HELPER_GRID,
  DRAW_MAGNETS,
  END,
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const paletteSchemes = ['mono', 'contrast', 'triade', 'tetrade', 'analogic'];
const variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale'];

const getScheme = (): Rgb[] => {
  const paletteScheme = paletteSchemes[getRandomInt(paletteSchemes.length)];
  const variation = variations[getRandomInt(variations.length - 1)];

  const scheme = new ColorScheme();
  scheme.from_hue(getRandomInt(359)).scheme(paletteScheme);
  scheme.variation(variation);

  const colors = scheme.colors();

  console.log(paletteScheme);
  console.log(variation);
  console.log(colors);

  const rgbs = colors.map((color) => hexRgb(color));

  return rgbs.map((rgba: RgbaObject) => ({
    r: rgba.red,
    b: rgba.blue,
    g: rgba.green,
  }));
};

//default configurations
export const config = {
  //In execution order.
  //In future it would be nice to let user decide from UI if they want to draw helpers or not.
  USED_STATES: [
    StateOfArt.SETUP,
    StateOfArt.DRAW_GRID,
    //StateOfArt.DRAW_HELPER_GRID,
    //StateOfArt.DRAW_MAGNETS,
    StateOfArt.DRAW_AGENTS,
    StateOfArt.END,
  ] as StateOfArt[],

  TOTAL_BURSTS: 10,
  BURST_SIZE: 500,
  OFFSET: 50,
  MIN_AGENTS: 200,
  RANDOM_START: true,

  GRID_SIZE: 10, //px
  HELPER_GRID_SIZE: 100, //px

  NUM_OF_MAGNETS: 4,
  MAGNET_STRENGTH_MAX: 30,
  FORCE_MULTIPLIER: 10, //Multiplier constant. Similar to G in gravity calculations.

  MAX_STROKE: 5,
  DEFAULT_LIFESPAN: 25,
  MAXIMUM_VELOCITY: 5,
  MAXIMUM_ACC: 1,
  ADD_TO_OLD_VELOCITY: true,
  FRICTION_MULTIPLIER: 0.5,

  COLOR_PALETTE: getScheme(),
  BACKGROUND_COLOR: { r: 35, g: 38, b: 38 },
  FADING: 0.8,
} as const;
