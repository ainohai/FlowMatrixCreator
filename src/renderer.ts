import { GridType } from './entities/Grid';
import { AgentType } from './entities/Agent';
import {
  drawAgent,
  drawHelperMatrix,
  drawHelpGrid,
  drawMagnetPoints,
} from './utils/drawingUtils';
import * as p5 from 'p5';
import { CanvasSettings } from './stateHandler';
import { config } from './config';
import { MagnetPoint } from './entities/MagnetPoint';

const { BACKGROUND_COLOR, FADING } = config;

export function renderer(p5: p5) {
  let drawingGenerator: Generator<void, void, unknown>;

  function canvas({ width, height, color = BACKGROUND_COLOR }: CanvasSettings) {
    p5.createCanvas(width, height);
    p5.background(color.r, color.g, color.b);
  }

  /**
   * @return true, if the grid is fully drawn.
   */
  function grid(grid: GridType) {
    if (!drawingGenerator) {
      drawingGenerator = drawHelperMatrix(grid, p5);
    }
    const val = drawingGenerator.next();
    return val.done;
  }
  function agents(agents: AgentType[], canvas: CanvasSettings) {
    //Fades also grid
    p5.background(canvas.color.r, canvas.color.g, canvas.color.b, FADING);

    for (let movingAgent of agents) {
      drawAgent(movingAgent, p5, canvas);
    }
  }

  function helperLines(canvas: CanvasSettings) {
    drawHelpGrid(p5, canvas);
  }

  function magnetPoints(magnetPoints: MagnetPoint[]) {
    drawMagnetPoints(p5, magnetPoints);
  }

  return { canvas, grid, helperLines, agents, magnetPoints };
}
