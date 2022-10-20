import drawingStateReducer from "./reducers/drawingStateReducer";
import settingsReducer from "./reducers/settingsReducer";
import createStore from "./store";

const createStores = () => {

const settingsStore = createStore(settingsReducer);
const drawingStore = createStore(drawingStateReducer);


return { settingsStore, drawingStore}
}

const stores = createStores();

export const drawingStore = stores.drawingStore;
export const settingsStore = stores.settingsStore;

export default stores;