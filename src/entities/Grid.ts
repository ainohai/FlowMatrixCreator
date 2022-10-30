import { createVector } from './ArtVector';
import { GridType, GridValue } from './entityTypes';
import { MagnetPoint } from './MagnetPoint';


const EXTRA_LEFT = 0;
const EXTRA_RIGHT = 0;
const EXTRA_TOP = 0;
const EXTRA_BOTTOM = 0;

const numberOfCols = (width: number, gridSize: number) =>
  Math.ceil((width * EXTRA_RIGHT + width + width * EXTRA_LEFT) / gridSize);
const numberOfRows = (height: number, gridSize: number) =>
  Math.ceil((height * EXTRA_TOP + height + height * EXTRA_BOTTOM) / gridSize);

export const gridFactory = (
  width: number,
  height: number,
  gridSize: number
): GridType => {
  //Creating empty grid. Note that for... in loops only set indexes, for... of loops all.
  const gridValues = [];
  gridSize = gridSize;
  const numOfCols = numberOfCols(width, gridSize);
  const numOfRows = numberOfRows(height, gridSize);

  for (let column = 0; column < numOfCols; column++) {
    gridValues.push(Array(numOfRows));
  }

  return {
    gridSize: gridSize,
    gridValues: gridValues,
  };
};

//Modifies existing grid by applying function to all members of grid.
export const fillGridUsingFunction = (
  grid: GridType,
  magnetPoints: MagnetPoint[],
  forceMultiplier: number,
  countAngleCallBack: (
    row: number,
    column: number,
    grid: GridType,
    magnets: MagnetPoint[],
    forceMultiplier: number
  ) => { direction: number; velocity: number }
) => {
  let gridValues = grid.gridValues;

  for (let column = 0; column < gridValues.length; column++) {
    for (let row = 0; row < gridValues[column].length; row++) {
      let { direction, velocity } = countAngleCallBack(
        row,
        column,
        grid,
        magnetPoints,
        forceMultiplier
      );

      const xStep = velocity * Math.cos(direction);
      const yStep = velocity * Math.sin(direction);

      //Should we create vector at this point or would it be more performant to use just angle and strength?
      let gridPoint: GridValue = {
        velocity: createVector(xStep, yStep),
      };

      gridValues[column][row] = gridPoint;
    }
  }
  return grid;
};
