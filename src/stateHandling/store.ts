import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { scan, startWith } from "rxjs/operators";
import { UserActionType } from "./reducers/settingsReducer";

export interface State {}

export interface Action {}

export interface Reducer {(
    previousState: State,
    action: Action,
    ) : State;
}

export type Dispatch = (action: Action) => void;

export interface Store {
    dispatch: Dispatch;
    state$: Observable<State>;
    }

export interface Epic { 
    (action$: Observable<Action>,
    state$?: Observable<State>) : Observable<Action>
  };

const createStore = (reducer: Reducer, epics?: Epic): Store => {
  const action$ = new Subject<Action>();

  let last: State = {};

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
    state$: state$
  };
};

export default createStore;

