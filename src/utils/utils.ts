import { config } from '../config';
import * as p5 from 'p5';
import { CanvasSettings } from '../stateHandler';
import { AgentType } from '../entities/Agent';
import { mapToBoundaries } from './mathUtils';

const { COLOR_PALETTE, MAXIMUM_ACC } = config;

export type Rgb = {
  r: number;
  g: number;
  b: number;
  opacity: number;
};

export const rgbToP5Color = (p5: p5, color: Rgb, opacity?: number) => {
  return opacity
    ? p5.color(color.r, color.g, color.b, opacity)
    : p5.color(color.r, color.g, color.b, color.opacity ?? 100);
};

///Test function for selecting color
/*const getRandomColor = (p5: p5, agent: AgentType) => {
  const index = Math.floor(p5.random(COLOR_PALETTE.length));
  const color = COLOR_PALETTE[index];
  agent.color = p5.color(color.r, color.g, color.b);
  return p5.color(color.r, color.g, color.b);
};

///Test function for selecting color
export const colorByXPos = (
  p5: p5,
  agent: AgentType,
  canvas: CanvasSettings
) => {
  let index = 0;

  if (
    agent.position.x > canvas.width * 0.3 &&
    agent.position.x < canvas.width * 0.6
  ) {
    index = 1;
  }
  if (agent.position.x > canvas.width * 0.6) {
    index = 2;
  }

  let color =
    COLOR_PALETTE.length > index
      ? rgbToP5Color(p5, COLOR_PALETTE[index])
      : getRandomColor(p5, agent);

  agent.color = color;

  return color;
};*/

///Test function for selecting color
/*export const colorNoise = (
  p5: p5,
  agent: AgentType,
  canvas: CanvasSettings
) => {
  const noise = p5.noise(0.0005 * agent.position.x, 0.0005 * agent.position.y);
  const color = rgbToP5Color(
    p5,
    COLOR_PALETTE[Math.floor(noise * COLOR_PALETTE.length)]
  );
  agent.color = color;
  return color;
};
*/
///Test function for selecting color
export const colorByVelocity = (
  agent: AgentType,
  canvas: CanvasSettings
): Rgb => {
  const acc = agent.acceleration.strength;

  const index =
    Math.floor(mapToBoundaries(acc, 0, MAXIMUM_ACC, 0, COLOR_PALETTE.length - 1)) %
    COLOR_PALETTE.length;

  const opacity = 95;
  const color = COLOR_PALETTE[index]
  color.opacity = opacity;

  if (acc !== 0) {
    agent.color = color;
  }
  return color;
};
