import { combineLatest, distinctUntilChanged, map, Observable, Subject, Subscription } from "rxjs";
import { render, h } from 'htm/preact';
import { DrawingState } from "../stateHandling/reducers/drawingStateReducer";
import { Component } from "preact";
import { SettingsState, StateOfArt } from "../settingTypes";
import { Dispatch, State, Store } from "../stateHandling/store";
import { Palette } from "./components/Palette";
import { Rgb } from "../entities/entityTypes";
import { Buttons } from "./components/Buttons";
import { UserActionState } from "../stateHandling/reducers/userActionReducer";
import { MagnetPoint } from "../entities/MagnetPoint";
import { Magnets } from "./components/Magnets";
import settingsStore from "../stateHandling/storeCreators/settingsStore";
import { CreateUrl } from "./components/CreateUrl";


// Types for props
type ControlProps = {
  settings$: Observable<SettingsState>;
  drawing$: Observable<DrawingState>;
  initialSettings: SettingsState;
  drawSettings: DrawingState;
  drawingDispatch: Dispatch<DrawingState>;
  userActionDispatch: Dispatch<UserActionState>;
};

type ControlState = {
  drawingSub: Subscription;
  settingsSub: Subscription;
  palette: Rgb[];
  usedStates: StateOfArt[];
  stateIndex: number;
};

class ControlButtons extends Component<ControlProps, ControlState> {
  constructor(props: ControlProps) {
    super(props);
    this.state = {
      palette: this.props.initialSettings.COLOR_PALETTE,
      drawingSub: undefined, settingsSub: undefined, usedStates: this.props.initialSettings.USED_STATES, stateIndex: 0,
    };
  }

  componentDidMount(): void {
    console.log("subs")
    let drawingSub = combineLatest([
      this.props.drawing$.pipe(map((state: DrawingState) => state.stateIndex)), //, distinctUntilChanged()),
      this.props.drawing$.pipe(map((state: DrawingState) => state.magnets))])//, distinctUntilChanged()))//Possibly always distinct as an object 
      .subscribe(
        (state) => {
          this.setState({ stateIndex: state[0] })
        });
    let settingsSub = this.props.settings$.subscribe(
      (settings) => {
        this.setState({ palette: settings.COLOR_PALETTE, usedStates: settings.USED_STATES });
      }
    )
    this.setState({ drawingSub: drawingSub, settingsSub: settingsSub });
  }

  componentWillUnmount(): void {
    this.state.drawingSub.unsubscribe();
    this.state.settingsSub.unsubscribe();
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Palette palette={this.state.palette} />
        <Buttons stateOfArt={this.state.usedStates[this.state.stateIndex]}
          dispatch={this.props.drawingDispatch}
          userActionDispatch={this.props.userActionDispatch} />
        {settingsStore.last().SHOW_CONTROLS && <div><Magnets/><CreateUrl/></div>}
        {(this.state.usedStates[this.state.stateIndex] === StateOfArt.END) && <span style={{padding: "8px", backgroundColor: "white"}}>Finished drawing!</span>}
      </div>
    );
  }
}

const createControlButtons = (drawingStore: Store<DrawingState>, settingsStore: Store<SettingsState>, userStore: Store<UserActionState>) => {
  //TODO:Clean up
  let buttons = function () {
    return (<ControlButtons drawing$={drawingStore.state$}
      settings$={settingsStore.state$}
      initialSettings={settingsStore.last()}
      drawSettings={drawingStore.last()}
      drawingDispatch={drawingStore.dispatch}
      userActionDispatch={userStore.dispatch}
    />
    )
  }
  render(buttons(), document.getElementById("user-controls"));
}

export default createControlButtons;
