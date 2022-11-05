import * as dat from "dat.gui";
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
    MAGNET_FORCE_MULTIPLIER: settings.MAGNET_FORCE_MULTIPLIER,

    MAX_STROKE: settings.MAX_STROKE,
    DEFAULT_LIFESPAN: settings.DEFAULT_LIFESPAN,
    MAXIMUM_VELOCITY: settings.MAXIMUM_VELOCITY,
    MAXIMUM_ACC: settings.MAXIMUM_ACC,
    ADD_TO_OLD_VELOCITY: settings.ADD_TO_OLD_VELOCITY,
    VELOCITY_MULTIPLIER: settings.VELOCITY_MULTIPLIER,

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


const controllers: {[key:string]: dat.GUIController} = {};

export const addConfigInputs = function (initialSettings: SettingsState) {

    UIsettings = createInitialUISettings(initialSettings); 

    //TODO:FIX UGLINESS!! 
    let gui = new dat.GUI();
    for (let sets of initialSettings.UI_CONFIGS) {
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
