import { h } from 'htm/preact';
import { useSettings } from '../hooks/useSettings';
import { CreateUrl } from './CreateUrl';
import { useState } from "preact/hooks";
import { Button } from './Button';
import { SettingsState } from '../../settingTypes';
import { getInitialSettings } from '../../stateHandling/storeCreators/settingsStore';
import { config } from '../../config';

type AdvancedSettingsProps = {
};

type SettingsInputProps = { setting: SettingInput, onInput: (e, key: string) => void }

type SettingInput = { key: string, type: any, value: any }

const getNames = (settings: SettingsState): SettingInput[] => {

    const keys = Object.keys(settings);

    return keys.map(key => ({ key: key, type: typeof settings[key], value: settings[key] }))
}

function SettingInputField({ setting, onInput }: SettingsInputProps) {
    if (setting.type === "number") {
        return (
            <input style={{ width: "100px" }}
                type="number"
                value={setting.value}
                onInput={(e: any) => onInput(Number.parseFloat(e.target.value), setting.key)} >
            </input>)
    }
    else if (setting.type === "boolean") {
        return (<input style={{ width: "100px" }} type="checkbox" checked={setting.value} onInput={(e: any) => onInput(e.target.checked, setting.key)} ></input>)
    }
    else {
        return (
            <pre style={{ margin:0 }}>
                <textarea style={{ whiteSpace: "pre-wrap", margin:0 }} value={JSON.stringify(setting.value)} onInput={(e: any) => onInput(JSON.parse(e.target.value), setting.key)} ></textarea>
            </pre>
        )
    }
}

export function AdvancedSettings({ }: AdvancedSettingsProps) {

    const [settings, setSettings] = useSettings();
    const [show, setShowing] = useState(false);
    const [userSettings, setUserSettings] = useState({ ...settings });

    const toggleShow = (e) => {
        setShowing(e.target.checked)
        //setUserSettings({...settings});
    }

    const onInput = (value: any, key: string) => {
        console.log({ [key]: value })
        setUserSettings({ ...userSettings, ...{ [key]: value } })
        console.dir(userSettings)
    }

    const typedSettingsToSettingsState = (typed: string) => {
        return JSON.parse(typed) as SettingsState;
    }


    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "block" }}>
                <input
                    key="showButtons"
                    onClick={(e) => toggleShow(e)}
                    type="checkbox"
                    checked={show}
                />Show advanced
            </div>
            {show &&
                <div style={{ display: "block", backgroundColor: "white", width: "100%" }}>

                    {getNames(userSettings).map((setting: SettingInput) => {
                        return (<div>
                            <span style={{ width: "250px", display: "inline-block" }}>{setting.key}</span>
                        <SettingInputField setting={setting} onInput={onInput} />
                        <Button className={"button button-clear"} title={"Reset"} onClick={() => { onInput(settings[setting.key], setting.key) }}></Button>
                        <Button className={"button button-clear"} title={"Default"} onClick={() => { onInput(config[setting.key], setting.key) }}></Button>
                        </div>);
                    })};

                    {<div style={{ position: "fixed", left:"50%", bottom:0}}><Button title={"Save changes"} onClick={() => { setSettings(typedSettingsToSettingsState(JSON.stringify(userSettings))) }}></Button></div>}
                    <CreateUrl />
                </div>
            }
        </div>)
}

/*
<pre>
                <textarea style={{ whiteSpace: "pre-wrap", height: "200px" }} value={JSON.stringify(userSettings)} onInput={(e) => onInput(e, settingKey.name)} id="commentField"></textarea>
            </pre>
Array(12) [ "003ac9", "002379", "e6edff", "6692ff", "ff5f00", "993900", "ffefe6", "ff9f66", "ffc900", "997900", … ]
​
0: "003ac9"
​
1: "002379"
​
2: "e6edff"
​
3: "6692ff"
​
4: "ff5f00"
​
5: "993900"
​
6: "ffefe6"
​
7: "ff9f66"
​
8: "ffc900"
​
9: "997900"
​
10: "fffae6"
​
11: "ffdf66"
​
length: 12
​
<prototype>: Array []
colorUtil.ts:22:10
*/