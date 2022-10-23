import { distinctUntilChanged, map } from 'rxjs';
import { render } from './p5/sketch';
import drawingStore from './stateHandling/storeCreators/drawingStore';
import { DrawingActionType } from './stateHandling/reducers/drawingStateReducer';
import settingsStore from './stateHandling/storeCreators/settingsStore';
import { addConfigInputs } from './userInput/configInput';
import createControlButtons from './userInput/controlButtons';
import userActionStore from './stateHandling/storeCreators/userActionStore';


//TODO: CLEAN UP. 
//TODO: Smarter way to use store: 
//- get rid of using last() and make an easy way to subscribe to diffrent changes. Hooks?
//- Combined store
const settingsStateHandler = settingsStore;
const drawingStateHandler = drawingStore;
const userStateHandler = userActionStore;

if (settingsStore.last().SHOW_CONTROLS) {
addConfigInputs();
}
if (settingsStore.last().SHOW_BUTTONS) {
createControlButtons(drawingStateHandler, settingsStateHandler, userStateHandler);
}

render();

//TODO: This is just dummy action, as render waits for random action before starting drawing state. Do this better.
drawingStore.dispatch({ type: "START" })


//TODO: handle this kind of side effects with epics
settingsStore.state$.pipe(map((state) => { return state.NUM_OF_MAGNETS }), distinctUntilChanged()).subscribe((value) => {
    console.log("CHANGE MAGS" + value);
    drawingStore.dispatch({ type: DrawingActionType.RESET_MAGNETS })
}
)

