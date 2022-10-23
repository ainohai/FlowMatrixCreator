import drawingStateReducer from "../reducers/drawingStateReducer";
import createStore from "../store";

const drawingStore = createStore(drawingStateReducer);
export default drawingStore;