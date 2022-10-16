import { config } from '../config';
import { getRandomInt, getRandomPosOrNegInt } from '../utils/mathUtils';

const { NUM_OF_MAGNETS, MAGNET_STRENGTH_MAX } = config;

export type MagnetPoint = {
  locationX: number;
  locationY: number;
  strength?: number; // Positive if this works as creator, negative for sinks.
};

export const dummyMagnet = (xMax: number, yMax: number) => {
  return {
    locationX: getRandomInt(xMax),
    locationY: getRandomInt(yMax),
    strength: getRandomPosOrNegInt(MAGNET_STRENGTH_MAX),
  };
};

export const createMagnets = (
  width: number,
  height: number,
  numOfMagnets = NUM_OF_MAGNETS
): MagnetPoint[] => {
  const magnets = [];
  for (let i = 0; i < numOfMagnets; i++) {
    magnets.push(dummyMagnet(width, height));
  }
  return magnets;
};

export const getCreators = (magnetPoints: MagnetPoint[] = []) => {
  return magnetPoints.filter((point) => point.strength < 0);
};

export const getSinks = (magnetPoints: MagnetPoint[] = []) => {
  return magnetPoints.filter((point) => point.strength > 0);
};
