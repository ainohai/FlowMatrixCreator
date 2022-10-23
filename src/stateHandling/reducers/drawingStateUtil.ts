import { fillGridUsingFunction, gridFactory } from '../../entities/Grid';
import {
  checkIfAgentAlive,
  createDummyAgents,
  moveAgent,
} from '../../entities/Agent';
import {
  createMagnets,
  getCreators,
  getSinks,
  MagnetPoint,
} from '../../entities/MagnetPoint';
import { DrawingAction, DrawingState } from './drawingStateReducer';
import { AgentType } from '../../entities/entityTypes';
import { settings } from '../storeCreators/settingsStore';
import { CanvasSettings, StateOfArt } from '../../settingTypes';
import { calculateForces } from '../../utils/gridUtil';
import { Reducer } from '../store';

const getCurrentAgents = (
  agents: AgentType[],
  canvas: CanvasSettings,
  magnets: MagnetPoint[],
  agentBurst: number
) => {
  const living = agents.filter((agent) => agent.isAlive);
  if (living.length < settings().MIN_AGENTS && agentBurst < settings().TOTAL_BURSTS) {
    agentBurst++;

    const startingPoints = getCreators(magnets);
    living.push(...createDummyAgents(startingPoints, canvas));
  }
  return {agents: living, currentBurst: agentBurst};
};

const updateAgents = function (state: DrawingState): {agents: AgentType[], currentBurst: number} {
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
//TODO: Change how grid is calculated. 
export const resetMagnets = function (state: DrawingState): DrawingState {
  const grid = gridFactory(state.canvas.width, state.canvas.height);
  const magnets = createMagnets(state.canvas.width, state.canvas.height);
  fillGridUsingFunction(grid, magnets, calculateForces);
  return {...state, ...{magnets: magnets, grid: grid}}
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

export const setupNextRender: Reducer<DrawingState> = (state: DrawingState, action: DrawingAction): DrawingState => {
  const { stateIndex } = state;
  const { payload } = action; 
  let next = false;
  let definedState: number | undefined;
  const { USED_STATES } = settings();

  if (USED_STATES[stateIndex] === StateOfArt.SETUP ||
    USED_STATES[stateIndex] === StateOfArt.DRAW_HELPER_GRID ||
    USED_STATES[stateIndex] === StateOfArt.DRAW_MAGNETS) {
    next = true;
  }
  else if (USED_STATES[stateIndex] === StateOfArt.END) {
    next = false;
    definedState = undefined;
  }
  else if (USED_STATES[stateIndex] === StateOfArt.DRAW_AGENTS) {
    let update = updateAgents(state);
    state.agents = update.agents;
    state.nextAgentBurst = update.currentBurst;
    if (state.agents.length === 0) {
      next = true;
    }
  }
  else if (USED_STATES[stateIndex] === StateOfArt.RESET) {
    state = reset(state);
    definedState = USED_STATES.indexOf(StateOfArt.SETUP) + 1;
  }
  else if (USED_STATES[stateIndex] === StateOfArt.CLEAR_SCREEN) {
    definedState = USED_STATES.indexOf(StateOfArt.CONFIRM_DRAW);
  }
  else {
    next = payload?.phaseDone;
  }

  return {
    ...state, ...{
      stateIndex: definedState ? definedState : (next ? stateIndex + 1 : stateIndex),
    }
  };
}

export const changeStateIndex: Reducer<DrawingState> = (state: DrawingState, action: DrawingAction): DrawingState => {

  let definedState = 0;
  const jumpToStage = action.payload.jumpToStage;
  const { USED_STATES } = settings();

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
