import * as p5 from 'p5';
import { renderer } from './renderer';
import { DrawingActionType, DrawingState, Payload } from '../stateHandling/reducers/drawingStateReducer';
import settingsStore, { getInitialSettings } from '../stateHandling/storeCreators/settingsStore';
import { map, take } from 'rxjs';
import { SettingsState, StateOfArt } from '../settingTypes';
import drawingStore from '../stateHandling/storeCreators/drawingStore';
import { subscribeToStateOfArtIndex } from '../stateHandling/subscriptions';


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

let loopingOn;
let settings: SettingsState; 
let drawing: DrawingState;

let renderSettings: SettingsState;
/**
 * @return true if can move to next state
 * @param state
 * @param p5
 */
const sketch = function (p5: p5) {

  renderSettings = settings;
  const getSettings = () => renderSettings;
  const render = renderer(p5, getSettings);

  loopingOn = () => p5.loop();

  let renderState = (renderState: DrawingState): Payload => {
    const { grid, agents, stateIndex, canvas, magnets } = renderState;
    //todo: Some other solution?
    let payload = {};
    switch (getSettings().USED_STATES[stateIndex]) {
      case StateOfArt.DRAW_GRID:
        let gridDone = render.grid(grid);
        payload = { phaseDone: gridDone };
        break;
      case StateOfArt.DRAW_HELPER_GRID:
        render.helperLines(canvas);
        break;
      case StateOfArt.DRAW_MAGNETS:
        render.magnetPoints(magnets);
        break;
      case StateOfArt.CLEAR_SCREEN:
        render.clearScreen(canvas.color);
        break;
      case StateOfArt.DRAW_AGENTS:
        render.agents(agents, canvas, getSettings().FADING, getSettings().AGENT_DRAWING_MODES);
        break;
      case StateOfArt.END:
        console.log('done'); //DEBUG
        p5.noLoop();
        break;
      case StateOfArt.RESET:
        render.reset(canvas.color);
        break;
    }
    return payload;
  }

  p5.setup = () => {
    const drawingState = drawing;
    renderSettings = settings;
    render.canvas(drawingState.canvas);
    drawingStore().dispatch({ type: DrawingActionType.SETUP_DRAW })
  };

  // Main render loop
  p5.draw = () => {
    const drawingState = drawing; 
    renderSettings = settings;
    let payload = renderState(drawingState)

    drawingStore().dispatch({ type: DrawingActionType.SETUP_DRAW, payload: payload })
  };
};

export const render = function () {
  let p5Instance: p5;
  const init$ = drawingStore().state$.pipe(take(1))
  init$.subscribe(newState => {
    p5Instance = new p5(sketch, document.getElementById('p5-container'));
  })
  
  //TODO: Refactor
  //We want the store to keep the same settings during a rendering round. 
  const drawingStore$ = drawingStore().state$.subscribe((state: DrawingState) => drawing = state);
  const settingsState$ = settingsStore().state$.subscribe((state: SettingsState) => settings = state);

  const usedStates$ = settingsStore().state$.pipe(map((state: SettingsState) => state.USED_STATES));
  const restart$ = subscribeToStateOfArtIndex((index: number) => {if(StateOfArt.RESET === getInitialSettings().USED_STATES[index]) {loopingOn()}});
}