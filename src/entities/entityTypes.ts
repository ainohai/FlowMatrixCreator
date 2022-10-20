import { CanvasSettings } from "../stateHandling/reducers/drawingStateReducer";
import { ArtVector } from "./ArtVector";

export type Rgb = {
    r: number;
    g: number;
    b: number;
    opacity?: number;
  };
  
  export type AgentType = {
    position: ArtVector;
    velocity: ArtVector;
    lifespanInFrames: number;
    color: Rgb | ((agent: AgentType, canvas: CanvasSettings) => Rgb);
    strokeWidth: number;
    //Todo: Do we really want/need this at all.
    previousPos: ArtVector;
    acceleration?: ArtVector;
    isAlive: boolean;
  };

  export type GridValue = {
    velocity: ArtVector;
  };
  
  export type GridType = {
    gridSize: number; //How big each cell is
    gridValues?: GridValue[][]; //[column][row]
  };
