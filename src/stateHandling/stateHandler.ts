import { fillGridUsingFunction, gridFactory, GridType } from '../entities/Grid';
import {
  AgentType,
  checkIfAgentAlive,
  createDummyAgents,
  moveAgent,
} from '../entities/Agent';
import { calculateForces } from '../utils/gridUtil';
import { config, StateOfArt } from '../config';
import {
  createMagnets,
  getCreators,
  getSinks,
  MagnetPoint,
} from '../entities/MagnetPoint';
import { Rgb } from '../utils/utils';
import { BehaviorSubject, Subject } from 'rxjs';

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

export const stateHandler = function(windowWidth: number, windowHeight: number, backgroundColor: Rgb, updateStateTrigger: Subject<number>) {
  let agentBurst = 0;

  const initialState = function (canvasSettings: CanvasSettings): State {
    const { width, height } = canvasSettings;

    const grid = gridFactory(width, height);
    const magnets = createMagnets(width, height);

    fillGridUsingFunction(grid, magnets, calculateForces);

    let startingPoints = getCreators(magnets);

    let agents = createDummyAgents(startingPoints, canvasSettings);
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
    const living = agents.filter((agent) => agent.isAlive);
    if (living.length < MIN_AGENTS && agentBurst < TOTAL_BURSTS) {
      agentBurst++;

      const startingPoints = getCreators(magnets);
      living.push(...createDummyAgents(startingPoints, canvas));
    }
    return living;
  };

  const updateAgents = function(state: State): AgentType[] {
    const { agents, grid, canvas, magnets } = state;
    for (let agent of agents) {
      moveAgent(agent, grid);
      checkIfAgentAlive(agent, canvas, getSinks(magnets), grid.gridSize);
    }
    return getCurrentAgents(agents, canvas, grid, magnets);
  }

  const updateState = function(state: State, nextStage: number): State {
    const { stateIndex } = state;

    if (USED_STATES[stateIndex] === StateOfArt.DRAW_AGENTS) {
      state.agents = updateAgents(state);

      if (state.agents.length === 0) {
        nextStage = stateIndex + 1;
      }
    }

    return {...state, ...{
      stateIndex: nextStage,
    }};
  }

  const initState: State = initialState({
    //todo: solve why p5 gives faulty values for width & height
    width: windowWidth,
    height: windowHeight,
    color: backgroundColor,
  }); 

  const stateSubject = new BehaviorSubject(initState);
  const stateObs = () => stateSubject;

  updateStateTrigger.subscribe((nextStage) => 
      { 
        console.log("listening to state updates")
        let state = stateSubject.getValue();
        stateSubject.next(updateState(state, nextStage))
    });


    stateSubject.subscribe((newState) => console.log(newState.stateIndex));

  return stateObs;
}
