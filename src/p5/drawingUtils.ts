import * as p5 from 'p5';
import { getLocationOfCell } from '../utils/gridUtil';
import { config } from '../config';
import { MagnetPoint } from '../entities/MagnetPoint';
import { settings } from '../userInput/configInput';
import { AgentType, GridType, Rgb } from '../entities/entityTypes';
import { CanvasSettings } from '../stateHandling/reducers/drawingStateReducer';

const { HELPER_GRID_SIZE, MAGNET_STRENGTH_MAX } = config;

export const rgbToP5Color = (p5: p5, color: Rgb, opacity?: number) => {
  return opacity
    ? p5.color(color.r, color.g, color.b, opacity)
    : p5.color(color.r, color.g, color.b, color.opacity ?? 255);
};

/**
 * Draws horizontal and vertical lines.
 */
export const drawHelpGrid = (p5: p5, canvas: CanvasSettings) => {
  for (let i = 0; i < canvas.width; i += HELPER_GRID_SIZE) {
    p5.line(i, 0, i, canvas.height);
  }
  for (let i = 0; i < canvas.height; i += HELPER_GRID_SIZE) {
    p5.line(0, i, canvas.width, i);
  }
};

export const drawAgent = (agent: AgentType, p5: p5, canvas: CanvasSettings) => {
  const color =
    typeof agent.color === 'function'
      ? agent.color(agent, canvas)
      : agent.color;

  const p5Color = rgbToP5Color(p5, color, undefined);    
  p5.stroke(p5Color);
  p5.fill(p5Color);
  p5.strokeWeight(agent.strokeWidth);
  //draws occasional circles
  if (p5.random(1) > 0.99) {
    p5.circle(agent.position.x, agent.position.y, p5.random(1, 10));
  } else {
    p5.strokeCap(p5.SQUARE);
    p5.line(
      agent.previousPos.x,
      agent.previousPos.y,
      agent.position.x,
      agent.position.y
    );
  }
};

export const drawGridCellContents = (
  grid: GridType,
  row: number,
  column: number,
  p5: p5
) => {
  if (column >= grid.gridValues.length) {
    throw 'DrawGridCellContents: Illegal row';
  } else if (row >= grid.gridValues[column].length) {
    throw 'DrawGridCellContents: Illegal column';
  }

  const { x: locationX, y: locationY } = getLocationOfCell(row, column, grid);

  const velocity = grid.gridValues[column][row].velocity;
  p5.line(locationX, locationY, locationX + velocity.x, locationY + velocity.y);

};

/**
 * Draws strength and direction of matrix.
 */
export function* drawHelperMatrix(grid: GridType, p5: p5) {
  const gridValues = grid.gridValues;

  for (let column = 0; column < gridValues.length; column++) {
    for (let row = 0; row < gridValues[column].length; row++) {
      drawGridCellContents(grid, row, column, p5);
    }
    yield;
  }
}

/**
 * Draws circles at magnet points, size depends on the strength
 * @param p5
 * @param magnets
 */
export function drawMagnetPoints(p5: p5, magnets: MagnetPoint[]) {
  for (let magnet of magnets) {
    p5.fill(
      magnet.strength < 0
        ? rgbToP5Color(p5, settings.COLOR_PALETTE[0])
        : rgbToP5Color(p5, settings.COLOR_PALETTE[settings.COLOR_PALETTE.length - 1])
    );
    p5.text(
      `x: ${magnet.locationX}, y: ${magnet.locationY}, mag: ${magnet.strength}`,
      magnet.locationX + MAGNET_STRENGTH_MAX,
      magnet.locationY
    );
    p5.circle(magnet.locationX, magnet.locationY, Math.abs(magnet.strength));
  }
  //draw palette
  for (let i = 0; i < settings.COLOR_PALETTE.length; i++) {
    p5.fill(rgbToP5Color(p5, settings.COLOR_PALETTE[i]));
    p5.circle(10 + i * 10, 10, 10);
  }
}

/* Drawing vertex
  // starting point
  let x = agent.position.x;
  let y = agent.position.y;
  let step = stepLength ?? grid.gridSize * 1;

  p5.push();
  p5.noFill();
  p5.strokeWeight(agent.strokeWidth);
  p5.beginShape();

  for (let n = 0; n < steps; n++) {
    p5.vertex(x, y);
    move(agent);
   }

  p5.endShape();
  p5.pop();
  return;
};
*/
