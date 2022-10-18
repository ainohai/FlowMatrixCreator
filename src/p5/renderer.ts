import {
  drawAgent,
  drawHelperMatrix,
  drawHelpGrid,
  drawMagnetPoints,
} from './drawingUtils';
import * as p5 from 'p5';
import { config } from '../config';
import { MagnetPoint } from '../entities/MagnetPoint';
import { AgentType, CanvasSettings, GridType, Rgb } from '../types';

const { BACKGROUND_COLOR, FADING } = config;

export const renderer = function(p5: p5) {
  let drawingGenerator: Generator<void, void, unknown>;

  const clearScreen = function(color: Rgb) {
    p5.background(color.r, color.g, color.b);
    p5.stroke(0,0,0)
    p5.strokeWeight(0.5);
  }

  const canvas = function ({ width, height, color = BACKGROUND_COLOR }: CanvasSettings) {
    p5.createCanvas(width, height);
    clearScreen(color);
  }

  const reset = function (bgColor: Rgb) {
    clearScreen(bgColor);
  }


  /**
   * @return true, if the grid is fully drawn.
   */
  const grid = function(grid: GridType) {
    if (!drawingGenerator) {
      drawingGenerator = drawHelperMatrix(grid, p5);
    }
    const val = drawingGenerator.next();
    return val.done;
  }

  const agents = function(agents: AgentType[], canvas: CanvasSettings) {
    //Fades also grid
    p5.background(canvas.color.r, canvas.color.g, canvas.color.b, FADING);

    for (let movingAgent of agents) {
      drawAgent(movingAgent, p5, canvas);
    }
  }

  const helperLines = function (canvas: CanvasSettings) {
    drawHelpGrid(p5, canvas);
  }

  const magnetPoints = function(magnetPoints: MagnetPoint[]) {
    drawMagnetPoints(p5, magnetPoints);
  }

  return { canvas, grid, helperLines, agents, magnetPoints, reset, clearScreen };
}
