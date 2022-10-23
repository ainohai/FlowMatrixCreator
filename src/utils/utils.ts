import { config } from '../config';
import { mapToBoundaries } from './mathUtils';
import { AgentType, Rgb } from '../entities/entityTypes';
import { CanvasSettings } from '../settingTypes';
import { settings } from '../stateHandling/storeCreators/settingsStore';


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
    Math.floor(mapToBoundaries(acc, 0, settings().MAXIMUM_ACC, 0, settings().COLOR_PALETTE.length - 1)) %
    settings().COLOR_PALETTE.length;

  const opacity = 95;
  const color = settings().COLOR_PALETTE[index]
  color.opacity = opacity;

  if (acc !== 0) {
    agent.color = color;
  }
  return color;
};
