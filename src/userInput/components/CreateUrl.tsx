import { Component, h } from 'htm/preact';
import { SettingsState, StateOfArt } from '../../settingTypes';
import { DrawingActionType, DrawingState } from '../../stateHandling/reducers/drawingStateReducer';
import { UserActionState, UserActionType } from '../../stateHandling/reducers/userActionReducer';
import { Dispatch } from '../../stateHandling/store';
import settingsStore from '../../stateHandling/storeCreators/settingsStore';
import { unidecode, uniencode } from '../../utils/parseUrl';
import { Button } from './Button';


type CreateUrlProps = {

};

type CreateUrlState = {
    urlCreated: string;
    showButtons: boolean;
    showConfigs: boolean;
};

export class CreateUrl extends Component<CreateUrlProps, CreateUrlState> {
    constructor(props: CreateUrlProps) {
        super(props);

    }
    componentDidMount(): void {
        this.setState({
            urlCreated: "",
            showButtons: false,
            showConfigs: false
        });
    }
    createHashUrl() {
        const state: SettingsState = { ...settingsStore.last(), ...{ SHOW_BUTTONS: this.state.showButtons, SHOW_CONTROLS: this.state.showConfigs } }
        const encodedState = uniencode(state)
        let url = location.host;
        this.setState({
            urlCreated: `${url}?settings=${encodedState}`
        })
        setTimeout(() => {
            this.setState({
                urlCreated: ""
            })
        }, 60 * 1000)
    }
    toggleShowButtons(e) {
        this.setState({
            showButtons: e.target
        })
    }
    toggleShowConfigs(e) {
        this.setState({
            showConfigs: e.target
        })

    }


    render() {
        return (
            <div style={{ display:"block"}}>
                {this.state.urlCreated &&
                    <input key="urlHash"
                        style={{ color: "white", width: 200 }}
                        value={this.state.urlCreated} />}
                <div style={{ display:"block"}}>
                    <input
                        key="showButtons"
                        onClick={(e) => this.toggleShowButtons(e)}
                        type="checkbox"
                    />Show buttons in url
                </div>
                <div style={{ display:"block"}}>    
                    <input
                        key="showConfigs"
                        onClick={(e) => this.toggleShowConfigs(e)}
                        type="checkbox" />
                    Show configs in url
                    </div>
                    <div style={{ display:"block"}}>
                    <button
                        className={"button-small"}
                        onClick={() => this.createHashUrl()}>
                        Create url
                    </button>

                </div>

            </div>
        )
    }
}