/*import { Subject } from "rxjs";
import { html, render } from 'htm/preact';
import { Payload } from "../stateHandling/reducers/drawingStateReducer";


export const controlButtons = function (triggerStateUpdate: Subject<Payload>) {


    render(html`<a href="/">Hello!</a>`, document.body);
    let button = document.getElementById("button-draw")
    button.addEventListener('click', (event) => {
      triggerStateUpdate.next({phaseDone : true}); 
    })
    
    let resetButton = document.getElementById("button-reset")
    resetButton.addEventListener('click', (event) => {
      triggerStateUpdate.next({action: "reset"}); 
    })

    let stopButton = document.getElementById("button-stop")
    stopButton.addEventListener('click', (event) => {
      triggerStateUpdate.next({action: "stop"}); 
    })
}
*/
export default {}