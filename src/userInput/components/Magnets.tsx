import { Component, h } from 'htm/preact';
import { Fragment } from 'preact';
import drawingStore from '../../stateHandling/storeCreators/drawingStore';
import { useMagnets } from '../hooks/useMagnets';

type MagnetsProps = {
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

export function Magnets({ }: MagnetsProps) {


    const [state, setState] = useMagnets();

    const showMagnets = (showMagnets: boolean) => {
        setState({
            ...state, ...{
                showMagnets: showMagnets,
                showButton: !showMagnets
            }
        })
        setTimeout(() => {
            setState({
                ...state, ...{
                    showMagnets: !showMagnets,
                    showButton: showMagnets
                }
            })
        }, 10 * 1000)
    }

    return (
        <>
            {state.showButton &&
                    <button
                        className={"button-small"}
                        onClick={() => showMagnets(true)}>
                        Show magnets
                    </button>
                }
            {state.showMagnets &&
                <div style={{ pointerEvents: "none", display: "block", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                    {state.magnets?.length && (state.magnets.map(magnet =>
                        <Magnet x={magnet.locationX} y={magnet.locationY} strength={Math.abs(magnet.strength)} color={magnet.strength > 0 ? "red" : "blue"} />
                    ))}
                </div>
            }
        </>
    )
}