import { Observable, Subject } from "rxjs";
import { scan } from "rxjs/operators";

//TODO: Store related types need overall fixing 

export interface State {}

export interface Action<T> {}

/**
 * Takes in action, returns the new state. 
 * @param state: current application state
 * @param action: action fired in the application
 * @returns state: the new application state
 */
export interface Reducer<T extends State> {(
    previousState: T,
    action: Action<T>,
    ) : T;
}

export type Dispatch<T> = (action: Action<T>) => void;

export interface Store<T extends State> {
    dispatch: Dispatch<T>;
    state$: Observable<T>;
    last: () => T;
}

export interface Epic<T extends State> { 
    (action$: Observable<Action<T>>,
    state$?: Observable<State>) : Observable<Action<T>>
  };

const createStore = <T>(reducer: Reducer<T>, epics?: Epic<T>): Store<T> => {
  const action$ = new Subject<Action<T>>();

  let last: T;

  // Each dispatched action will be reduced by the reducer.
  const state$ = action$.pipe(
    scan(reducer, undefined)
  )

  state$.subscribe(value => last = value);
  action$.next({type: "INIT"});

  if (!!epics) {
    epics(action$, state$).subscribe(action$);
  }

  return {
    dispatch: action$.next.bind(action$),
    state$: state$,
    last: () => last
  };
};

export default createStore;

