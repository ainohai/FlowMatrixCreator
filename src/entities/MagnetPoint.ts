import * as p5 from 'p5';
import { config } from '../config';

const { NUM_OF_MAGNETS, MAGNET_STRENGTH_MAX } = config;

export type MagnetPoint = {
  locationX: number;
  locationY: number;
  strength?: number; // Positive if this works as creator, negative for sinks.
};

export const dummyMagnet = (p5: p5, xMax: number, yMax: number) => {
  return {
    locationX: Math.floor(p5.random(0, xMax)),
    locationY: Math.floor(p5.random(0, yMax)),
    strength: Math.floor(p5.random(-MAGNET_STRENGTH_MAX, MAGNET_STRENGTH_MAX)),
  };
};

export const createMagnets = (
  p5: p5,
  width: number,
  height: number,
  numOfMagnets = NUM_OF_MAGNETS
): MagnetPoint[] => {
  const magnets = [];
  for (let i = 0; i < numOfMagnets; i++) {
    magnets.push(dummyMagnet(p5, width, height));
  }
  return magnets;
};

export const getCreators = (magnetPoints: MagnetPoint[] = []) => {
  return magnetPoints.filter((point) => point.strength < 0);
};

export const getSinks = (magnetPoints: MagnetPoint[] = []) => {
  return magnetPoints.filter((point) => point.strength > 0);
};
