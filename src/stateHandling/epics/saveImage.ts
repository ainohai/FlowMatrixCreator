/*global browser*/
import { filter, map, Observable, of, tap } from "rxjs"
import { UserAction, UserActionState, UserActionType } from "../reducers/userActionReducer"
import { Epic, State } from "../store"

const _isSafari = function() {
    const x = Object.prototype.toString.call(window.HTMLElement);
    return x.indexOf('Constructor') > 0;
  };

//TODO: Not handling errors in any way 
export const save = () => {
    console.log("in save")
    const canvas = document.getElementById('p5-container').getElementsByTagName('canvas')[0]
    const dataURL = canvas.toDataURL();
    
    
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = "myCanvas";

  // Firefox requires the link to be added to the DOM before click()
  a.onclick = e => {
    document.body.removeChild(e.target as Node);
    e.stopPropagation();
  };

  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();
}

export const saveCanvas: Epic<UserActionState> =
    (action$: Observable<UserAction>,
    state$?: Observable<UserActionState>) : Observable<UserAction> => {

  return action$.pipe(
    filter((action) => action.type === UserActionType.SAVE),
    tap(() => save()))
    .pipe(map(() => {return {type: UserActionType.SUCCESS}}));
  }