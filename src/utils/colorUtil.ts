import { getRandomInt } from "./mathUtils";
import { Rgb } from "./utils";
import * as ColorScheme from 'color-scheme';
import hexRgb, { RgbaObject } from 'hex-rgb';


export const paletteSchemes = ['mono', 'contrast', 'triade', 'tetrade', 'analogic'];
export const variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale'];

export const getScheme = (): Rgb[] => {
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

