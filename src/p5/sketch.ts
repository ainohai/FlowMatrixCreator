import * as p5 from 'p5';
import { renderer } from './renderer';
import { config, StateOfArt } from '../config';
import { GridType } from '../entities/Grid';
import { State } from '../stateHandling/stateHandler';
import { ActionType, stateObserver, triggerStateUpdate, triggerUserActions } from '..';


/**TODO:
 * 1. FIX: When agent is created to max value, grid point is not found when agent is moved => error.
 * 2. Better separation of generic code for reuse and artsy, unclean test code. Get rid of p5js?
 * 3. Lazy calculation of force grid.
 * 4. Add barriers. Current ideas:
 *     - check how flocking/boid examples work.
 *     - should barrier affect the force grid or only the moving agents?
 *       (Maybe if the steering force of agent is different from the one saved in grid, the grid is updated with some weighted value?)
 *     - Barrier has a force vector in it and it turns approaching agent to steer away from it (depending on the distance)?
 *     - I may be simpler to pass barrier always from one direction, but not so nice (aka. has the barrier force a direction)?
 *     - there needs to be a range for spotting barriers as we don't want to loop everything through?
 *     - do agents affect each others (aka. are we talking about fluid or particles without mass)?
 *     - should barrier block also magnets? (Probably better to simplify first)
 * 5. Configs can set from UI? Configs are stored nicely.
 * 6. Consider if browser performance is enough. (Check Nannou, p5 nodejs port, canvas vs webgl)
 * 7. Add offset for agents => they would be not drawn perfectly on their agent.position, but on their offset position.
 * 8. Magnet points:
 *      - could move or be recalculated
 *      - Magnets could be just one kind of agent with extra properties.
 *      - Entities to classes?
 * 9. Shake the grid.
 * 10. General cleanup & refactoring.
 * 11. Make it art.
 **/

/**
 * @return true if can move to next state
 * @param state
 * @param p5
 */

const { USED_STATES } = config;

export const sketch = function (p5: p5) {
  const render = renderer(p5);

  let state;
  stateObserver().subscribe((value) => state = value );

  let renderState = (renderState: State): number => {
    const { grid, agents, stateIndex, canvas, magnets } = renderState;
        //todo: Some other solution?
        let nextStage = stateIndex;
        switch (USED_STATES[stateIndex]) {
          case StateOfArt.DRAW_GRID:
            let gridDone = render.grid(grid);
            nextStage = gridDone ? stateIndex + 1 : stateIndex;
            break;
          case StateOfArt.DRAW_HELPER_GRID:
            render.helperLines(canvas);
            nextStage = stateIndex + 1;
            break;
          case StateOfArt.DRAW_MAGNETS:
            render.magnetPoints(magnets);
            nextStage = stateIndex + 1;
            break;
          case StateOfArt.CONFIRM_DRAW_AGENTS:
              render.confirmDrawingAgents(
                () => { triggerUserActions().next({action: ActionType.DRAW_AGENTS}); }, 
                () => { triggerUserActions().next({action: ActionType.CANCEL});}, 
                {width: canvas.width, height: canvas.height});
              break;  
          case StateOfArt.DRAW_AGENTS:
            render.agents(agents, canvas);
            break;
          case StateOfArt.END:
            console.log('done'); //DEBUG
            p5.noLoop();
            break;
        }
  
      return nextStage;
  }

  p5.setup = () => {
    
    render.canvas(state.canvas);
    //TODO: not so good way to give index directly here. Change this. 
    triggerStateUpdate().next(state.stateIndex + 1);
  };

  // Main render loop
  p5.draw = () => {
    
    let nextStage = renderState(state)
    triggerStateUpdate().next(nextStage);
  };
};

