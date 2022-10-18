import * as p5 from 'p5';
import { Subject } from 'rxjs';
import { config, StateOfArt } from './config';
import { sketch } from './p5/sketch';
import { stateHandler } from './stateHandling/stateHandler';
import { Payload, UserAction } from './types';

export enum ActionType {
    DRAW_AGENTS,
    CANCEL
}

const { BACKGROUND_COLOR } = config;

const userActions = new Subject<UserAction>();
const updateState = new Subject<Payload>();

//TODO: Still needs refactoring. Where should these be?
export const triggerUserActions = () => userActions;
export const triggerStateUpdate = () => updateState;

const state = stateHandler(window.innerWidth, window.innerHeight, BACKGROUND_COLOR, triggerStateUpdate());
export const stateObserver = state;

//TODO: Urgh. Fix this! 
userActions.subscribe((val) => {
    if(val.action === ActionType.DRAW_AGENTS) { 
       triggerStateUpdate().next({phaseDone : true});
    } else if(val.action === ActionType.CANCEL) 
       triggerStateUpdate().next({phaseDone : false})
    }
);


new p5(sketch, document.getElementById('p5-container'));

let button = document.getElementById("button-draw")
button.addEventListener('click', (event) => {
  triggerStateUpdate().next({phaseDone : true}); 
})

let resetButton = document.getElementById("button-reset")
resetButton.addEventListener('click', (event) => {
  triggerStateUpdate().next({reset: true}); 
})



