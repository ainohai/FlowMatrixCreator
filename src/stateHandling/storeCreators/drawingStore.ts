import createDrawingStateReducer from "../reducers/drawingStateReducer";
import { DrawingState } from "../reducers/drawingStateReducer";
import createStore, { Store } from "../store";
import { getInitialSettings } from "./settingsStore";

let store;

export function createDrawingsStore(): Store<DrawingState> {
    store = createStore(createDrawingStateReducer(getInitialSettings()));
    return store;
};

const drawingStore = (): Store<DrawingState> => {
    if (!store) {
        throw new Error("Uninitialized drawing store error")
    }
    return store;
}

export default drawingStore;