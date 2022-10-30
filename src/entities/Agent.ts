import { getCurrentGridPosition, isOnSameGridPoint } from '../utils/gridUtil';
import { addOffset, getRandomFloat, getRandomInt } from '../utils/mathUtils';
import { MagnetPoint } from './MagnetPoint';
import { ArtVector } from './ArtVector';
import { colorByVelocity } from '../utils/utils';
import { CanvasSettings, SettingsState } from '../settingTypes';
import { AgentType, GridType, Rgb } from './entityTypes';

const getDefaultSettings = (settings: SettingsState) => ({
  lifespanInFrames: settings.DEFAULT_LIFESPAN,
  color: (agent: AgentType, canvas: CanvasSettings) =>
    //Todo: Should be given in config.
    colorByVelocity(agent, canvas, settings),
  strokeWidth: getRandomFloat(settings.MAX_STROKE),
  acceleration: new ArtVector(0, 0),
  isAlive: true,
});

export const dummyAgent = (
  x: number,
  y: number,
  settings:SettingsState,
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
    ...getDefaultSettings(settings),
  };
};

//Adds steering force to agents acceleration.
// https://p5js.org/examples/hello-p5-flocking.html <= example with boids used as a guide.
export const updateAcceleration = (
  agent: AgentType,
  grid: GridType,
  addToOldVelocity: boolean,
  maximumAcceleration: number
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

  let steer: ArtVector = addToOldVelocity
    ? agent.acceleration.copy().addMe(gridVelocity) 
    : gridVelocity.copy();

  steer.limitMe(maximumAcceleration);
  agent.acceleration = steer;
};

/**
 * Modifies existing agent
 */
const updateVelocity = (agent: AgentType, addToOldVelocity: boolean, frictionMultiplier: number, maximumVelocity: number) => {
  if (addToOldVelocity) {
    agent.velocity = agent.velocity.multiplyMe(frictionMultiplier);
    agent.velocity.addMe(agent.acceleration);
  } else {
    agent.velocity = agent.acceleration.copy();
  }
  agent.velocity.limitMe(maximumVelocity);
};

export const moveAgent = (
  agent: AgentType,
  grid: GridType,
  addToOldVelocity: boolean,
  maximumAcceleration: number,
  frictionMultiplier: number,
  maximumVelocity: number
) => {
  agent.lifespanInFrames--;
  agent.previousPos = agent.position.copy();

  updateAcceleration(agent, grid, addToOldVelocity, maximumAcceleration);
  updateVelocity(agent, addToOldVelocity, frictionMultiplier, maximumVelocity);

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
  canvas: CanvasSettings,
  offset: number
): MagnetPoint => {
  let point =
    !!creatingPoints && creatingPoints.length > 0
      ? creatingPoints[getRandomInt(creatingPoints.length)]
      : {
          locationX: getRandomInt(canvas.width),
          locationY: getRandomInt(canvas.height),
        };

  return {
    locationX: addOffset(point.locationX, offset, canvas.width),
    locationY: addOffset(point.locationY, offset, canvas.height),
  };
};

export const createDummyAgents = (
  magnets: MagnetPoint[],
  canvas: CanvasSettings,
  settings: SettingsState,
  color?: (agent: AgentType, canvas: CanvasSettings) => Rgb,
): AgentType[] => {
  const agents = [];

  for (let i = 0; i < settings.BURST_SIZE; i++) {
    const point = settings.RANDOM_START
      ? {
          locationX: getRandomInt(canvas.width),
          locationY: getRandomInt(canvas.height),
        }
      : getStartingPoint(magnets, canvas, settings.OFFSET);
    const dummy = dummyAgent(point.locationX, point.locationY, settings, color);
    agents.push(dummy);
  }
  return agents;
};
