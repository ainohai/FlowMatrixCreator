import { Vector } from 'p5';
import * as p5 from 'p5';

export const angleOfLineBetweenPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

export const distanceBetweenPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const xComponent = Math.pow(x2 - x1, 2);
  const yComponent = Math.pow(y2 - y1, 2);
  return Math.sqrt(xComponent + yComponent);
};

export const strengthOfVector = (vector: p5.Vector) => {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
};

export const vectorByAngle = (angle: number, magnitude: number): Vector => {
  return Vector.fromAngle(angle, magnitude);
};

export const addOffset = (
  num: number,
  maxOffset: number,
  maxNum: number,
  p5: p5
) => {
  let offsetNum = num + p5.random(-maxOffset, maxOffset);
  if (offsetNum < 0) {
    return 0;
  } else if (offsetNum >= maxNum) {
    return maxNum;
  }
  return offsetNum;
};
