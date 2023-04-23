import { render } from './render/p5/sketch';
import { createDrawingsStore } from './stateHandling/storeCreators/drawingStore';
import { addConfigInputs } from './userInput/configInput';
import createControlButtons from './userInput/controlButtons';
import { createSettingsStore, getInitialSettings } from './stateHandling/storeCreators/settingsStore';
import { renderThree } from './render/threejs/sketch';


const settingsStore = createSettingsStore();
const drawingStore = createDrawingsStore();


if (getInitialSettings().SHOW_CONTROLS) {
    addConfigInputs(getInitialSettings());
}
if (getInitialSettings().SHOW_BUTTONS) {
    createControlButtons();
}

//render();
renderThree();
//TODO: these are here just to make sure all listeners have values. Remove this hack. 
settingsStore.dispatch({ type: "START_RENDER" });
drawingStore.dispatch({ type: "START_RENDER" });

