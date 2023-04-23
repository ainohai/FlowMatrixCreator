import { h } from 'htm/preact';
import { uniencode } from '../../utils/parseUrl';
import { useCreateUrl } from '../hooks/useCreateUrl';


type CreateUrlProps = {
};

export function CreateUrl({ }: CreateUrlProps) {

    const [state, setState] = useCreateUrl();

    const combinedSettings = () => {
        return {
            ...state.settings,
            ...{
                SHOW_BUTTONS: state.showButtons,
                SHOW_CONTROLS: state.showConfigs,
            }
        }
    }

    const createHashUrl = () => {
        const encodedState = uniencode(combinedSettings())
        let url = location.host;

        setState({
            ...state, ...{
                urlCreated: `http://${url}?settings=${encodedState}`
            }
        })
        setTimeout(() => {
            setState({
                ...state,
                ...{ urlCreated: "" }
            })
        }, 30 * 1000)
    }
    const toggleShowButtons = (e) => {
        setState({
            ...state, ...{
                showButtons: e.target.checked
            }
        })
    }
    const toggleShowConfigs = (e) => {
        setState({
            ...state, ...{ showConfigs: e.target.checked }
        })

    }
    const toggleShowAdvanced = (e) => {
        setState({
            ...state, ...{ showAdvanced: e.target.checked }
        })
    }
    

    return (
        <div style={{ display: "block" }}>
            {state.urlCreated &&
                <div>
                    <div>
                        <input key="urlHash"
                            style={{ width: 200 }}
                            value={state.urlCreated} />
                    </div>
                    <div>
                        <a target="_blank" href={state.urlCreated}>Link</a>
                        <button
                            className={"button-small button button-clear"}
                            onClick={() => alert(JSON.stringify(combinedSettings()))}>
                            JSON
                        </button>
                    </div>
                </div>}
            <div style={{ display: "block" }}>
                <input
                    key="showButtons"
                    onClick={(e) => toggleShowButtons(e)}
                    type="checkbox"
                    checked={state.showButtons}
                />Show buttons in url
            </div>
            <div style={{ display: "block" }}>
                <input
                    key="showConfigs"
                    onClick={(e) => toggleShowConfigs(e)}
                    type="checkbox"
                    checked={state.showConfigs}
                />
                Show configs in url
            </div>
            <div style={{ display: "block" }}>
                <button
                    className={"button-small"}
                    onClick={() => createHashUrl()}>
                    Create url
                </button>

            </div>

        </div>
    )

}