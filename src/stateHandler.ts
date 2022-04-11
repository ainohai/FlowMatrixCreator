import { fillGridUsingFunction, gridFactory, GridType } from './entities/Grid';
import {
  AgentType,
  checkIfAgentAlive,
  createDummyAgents,
  moveAgent,
} from './entities/Agent';
import { calculateForces } from './utils/gridUtil';
import { config, StateOfArt } from './config';
import * as p5 from 'p5';
import {
  createMagnets,
  getCreators,
  getSinks,
  MagnetPoint,
} from './entities/MagnetPoint';
import { Rgb } from './utils/utils';

const { TOTAL_BURSTS, USED_STATES, MIN_AGENTS } = config;

export type State = {
  grid: GridType;
  agents: AgentType[];
  canvas: CanvasSettings;
  stateIndex: number;
  magnets: MagnetPoint[];
};
export type CanvasSettings = {
  height?: number;
  width?: number;
  color?: Rgb;
};

export function stateHandler(p5: p5) {
  let agentBurst = 0;

  function initialState(canvasSettings: CanvasSettings): State {
    const { width, height } = canvasSettings;

    const grid = gridFactory(width, height);
    const magnets = createMagnets(p5, width, height);

    fillGridUsingFunction(p5, grid, magnets, calculateForces);

    let startingPoints = getCreators(magnets);

    let agents = createDummyAgents(p5, startingPoints, canvasSettings);
    agentBurst++;

    return {
      grid: grid,
      agents: agents,
      canvas: canvasSettings,
      stateIndex: 0,
      magnets: magnets,
    };
  }

  const getCurrentAgents = (
    agents: AgentType[],
    canvas: CanvasSettings,
    grid: GridType,
    magnets: MagnetPoint[]
  ) => {
    let living = agents.filter((agent) => agent.isAlive);
    //If all old agents are dead, new agents burst.
    if (living.length < MIN_AGENTS && agentBurst < TOTAL_BURSTS) {
      agentBurst++;

      let startingPoints = getCreators(magnets);
      living.push(...createDummyAgents(p5, startingPoints, canvas));
    }
    return living;
  };

  function updateAgents(state: State): AgentType[] {
    const { agents, grid, canvas, magnets } = state;
    for (let agent of agents) {
      moveAgent(p5, agent, grid);
      checkIfAgentAlive(agent, canvas, getSinks(magnets), grid.gridSize);
    }
    return getCurrentAgents(agents, canvas, grid, magnets);
  }

  function updateState(state: State, nextStage: boolean): State {
    const { stateIndex } = state;

    if (USED_STATES[stateIndex] === StateOfArt.DRAW_AGENTS) {
      state.agents = updateAgents(state);

      if (state.agents.length === 0) {
        nextStage = true;
      }
    }

    return {...state, ...{
      stateIndex: nextStage ? stateIndex + 1 : stateIndex,
    }};
  }
  return { initialState, updateState };
}
