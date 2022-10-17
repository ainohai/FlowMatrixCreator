import { Vector2 } from "@daign/math";
import { max } from "rxjs";

const limitVector = (vector: Vector2, maxValue): Vector2 => {
  
  const square = vector.x * vector.x + vector.y * vector.y;
  if (square > maxValue * maxValue) {
    //Normalizing
    const divider = Math.sqrt(square);
    let x = vector.x / divider;
    let y = vector.y / divider;
    //Multiplying
    x = x * maxValue;
    y = y * maxValue; 
    return new Vector2(x, y);
  }
  return vector;

};

const multiplyVector = (vector: Vector2, multiplier): Vector2 => {
  return new Vector2(vector.x * multiplier, vector.y * multiplier);
};

const copy = (vector: Vector2) => {
  return createVector(vector.x, vector.y);
};

const strengthOfVector = (vector: Vector2) => {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
};

const byAngle = (angle: number, magnitude: number) => {
  return {x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude};
};
const getAngle = (vector: Vector2) => {
  return vector.angle().radians;
}


//A wrapper class for vector maths used
export class ArtVector {
  private _vector: Vector2;
 
  constructor(x: number, y: number) {
    this._vector = new Vector2(x, y);
  }
  public get x() {
    return this._vector.x;
  }
  public get y() {
    return this._vector.y;
  }
  public get strength(): number {
    return strengthOfVector(this._vector); 
  }
  public get direction(): number {
    return getAngle(this._vector);    
  }
  public dangerousInnerVector() {
    return this._vector;
  }
 
  limitMe(maxValue) {
    this._vector = limitVector(this._vector, maxValue)
    return this;
  }
  multiplyMe(multiplier) {
    this._vector = multiplyVector(this._vector, multiplier);
    return this;
  }
  copy() {
    return copy(this._vector);
  }
  addMe(artVector: ArtVector) {
    this._vector.add(artVector.dangerousInnerVector());
    return this;
  }
}
 
export const createVector = (x: number, y: number) => new ArtVector(x, y);

export const createVectorByAngle = (angle: number, magnitude: number): ArtVector => {
  let components = byAngle(angle, magnitude);
  return createVector(components.x, components.y);
};
