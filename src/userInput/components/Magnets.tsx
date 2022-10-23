import { Component, h } from 'htm/preact';
import { MagnetPoint } from '../../entities/MagnetPoint';
import { StateOfArt } from '../../settingTypes';
import { DrawingActionType, DrawingState } from '../../stateHandling/reducers/drawingStateReducer';
import { UserActionState, UserActionType } from '../../stateHandling/reducers/userActionReducer';
import { Dispatch } from '../../stateHandling/store';
import drawingStore from '../../stateHandling/storeCreators/drawingStore';

type MagnetsProps = {
};

type MagnetsState = {
    showMagnets: boolean,
    showButton: boolean
};

type MagnetProps = {
    x: number;
    y: number;
    strength: number;
    color: string;
};

export function Magnet({ x, y, strength, color }: MagnetProps) {
    return (
        <div>
            <div style={{ position: "absolute", top: y - strength / 2, left: x - strength / 2, display: "inline-block", width: strength, height: strength, borderRadius: "50%", backgroundColor: color }} />
            <span style={{ position: "absolute", top: y, left: x }}>x: {x}, y: {y}, strength: {strength}</span>
        </div>
    );
}


export class Magnets extends Component<MagnetsProps, MagnetsState> {
    constructor(props: MagnetsProps) {
        super(props);

    }
    componentDidMount(): void {
        this.setState({
            showMagnets: false,
            showButton: true
        });
    }
    showMagnets(showMagnets: boolean) {
        this.setState({
            showMagnets: showMagnets,
            showButton: !showMagnets
        })
        setTimeout(() => {
            this.setState({
                showMagnets: !showMagnets,
                showButton: showMagnets
            })
        }, 10 * 1000)
    }

    render() {
        return (
            <div>
                {this.state.showButton &&
                    <div>
                        <button
                            className={"button-small"}
                            onClick={() => this.showMagnets(true)}>
                            Show magnets
                        </button>
                    </div >}
                {this.state.showMagnets &&
                    <div style={{ pointerEvents: "none", display: "block", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                        <span>Showing!</span>
                        {drawingStore.last().magnets?.length && (drawingStore.last().magnets.map(magnet =>
                            <Magnet x={magnet.locationX} y={magnet.locationY} strength={Math.abs(magnet.strength)} color={magnet.strength > 0 ? "red" : "blue"} />
                        ))}
                    </div>
                }
            </div>
        )
    }
}