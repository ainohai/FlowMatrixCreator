import { BehaviorSubject, concatAll, map, Observable, pairwise, tap } from "rxjs";
import { Comparator, Recipe, Trigger } from "../../settingTypes";
import { DrawingAction, successDrawingAction } from "../actionCreators/DrawingActions";
import { DrawingState } from "../reducers/drawingStateReducer";
import { Epic } from "../store";
import settingsStore, { getInitialSettings, getRecipes } from "../storeCreators/settingsStore";

const triggerApplies = (trigger: Trigger, prev: DrawingState, drawingState: DrawingState): boolean => {

  if (trigger.comparator === Comparator.EQUALS) {
    return drawingState[trigger.drawingKey] === trigger.value;
  }
  else if (trigger.comparator === Comparator.GREATER_THAN) {
    return drawingState[trigger.drawingKey] > trigger.value;
  }
  else if (trigger.comparator === Comparator.LESS_THAN) {
    return drawingState[trigger.drawingKey] < trigger.value;
  }
  else if (trigger.comparator === Comparator.CHANGED) {

    return prev[trigger.drawingKey] !== drawingState[trigger.drawingKey] && drawingState[trigger.drawingKey] === trigger.value;
  }
  return false;
}

const getAppliedRecipes = (prev: DrawingState, current: DrawingState): Recipe[] => {
  const recipes = getRecipes();

  const appliedRecipes = [];

  recipes.forEach(recipe => {
    const applyingTriggers = recipe.triggers.filter(trigger => triggerApplies(trigger, prev, current));
    if (applyingTriggers.length === recipe.triggers.length) {
      appliedRecipes.push(recipe);
    }
  })
  return appliedRecipes;
}

/**
 * If trigger matches to current state, dispatches an action to change the settings state.   
 * @param action$ 
 * @param state$ 
 * @returns 
 */
export const triggerRecipes: Epic<DrawingState> =
  (action$: Observable<DrawingAction>,
    state$?: Observable<DrawingState>): Observable<DrawingAction> => {

    const settingsSubject = new BehaviorSubject(getInitialSettings());
    settingsStore().state$.subscribe(settingsSubject);

    return state$.pipe(
      map((f) => ({...f})),//solve why this is needed, immutables?
      pairwise(),
      map(([prev, current]) => getAppliedRecipes(prev, current)),
      concatAll(),
      tap((recipe: Recipe) => settingsStore().dispatch(recipe.action))
    ).pipe(map(() => { return successDrawingAction() }));
  }
