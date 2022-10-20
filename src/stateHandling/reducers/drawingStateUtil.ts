import { fillGridUsingFunction, gridFactory } from '../../entities/Grid';
import {
  checkIfAgentAlive,
  createDummyAgents,
  moveAgent,
} from '../../entities/Agent';
import { calculateForces } from '../../utils/gridUtil';
import { config, StateOfArt } from '../../config';
import {
  createMagnets,
  getCreators,
  getSinks,
  MagnetPoint,
} from '../../entities/MagnetPoint';
import { settings } from '../../userInput/configInput';
import { CanvasSettings, DrawingAction, DrawingReducer, DrawingState } from './drawingStateReducer';
import { AgentType } from '../../entities/entityTypes';

//Todo: get this from settings
const { USED_STATES } = config;

const getCurrentAgents = (
  agents: AgentType[],
  canvas: CanvasSettings,
  magnets: MagnetPoint[],
  agentBurst: number
) => {
  const living = agents.filter((agent) => agent.isAlive);
  if (living.length < settings.MIN_AGENTS && agentBurst < settings.TOTAL_BURSTS) {
    agentBurst++;

    const startingPoints = getCreators(magnets);
    living.push(...createDummyAgents(startingPoints, canvas));
  }
  return living;
};

const updateAgents = function (state: DrawingState): AgentType[] {
  const { agents, grid, canvas, magnets, nextAgentBurst } = state;
  for (let agent of agents) {
    moveAgent(agent, grid);
    checkIfAgentAlive(agent, canvas, getSinks(magnets), grid.gridSize);
  }
  return getCurrentAgents(agents, canvas, magnets, nextAgentBurst);
}

export const reset = function (state: DrawingState): DrawingState {
  return initialState(state.canvas);
}

export const initialState = function (canvasSettings: CanvasSettings): DrawingState {
  const { width, height } = canvasSettings;

  const grid = gridFactory(width, height);
  const magnets = createMagnets(width, height);

  fillGridUsingFunction(grid, magnets, calculateForces);

  let startingPoints = getCreators(magnets);

  let agents = createDummyAgents(startingPoints, canvasSettings);

  return {
    grid: grid,
    agents: agents,
    canvas: canvasSettings,
    stateIndex: 0,
    magnets: magnets,
    nextAgentBurst: 0
  };
}

export const setupNextRender: DrawingReducer = (state: DrawingState, action: DrawingAction): DrawingState => {
  const { stateIndex } = state;
  const { payload } = action; 
  let next = false;
  let definedState: number | undefined;

  if (USED_STATES[stateIndex] === StateOfArt.SETUP ||
    USED_STATES[stateIndex] === StateOfArt.DRAW_HELPER_GRID ||
    USED_STATES[stateIndex] === StateOfArt.DRAW_MAGNETS ||
    USED_STATES[stateIndex] === StateOfArt.CLEAR_SCREEN) {
    next = true;
  }
  else if (USED_STATES[stateIndex] === StateOfArt.DRAW_AGENTS) {
    state.agents = updateAgents(state);

    if (state.agents.length === 0) {
      next = true;
    }
  }
  else if (USED_STATES[stateIndex] === StateOfArt.RESET) {
    state = reset(state);
    definedState = USED_STATES.indexOf(StateOfArt.SETUP) + 1;
  }
  else {
    next = payload.phaseDone;
  }

  return {
    ...state, ...{
      stateIndex: definedState ? definedState : (next ? stateIndex + 1 : stateIndex),
    }
  };
}

export const changeStateIndex: DrawingReducer = (state: DrawingState, action: DrawingAction): DrawingState => {

  let definedState = 0;
  const jumpToStage = action.payload.jumpToStage;

  if (jumpToStage) {
      definedState = USED_STATES.indexOf(action.payload.jumpToStage);
  }

  //TODO: Remove debug
  if (definedState) { console.log(`Moving to stage: ${StateOfArt[USED_STATES[definedState] as keyof typeof StateOfArt]}`) }

  console.log(`Def: ${definedState}, current: ${StateOfArt[USED_STATES[definedState] as keyof typeof StateOfArt]}`);

  return {
    ...state, 
    ...{ stateIndex: definedState }
  };
}
