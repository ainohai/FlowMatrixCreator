import { fillGridUsingFunction, gridFactory } from '../entities/Grid';
import {
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
import { AgentType, CanvasSettings, GridType, Rgb, State } from '../types';
import { BehaviorSubject, Subject } from 'rxjs';
import { Payload } from '../types';
import { getScheme } from '../utils/colorUtil';


const { TOTAL_BURSTS, USED_STATES, MIN_AGENTS, COLOR_PALETTE } = config;

export const stateHandler = function(windowWidth: number, windowHeight: number, backgroundColor: Rgb, updateStateTrigger: Subject<Payload>) {
  let agentBurst = 0;

  const initialState = function (canvasSettings: CanvasSettings): State {
    const { width, height } = canvasSettings;

    const grid = gridFactory(width, height);
    const magnets = createMagnets(width, height);

    fillGridUsingFunction(grid, magnets, calculateForces);

    let startingPoints = getCreators(magnets);

    let agents = createDummyAgents(startingPoints, canvasSettings);
    agentBurst = 0;

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
  const reset = function(state: State): State {
    return initialState(state.canvas);
  }

  const updateState = function(state: State, payload: Payload): State {
    const { stateIndex } = state;
    let next = false; 
    let definedState: number | undefined;


    if (USED_STATES[stateIndex] === StateOfArt.SETUP || USED_STATES[stateIndex] === StateOfArt.DRAW_HELPER_GRID || USED_STATES[stateIndex] === StateOfArt.DRAW_MAGNETS || USED_STATES[stateIndex] === StateOfArt.CLEAR_SCREEN ) {
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

    if (payload.reset) {
      definedState = USED_STATES.indexOf(StateOfArt.RESET);
    }

    //TODO: Remove debug
    if (next || definedState) {console.log(`Moving to stage: ${StateOfArt[USED_STATES[stateIndex]as keyof typeof StateOfArt]}`)}

    console.log(`Def: ${definedState}, next: ${next}, current: ${StateOfArt[USED_STATES[stateIndex]as keyof typeof StateOfArt]}`);

    return {...state, ...{
      stateIndex: definedState ? definedState : (next ? stateIndex + 1 : stateIndex),
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

  updateStateTrigger.subscribe((payload) => 
      { 
        let state = stateSubject.getValue();
        stateSubject.next(updateState(state, payload))
    });

  return stateObs;
}
