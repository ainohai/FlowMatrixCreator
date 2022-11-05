import { combineLatest, map, Observable, Subscription } from "rxjs";
import { render, h } from 'htm/preact';
import { DrawingState } from "../stateHandling/reducers/drawingStateReducer";
import { Component } from "preact";
import { SettingsState, StateOfArt } from "../settingTypes";
import { Dispatch } from "../stateHandling/store";
import { Palette } from "./components/Palette";
import { Rgb } from "../entities/entityTypes";
import { Buttons } from "./components/Buttons";
import { UserActionState } from "../stateHandling/reducers/userActionReducer";
import settingsStore from "../stateHandling/storeCreators/settingsStore";
import { CreateUrl } from "./components/CreateUrl";
import { FinishedInfo } from "./components/FinishedInfo";
import { Magnets } from "./components/Magnets";
import { usePalette } from "./hooks/usePalette";
import { useStateOfArt } from "./hooks/useStateOfArt";
import { useButtonConfig } from "./hooks/useButtonConfig";
import { AdvancedSettings } from "./components/AdvancedSettings";


// Types for props
type ControlProps = {
};


function ControlButtons ({}: ControlProps) {
 
  const [palette] = usePalette();
  const [stateOfArt] = useStateOfArt();
  const [buttonConfig] = useButtonConfig();

    return (
      <div style={{ position: "relative" }}>
        <div>
        <Palette palette={palette} />
        <Buttons  />
        {buttonConfig.showControls && 
          <Magnets/>
          }
        </div>
        <FinishedInfo stateOfArt={stateOfArt}/>
        {buttonConfig.showAdvanced && 
        <AdvancedSettings/>
        }
      </div>
    );
}

const createControlButtons = () => {
  //TODO:Clean up
  let buttons = function () {
    return (
    <ControlButtons />
    )
  }
  render(buttons(), document.getElementById("user-controls"));
}

export default createControlButtons;
