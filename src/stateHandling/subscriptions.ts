import { combineLatest, map, Observable, Subscription } from "rxjs";
import { Rgb } from "../entities/entityTypes";
import { MagnetPoint } from "../entities/MagnetPoint";
import { SettingsState, StateOfArt } from "../settingTypes";
import { DrawingState } from "./reducers/drawingStateReducer";
import drawingStore from "./storeCreators/drawingStore";
import settingsStore from "./storeCreators/settingsStore";

export type ButtonConfs = {
    showButtons: boolean,
    showControls: boolean
}

//Todo: Performance improvements. This is doing quite a lot of extra unneeded stuff. Check also preact rendering as it can be reduced. 
const stateOfArtIndex$: () => Observable<number> = () => drawingStore().state$.pipe(map((state: DrawingState) => state.stateIndex));
const usedStates$: () => Observable<StateOfArt[]> = () => settingsStore().state$.pipe(map((state: SettingsState) => state.USED_STATES));
const palette$: () => Observable<Rgb[]> = () => settingsStore().state$.pipe(map((state: SettingsState) => state.COLOR_PALETTE));
const showButtons$: () => Observable<ButtonConfs> = () => settingsStore().state$.pipe(map((state: SettingsState) => ({showControls: state.SHOW_CONTROLS, showButtons: state.SHOW_BUTTONS})));

export function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe((value) => {nextFn(value)});
  } 

export const subscribeToSettings = (nextFn:(value: SettingsState) => void): Subscription => {
    return onEmit<SettingsState>(settingsStore().state$, nextFn)
}

export const subscribeToPalette = (nextFn:(value: Rgb[]) => void): Subscription => {
    return onEmit<Rgb[]>(palette$(), nextFn)
}

export const subscribeToButtonConfs = (nextFn:(value: ButtonConfs) => void): Subscription => {
    return onEmit<ButtonConfs>(showButtons$(), nextFn)
}


export const subscribeToDrawingState = (nextFn:(value: DrawingState) => void): Subscription => {
    return onEmit<DrawingState>(drawingStore().state$, nextFn)
}

export const subscribeToMagnets = (nextFn:(value: MagnetPoint[]) => void): Subscription => {
    return onEmit<MagnetPoint[]>(drawingStore().state$.pipe(map((state: DrawingState) => JSON.parse(JSON.stringify(state.magnets)))), nextFn)
}

export const subscribeToStateOfArtIndex = (nextFn:(value: number) => void): Subscription => {
    return onEmit<number>(stateOfArtIndex$(), nextFn)
}

export const subscribeUsedStateOfArt = (nextFn:(value: StateOfArt[]) => void): Subscription => {
    return onEmit<StateOfArt[]>(usedStates$(), nextFn)
}
