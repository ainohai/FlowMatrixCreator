import {
  drawAgent,
  drawHelperMatrix,
  drawHelpGrid,
  drawMagnetPoints,
} from './drawingUtils';
import * as p5 from 'p5';
import { MagnetPoint } from '../entities/MagnetPoint';
import { AgentType, GridType, Rgb } from '../entities/entityTypes';
import { AgentDrawingMode, CanvasSettings, SettingsState } from '../settingTypes';

export const renderer = function(p5: p5, settings: () => SettingsState) {
  let drawingGenerator: Generator<void, void, unknown>;

  const clearScreen = function(color: Rgb) {
    p5.background(color.r, color.g, color.b);
    p5.stroke(0,0,0)
    p5.strokeWeight(0.5);
  }

  const canvas = function ({ width, height, color }: CanvasSettings) {
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

  const agents = function(agents: AgentType[], canvas: CanvasSettings, fading: number, drawingModes:AgentDrawingMode) {
    //Fades also grid
    p5.background(canvas.color.r, canvas.color.g, canvas.color.b, fading);

    for (let movingAgent of agents) {
      drawAgent(movingAgent, p5, canvas, drawingModes);
    }
  }

  const helperLines = function (canvas: CanvasSettings) {
    drawHelpGrid(p5, canvas, settings().HELPER_GRID_SIZE);
  }

  const magnetPoints = function(magnetPoints: MagnetPoint[]) {
    drawMagnetPoints(p5, magnetPoints, settings().COLOR_PALETTE, settings().MAGNET_STRENGTH_MAX);
  }

  return { canvas, grid, helperLines, agents, magnetPoints, reset, clearScreen };
}
