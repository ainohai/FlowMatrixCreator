import { distinctUntilChanged, map, take } from 'rxjs';
import { render } from './p5/sketch';
import { createDrawingsStore } from './stateHandling/storeCreators/drawingStore';
import { addConfigInputs } from './userInput/configInput';
import createControlButtons from './userInput/controlButtons';
import userActionStore from './stateHandling/storeCreators/userActionStore';
import { SettingsState } from './settingTypes';
import { createSettingsStore, getInitialSettings } from './stateHandling/storeCreators/settingsStore';
import { DrawingState } from './stateHandling/reducers/drawingStateReducer';


//TODO: CLEAN UP THIS MESS. 
//HOW? 
//- Combined store?
//- settings has always natural state and rendering is transactional. Behaviour subject might work better.  

const settingsStore = createSettingsStore();
const drawingStore = createDrawingsStore();


if (getInitialSettings().SHOW_CONTROLS) {
    addConfigInputs(getInitialSettings());
}
if (getInitialSettings().SHOW_BUTTONS) {
    createControlButtons();
}

render();
//TODO: these are here just to make sure all listeners have values. Remove this hack. 
settingsStore.dispatch({ type: "START_RENDER" });
drawingStore.dispatch({ type: "START_RENDER" });

