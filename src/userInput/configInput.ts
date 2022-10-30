import * as dat from "dat.gui";
import { Subject } from "rxjs";
import { config } from "../config";
import drawingStore from "../stateHandling/storeCreators/drawingStore";
import { DrawingActionType } from "../stateHandling/reducers/drawingStateReducer";
import { SettingsActionType } from "../stateHandling/reducers/settingsReducer";
import settingsStore from "../stateHandling/storeCreators/settingsStore";
import { getScheme } from "../utils/colorUtil";
import { SettingsState } from "../settingTypes";


const createInitialUISettings = (settings: SettingsState) => {

return {
    TOTAL_BURSTS: settings.TOTAL_BURSTS,
    RANDOM_START: settings.RANDOM_START,
    BURST_SIZE: settings.BURST_SIZE,
    MIN_AGENTS: settings.MIN_AGENTS,
    NUM_OF_MAGNETS: settings.NUM_OF_MAGNETS,
    MAGNET_STRENGTH_MAX: settings.MAGNET_STRENGTH_MAX,
    //Multiplier constant. Similar to G in gravity calculations.
    FORCE_MULTIPLIER: settings.FORCE_MULTIPLIER,

    MAX_STROKE: settings.MAX_STROKE,
    DEFAULT_LIFESPAN: settings.DEFAULT_LIFESPAN,
    MAXIMUM_VELOCITY: settings.MAXIMUM_VELOCITY,
    MAXIMUM_ACC: settings.MAXIMUM_ACC,
    ADD_TO_OLD_VELOCITY: settings.ADD_TO_OLD_VELOCITY,
    FRICTION_MULTIPLIER: settings.FRICTION_MULTIPLIER,

    COLOR_PALETTE: [...settings.COLOR_PALETTE],
    BACKGROUND_COLOR: settings.BACKGROUND_COLOR,
    FADING: settings.FADING
  }
}

//Local state of setting controllers for dat.gui
let UIsettings;

const paletteUpdateObj = {
    RELOAD_PALETTE: function () {
        let scheme = getScheme();
        UIsettings.COLOR_PALETTE = scheme;
        settingsStore().dispatch(
            {
                type: SettingsActionType.VALUE_CHANGE,
                payload: { change: {COLOR_PALETTE: scheme} }
            })
        }
};

const addListener = (guiC: dat.GUIController, key: string) => {
    return guiC.onFinishChange((value: any) => {
        console.log(value); 
        settingsStore().dispatch(
        {
            type: SettingsActionType.VALUE_CHANGE,
            payload: { change: {[key]: value}}
        })
    })
}

const handles: [string, number, number, number?][] = [
    ["DEFAULT_LIFESPAN", 1, 150, 1],
    ["MAXIMUM_VELOCITY", 0.001, 300],
    ["MAXIMUM_ACC", 0.001, 10],
    ["MAX_STROKE", 1, 50],
    ["BURST_SIZE", 1, 1000],
    ["TOTAL_BURSTS", 1, 2000,1],
    ["MIN_AGENTS", 1, 300, 1],
    ["FADING", 0.001, 100],
    ["NUM_OF_MAGNETS", 1, 20, 1]
]

const controllers: {[key:string]: dat.GUIController} = {};

export const addConfigInputs = function (initialSettings: SettingsState) {

    UIsettings = createInitialUISettings(initialSettings); 

    //TODO:FIX UGLINESS!! 
    let gui = new dat.GUI();
    for (let sets of handles) {
        const [key, min, max, step] = sets;
        const guiC = gui.add(UIsettings, key, min, max, step)
        addListener(guiC, key);
        controllers[key] = guiC;
    }
    const randomGui = gui.add(UIsettings, "RANDOM_START", true);
    addListener(randomGui, "RANDOM_START");
    controllers["RANDOM_START"] = randomGui;

   const paletteGui =gui.add(paletteUpdateObj,'RELOAD_PALETTE');
   controllers['RELOAD_PALETTE'] = paletteGui; 

    gui.close(); // start the sketch with the GUI closed 
}
