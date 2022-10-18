import { getCurrentGridPosition, isOnSameGridPoint } from '../utils/gridUtil';
import { config } from '../config';
import { addOffset, getRandomFloat, getRandomInt } from '../utils/mathUtils';
import { MagnetPoint } from './MagnetPoint';
import { ArtVector } from './ArtVector';
import { colorByVelocity } from '../utils/utils';
import { AgentType, CanvasSettings, GridType, Rgb } from '../types';

const {
  DEFAULT_LIFESPAN,
  FRICTION_MULTIPLIER,
  MAX_STROKE,
  MAXIMUM_VELOCITY,
  BURST_SIZE,
  OFFSET,
  ADD_TO_OLD_VELOCITY,
  RANDOM_START,
  MAXIMUM_ACC,
} = config;


const getDefaultSettings = () => ({
  lifespanInFrames: DEFAULT_LIFESPAN,
  color: (agent: AgentType, canvas: CanvasSettings) =>
    //Todo: Should be given in config.
    colorByVelocity(agent, canvas),
  strokeWidth: getRandomFloat(MAX_STROKE),
  acceleration: new ArtVector(0, 0),
  isAlive: true,
});

export const dummyAgent = (
  x: number,
  y: number,
  color?: (agent: AgentType, canvas: CanvasSettings) => Rgb,
  velocityX = 0,
  velocityY = 0
): AgentType => {
  return {
    ...{
      position: new ArtVector(x, y),
      previousPos: new ArtVector(x, y),
      velocity: new ArtVector(velocityX, velocityY),
      color: color,
    },
    ...getDefaultSettings(),
  };
};

//Adds steering force to agents acceleration.
// https://p5js.org/examples/hello-p5-flocking.html <= example with boids used as a guide.
export const updateAcceleration = (
  agent: AgentType,
  grid: GridType,
) => {
  const { row, column } = getCurrentGridPosition(
    agent.position.x,
    agent.position.y,
    grid.gridSize
  );
  if (!grid.gridValues[column] || !grid.gridValues[column][row]) {
    console.log(grid);
    console.log(agent);
    throw Error('Faulty agent position or grid');
  }

  const position = grid.gridValues[column][row];

  const gridVelocity = position.velocity;

  let steer: ArtVector = ADD_TO_OLD_VELOCITY
    ? agent.acceleration.copy().addMe(gridVelocity) 
    : gridVelocity.copy();

  steer.limitMe(MAXIMUM_ACC);
  agent.acceleration = steer;
};

/**
 * Modifies existing agent
 */
const updateVelocity = (agent: AgentType, addToOldVelocity: boolean) => {
  if (addToOldVelocity) {
    agent.velocity = agent.velocity.multiplyMe(FRICTION_MULTIPLIER);
    agent.velocity.addMe(agent.acceleration);
  } else {
    agent.velocity = agent.acceleration.copy();
  }
  agent.velocity.limitMe(MAXIMUM_VELOCITY);
};

export const moveAgent = (
  agent: AgentType,
  grid: GridType,
  addToOldVelocity = ADD_TO_OLD_VELOCITY
) => {
  agent.lifespanInFrames--;
  agent.previousPos = agent.position.copy();

  updateAcceleration(agent, grid);
  updateVelocity(agent, addToOldVelocity);

  agent.position.addMe(agent.velocity);
};

const onKillPoint = (
  agent: AgentType,
  killPoints: MagnetPoint[],
  gridSize: number
) =>
  isOnSameGridPoint(
    { x: agent.position.x, y: agent.position.y },
    killPoints.map((magnet) => ({ x: magnet.locationX, y: magnet.locationY })),
    gridSize
  );

export const checkIfAgentAlive = (
  agent: AgentType,
  canvas: CanvasSettings,
  killPoints: MagnetPoint[],
  gridSize: number
) => {
  const isKilled = onKillPoint(agent, killPoints, gridSize);

  if (agent.lifespanInFrames <= 0 || isKilled) {
    agent.isAlive = false;
  } else if (
    agent.position.x >= canvas.width ||
    agent.position.x < 0 ||
    agent.position.y >= canvas.height ||
    agent.position.y < 0
  ) {
    agent.isAlive = false;
  }
};

const getStartingPoint = (
  creatingPoints: MagnetPoint[],
  canvas: CanvasSettings
): MagnetPoint => {
  let point =
    !!creatingPoints && creatingPoints.length > 0
      ? creatingPoints[getRandomInt(creatingPoints.length)]
      : {
          locationX: getRandomInt(canvas.width),
          locationY: getRandomInt(canvas.height),
        };

  return {
    locationX: addOffset(point.locationX, OFFSET, canvas.width),
    locationY: addOffset(point.locationY, OFFSET, canvas.height),
  };
};

export const createDummyAgents = (
  magnets: MagnetPoint[],
  canvas: CanvasSettings,
  numOfAgents = BURST_SIZE,
  color?: (agent: AgentType, canvas: CanvasSettings) => Rgb
): AgentType[] => {
  const agents = [];

  for (let i = 0; i < numOfAgents; i++) {
    const point = RANDOM_START
      ? {
          locationX: getRandomInt(canvas.width),
          locationY: getRandomInt(canvas.height),
        }
      : getStartingPoint(magnets, canvas);
    const dummy = dummyAgent(point.locationX, point.locationY, color);
    agents.push(dummy);
  }
  return agents;
};
