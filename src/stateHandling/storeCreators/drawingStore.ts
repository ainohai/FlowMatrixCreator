import { triggerRecipes } from "../epics/triggerRecipes";
import createDrawingStateReducer from "../reducers/drawingStateReducer";
import { DrawingState } from "../reducers/drawingStateReducer";
import createStore, { Epic, Store } from "../store";
import { getInitialSettings } from "./settingsStore";

const epics: Epic<DrawingState> = triggerRecipes;
let store;

export function createDrawingsStore(): Store<DrawingState> {
    store = createStore(createDrawingStateReducer(getInitialSettings()), epics);
    return store;
};

const drawingStore = (): Store<DrawingState> => {
    if (!store) {
        throw new Error("Uninitialized drawing store error")
    }
    return store;
}

export default drawingStore;