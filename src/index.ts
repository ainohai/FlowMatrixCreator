import { render } from './render/p5/sketch';
import { createDrawingsStore } from './stateHandling/storeCreators/drawingStore';
import { addConfigInputs } from './userInput/configInput';
import createControlButtons from './userInput/controlButtons';
import { createSettingsStore, getInitialSettings } from './stateHandling/storeCreators/settingsStore';


const settingsStore = createSettingsStore();
const drawingStore = createDrawingsStore();


if (getInitialSettings().SHOW_CONTROLS) {
    addConfigInputs(getInitialSettings());
}
if (getInitialSettings().SHOW_BUTTONS) {
    createControlButtons();
}

render();
//TODO: these are here just to make sure all listeners have values. Rethink. 
settingsStore.dispatch({ type: "START_RENDER" });
drawingStore.dispatch({ type: "START_RENDER" });

