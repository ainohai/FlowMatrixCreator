import { saveCanvas } from "../epics/saveImage";
import userActionReducer, { UserActionState } from "../reducers/userActionReducer";
import createStore, { Epic } from "../store";

//Just one epic for now
const epics: Epic<UserActionState> = saveCanvas;

const userActionStore = createStore(userActionReducer, epics);
export default userActionStore;