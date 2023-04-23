import { combineLatest, distinctUntilChanged, map, Observable, startWith, Subscription } from "rxjs";
import { Rgb } from "../entities/entityTypes";
import { MagnetPoint } from "../entities/MagnetPoint";
import { SettingsState, StateOfArt } from "../settingTypes";
import { showAdvanced } from "../utils/parseUrl";
import { DrawingState } from "./reducers/drawingStateReducer";
import drawingStore from "./storeCreators/drawingStore";
import settingsStore from "./storeCreators/settingsStore";

export type ButtonConfs = {
    showButtons: boolean,
    showControls: boolean,
    showAdvanced: boolean
}

//Pushing 
const stateOfArtIndex$: () => Observable<number> = () => 
drawingStore().state$.pipe(
    map((state: DrawingState) => state.stateIndex),
    startWith(0),
    distinctUntilChanged());

    
const palette$: () => Observable<Rgb[]> = () => settingsStore().state$.pipe(map((state: SettingsState) => state.COLOR_PALETTE));

export function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe((value) => {nextFn(value)});
  } 

export const subscribeToPalette = (nextFn:(value: Rgb[]) => void): Subscription => {
    return onEmit<Rgb[]>(palette$(), nextFn)
}

export const subscribeToButtonConfs = (nextFn:(value: ButtonConfs) => void): Subscription => {
    return onEmit<ButtonConfs>(showButtons$(), nextFn)
}

export const subscribeToStateOfArtIndex = (nextFn:(value: number) => void): Subscription => {
    return onEmit<number>(stateOfArtIndex$(), nextFn)
}

//Pulled
const showButtons$: () => Observable<ButtonConfs> = () => settingsStore().state$.pipe(map((state: SettingsState) => ({showControls: state.SHOW_CONTROLS, showButtons: state.SHOW_BUTTONS, showAdvanced:showAdvanced()})));

export const subscribeToSettings = (nextFn:(value: SettingsState) => void): Subscription => {
    return onEmit<SettingsState>(settingsStore().state$, nextFn)
}
export const subscribeToMagnets = (nextFn:(value: MagnetPoint[]) => void): Subscription => {
    return onEmit<MagnetPoint[]>(drawingStore().state$.pipe(map((state: DrawingState) => JSON.parse(JSON.stringify(state.magnets)))), nextFn)
}


