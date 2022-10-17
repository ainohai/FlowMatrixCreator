import * as p5 from 'p5';
import { Subject } from 'rxjs';
import { config, StateOfArt } from './config';
import { sketch } from './p5/sketch';
import { stateHandler } from './stateHandling/stateHandler';

export enum ActionType {
    DRAW_AGENTS,
    CANCEL
}

export type UserAction = {
   action: ActionType;
   payload?: any;
}

const { BACKGROUND_COLOR } = config;

const userActions = new Subject<UserAction>();
const updateState = new Subject<number>();

//TODO: Still needs refactoring. Where should these be?
export const triggerUserActions = () => userActions;
export const triggerStateUpdate = () => updateState;

const state = stateHandler(window.innerWidth, window.innerHeight, BACKGROUND_COLOR, triggerStateUpdate());
export const stateObserver = state;

//TODO: Urgh. Fix this! 
userActions.subscribe((val) => {
    if(val.action === ActionType.DRAW_AGENTS) { 
       triggerStateUpdate().next(3);
    } else if(val.action === ActionType.CANCEL) 
       triggerStateUpdate().next(1)
    }
);


new p5(sketch, document.getElementById('p5-container'));





