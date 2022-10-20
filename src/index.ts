import { render } from './p5/sketch';
import stores, { drawingStore } from './stateHandling/storeHandler';


//controlButtons(triggerStateUpdate());

//configInputs(fireUserActions());

render();

const store = stores;

drawingStore.dispatch({type: "INIT"});


