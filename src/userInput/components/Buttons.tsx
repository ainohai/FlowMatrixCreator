import { h } from 'htm/preact';
import { StateOfArt } from '../../settingTypes';
import { DrawingActionType, DrawingState } from '../../stateHandling/reducers/drawingStateReducer';
import { UserActionState, UserActionType } from '../../stateHandling/reducers/userActionReducer';
import { Dispatch } from '../../stateHandling/store';
import { useStateOfArt } from '../hooks/useStateOfArt';
import { Button } from './Button';

type ButtonsProps = {
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

const waitingForConfirm = (state: StateOfArt) => {
    return StateOfArt.CONFIRM_DRAW === state;
}
const notRendering = (stateOfArt: StateOfArt) => {
    return stateOfArt !== StateOfArt.SETUP && stateOfArt !== StateOfArt.END && stateOfArt !== StateOfArt.CONFIRM_DRAW
}
const possiblyArtDone = (stateOfArt: StateOfArt) => {
        return stateOfArt === StateOfArt.CONFIRM_DRAW || stateOfArt === StateOfArt.END
}


export function Buttons({ }: ButtonsProps) {

    const [stateOfArt, drawingDispatch, userActionDispatch] = useStateOfArt();

    return(
        <div>
            {waitingForConfirm(stateOfArt) && <Button title={"Continue"} onClick={() => { start(drawingDispatch) }}></Button>}
            {notRendering(stateOfArt) && <Button title={"Stop"} onClick={() => { stop(drawingDispatch) }}></Button>}
            {waitingForConfirm(stateOfArt) && <Button title={"Clear screen"} onClick={() => { clear(drawingDispatch) }}></Button>}
            <Button title={"Restart"} onClick={() => { restart(drawingDispatch) }}></Button>
            {possiblyArtDone(stateOfArt) && <Button title={"Take a picture"} onClick={() => { save(userActionDispatch) }}></Button>}
        </div>
    )
}