import * as dat from "dat.gui";
import { Subject } from "rxjs";
import { config } from "../config";
import { getScheme } from "../utils/colorUtil";


const { TOTAL_BURSTS,
    BURST_SIZE,
    OFFSET,
    MIN_AGENTS,
    RANDOM_START, GRID_SIZE, //px
    HELPER_GRID_SIZE, //px

    NUM_OF_MAGNETS,
    MAGNET_STRENGTH_MAX,
    //Multiplier constant. Similar to G in gravity calculations..
    FORCE_MULTIPLIER,

    MAX_STROKE,
    DEFAULT_LIFESPAN,
    MAXIMUM_VELOCITY,
    MAXIMUM_ACC,
    ADD_TO_OLD_VELOCITY,
    FRICTION_MULTIPLIER,

    COLOR_PALETTE,
    BACKGROUND_COLOR,
    FADING } = config;

export const settings = {
    TOTAL_BURSTS: TOTAL_BURSTS,
    RANDOM_START: RANDOM_START,
    BURST_SIZE: BURST_SIZE,
    MIN_AGENTS: MIN_AGENTS,
    NUM_OF_MAGNETS: NUM_OF_MAGNETS,
    MAGNET_STRENGTH_MAX: MAGNET_STRENGTH_MAX,
    //Multiplier constant. Similar to G in gravity calculations.
    FORCE_MULTIPLIER: FORCE_MULTIPLIER,

    MAX_STROKE: MAX_STROKE,
    DEFAULT_LIFESPAN: DEFAULT_LIFESPAN,
    MAXIMUM_VELOCITY: MAXIMUM_VELOCITY,
    MAXIMUM_ACC: MAXIMUM_ACC,
    ADD_TO_OLD_VELOCITY: ADD_TO_OLD_VELOCITY,
    FRICTION_MULTIPLIER: FRICTION_MULTIPLIER,

    COLOR_PALETTE: COLOR_PALETTE,
    BACKGROUND_COLOR: BACKGROUND_COLOR,
    FADING: FADING
}
/*
let userActions: Subject<UserAction>;

const paletteUpdateObj = {
    RELOAD_PALETTE: function () {
        let scheme = getScheme();
        settings.COLOR_PALETTE = scheme;
        userActions.next(
            {
                action: ActionType.VALUE_CHANGE,
                payload: { name: COLOR_PALETTE, value: scheme }
            })
        }
};

const addListener = (guiC: dat.GUIController) => {
    return guiC.onFinishChange((value: any) => {console.log(value); userActions.next(
        {
            action: ActionType.VALUE_CHANGE,
            payload: { name: guiC.name, value: value, settings: {...settings} }
        })})
}

const handles: [string, number, number, number?][] = [
    ["DEFAULT_LIFESPAN", 1, 150, 1],
    ["MAXIMUM_VELOCITY", 0.001, 300],
    ["MAXIMUM_ACC", 0.001, 10],
    ["MAX_STROKE", 1, 50],
    ["BURST_SIZE", 1, 100],
    ["TOTAL_BURSTS", 1, 2000,1],
    ["MIN_AGENTS", 1, 300, 1],
    ["FADING", 0.001, 100],
    ["NUM_OF_MAGNETS", 1, 20, 1]
]

export const configInputs = function (userActions: Subject<UserAction>) {
    //TODO:FIX!!
    userActions = userActions;

    let gui = new dat.GUI();
    for (let sets of handles) {
        const [key, min, max, step] = sets;
        const guiC = gui.add(settings, key, min, max, step)
        addListener(guiC);
    }
    addListener(gui.add(settings, "RANDOM_START", true));
   gui.add(paletteUpdateObj,'RELOAD_PALETTE');


    gui.close(); // start the sketch with the GUI closed 
}*/ 
