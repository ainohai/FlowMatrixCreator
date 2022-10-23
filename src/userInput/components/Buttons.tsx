import { h } from 'htm/preact';
import { StateOfArt } from '../../settingTypes';
import { DrawingActionType, DrawingState } from '../../stateHandling/reducers/drawingStateReducer';
import { UserActionState, UserActionType } from '../../stateHandling/reducers/userActionReducer';
import { Dispatch } from '../../stateHandling/store';
import { Button } from './Button';

type ButtonsProps = {
  stateOfArt: StateOfArt;
  dispatch: Dispatch<DrawingState>;
  userActionDispatch: Dispatch<UserActionState>;
};

const start = (dispatch: Dispatch<DrawingState>) => {
    dispatch({type: DrawingActionType.JUMP_TO_INDEX, payload: {jumpToStage: StateOfArt.DRAW_AGENTS}})
}

const stop = (dispatch: Dispatch<DrawingState>) => {
    dispatch({type: DrawingActionType.JUMP_TO_INDEX, payload: {jumpToStage: StateOfArt.CONFIRM_DRAW}})
}

const clear = (dispatch: Dispatch<DrawingState>) => {
    dispatch({type: DrawingActionType.JUMP_TO_INDEX, payload: {jumpToStage: StateOfArt.CLEAR_SCREEN}})
}

const restart = (dispatch: Dispatch<DrawingState>) => {
    dispatch({type: DrawingActionType.JUMP_TO_INDEX, payload: {jumpToStage: StateOfArt.RESET}})
}

const save = (userActionDispatch: Dispatch<UserActionState>) => {
    userActionDispatch({type: UserActionType.SAVE})
}


export function Buttons({ stateOfArt, dispatch, userActionDispatch }: ButtonsProps) {
    return(
        <div>
            {stateOfArt === StateOfArt.CONFIRM_DRAW && <Button title={"Continue"} onClick={() => { start(dispatch) }}></Button>}
            {(stateOfArt !== StateOfArt.SETUP && stateOfArt !== StateOfArt.END && stateOfArt !== StateOfArt.CONFIRM_DRAW) && <Button title={"Stop"} onClick={() => { stop(dispatch) }}></Button>}
            {(stateOfArt === StateOfArt.CONFIRM_DRAW) && <Button title={"Clear screen"} onClick={() => { clear(dispatch) }}></Button>}
            <Button title={"Restart"} onClick={() => { restart(dispatch) }}></Button>
            {(stateOfArt === StateOfArt.CONFIRM_DRAW || stateOfArt === StateOfArt.END) && <Button title={"Take a picture"} onClick={() => { save(userActionDispatch) }}></Button>}
        </div>
    )
}