import {
  angleOfLineBetweenPoints,
  distanceBetweenPoints,
} from './mathUtils';
import { MagnetPoint } from '../entities/MagnetPoint';
import { ArtVector, createVectorByAngle } from '../entities/ArtVector';
import { GridType } from '../entities/entityTypes';
import { settings } from '../stateHandling/storeCreators/settingsStore';

export type Location = {
  x: number;
  y: number;
};

export const getNumOfColumns = (grid: GridType) => {
  return grid.gridValues ? grid.gridValues.length : 0;
};

//Expecting grid having the same number of rows in each column.
export const getNumOfRows = (grid: GridType) => {
  return grid.gridValues && grid.gridValues[0] ? grid.gridValues[0].length : 0;
};

export const getCurrentGridPosition = (
  positionX: number,
  positionY: number,
  gridSize: number
) => {
  return {
    row: Math.floor(positionY / gridSize),
    column: Math.floor(positionX / gridSize),
  };
};

/**
 * @return the top left corner of cell.
 */
export const getLocationOfCell = (
  row: number,
  column: number,
  grid: GridType
) => {
  return { x: column * grid.gridSize, y: row * grid.gridSize };
};

export const calculateForces = (
  row: number,
  column: number,
  grid: GridType,
  magnetPoints: MagnetPoint[]
) => {
  if (!magnetPoints || magnetPoints.length === 0) {
    throw 'Please, do not try to calc forces if there are no sinks or creators';
  }

  let effectOfMagnetPoint: ArtVector;

  const { x: locationX, y: locationY } = getLocationOfCell(row, column, grid);

  //Using modified gravity calculations as the base of how magnet points affect to the certain cells on the grid.
  //Equation for gravity: F = (Gravity constant * (m1)*(m2)) / distance^2, using 1 as mass of cell
  for (let magnet of magnetPoints) {
    if (
      (!locationX && locationX !== 0) ||
      (!locationY && locationY !== 0) ||
      !magnet.locationX ||
      !magnet.locationY
    ) {
      throw "Please, do not do calculations if you don't have the numbers.";
    }
    const distance = distanceBetweenPoints(
      locationX,
      locationY,
      magnet.locationX,
      magnet.locationY
    );
    const angle = angleOfLineBetweenPoints(
      locationX,
      locationY,
      magnet.locationX,
      magnet.locationY
    );

    const strength = (settings().FORCE_MULTIPLIER * magnet.strength) / distance;

    const strengthVector: ArtVector = createVectorByAngle(angle, strength);
    effectOfMagnetPoint = !!effectOfMagnetPoint
      ? effectOfMagnetPoint.copy().addMe(strengthVector)
      : strengthVector;
  }
  return {
    direction: effectOfMagnetPoint.direction,
    velocity: effectOfMagnetPoint.strength,
  };
};

//For testing
export const dummyAngleCB = (row: number, column: number, grid: GridType) => {
  return { direction: Math.sin(column), velocity: grid.gridSize / 1.5 };
};

/**
 * @point
 * @targets
 * @returns true if point is on the same grid point as one of the targets
 */
export const isOnSameGridPoint = (
  point: Location,
  targets: Location[],
  gridSize
) => {
  const agentGridPoint = getCurrentGridPosition(point.x, point.y, gridSize);
  for (let target of targets) {
    const targetGridPoint = getCurrentGridPosition(
      target.x,
      target.y,
      gridSize
    );
    if (
      agentGridPoint.row === targetGridPoint.row &&
      agentGridPoint.column === targetGridPoint.column
    ) {
      return true;
    }
  }
  return false;
};
