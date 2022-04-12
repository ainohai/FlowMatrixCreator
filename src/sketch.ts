import * as p5 from 'p5';
import { renderer } from './renderer';
import { State, stateHandler } from './stateHandler';
import { config, StateOfArt } from './config';

/**TODO:
 * 1. FIX: When agent is created to max value, grid point is not found when agent is moved => error.
 * 2. Better separation of generic code for reuse and artsy, unclean test code.
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
 * 6. Consider if browser performance is enough. (Check Nannou, p5 nodejs port)
 * 7. Add offset for agents => they would be not drawn perfectly on their agent.position, but on their offset position.
 * 8. Magnet points:
 *      - could move or be recalculated
 *      - Magnets could be just one kind of agent with extra properties.
 * 9. Shake the grid.
 * 10. General cleanup & refactoring.
 * 11. Make it art.
 **/

/**
 * @return true if can move to next state
 * @param state
 * @param p5
 */

const { USED_STATES, BACKGROUND_COLOR } = config;

export const sketch = function (p5: p5) {
  const render = renderer(p5);
  const handler = stateHandler(p5);

  let state: State = handler.initialState({
    //todo: solve why p5 gives faulty values for width & height
    width: p5.windowWidth,
    height: p5.windowHeight,
    color: BACKGROUND_COLOR,
  });

  p5.setup = () => {
    render.canvas(state.canvas);
    state = handler.updateState(state, true);
  };

  // Main render loop
  p5.draw = () => {
    const { grid, agents, stateIndex, canvas, magnets } = state;

    //todo: Some other solution?
    let nextStage: boolean | undefined;
    switch (USED_STATES[stateIndex]) {
      case StateOfArt.DRAW_GRID:
        nextStage = render.grid(grid);
        break;
      case StateOfArt.DRAW_HELPER_GRID:
        render.helperLines(canvas);
        nextStage = true;
        break;
      case StateOfArt.DRAW_MAGNETS:
        render.magnetPoints(magnets);
        nextStage = true;
        break;
      case StateOfArt.DRAW_AGENTS:
        render.agents(agents, canvas);
        break;
      case StateOfArt.END:
        console.log('done'); //DEBUG
        p5.noLoop();
        break;
    }
    state = handler.updateState(state, nextStage);
  };
};
