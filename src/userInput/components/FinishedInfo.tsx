import { h } from "preact"
import { StateOfArt } from "../../settingTypes"

type FinishedInfoProps = {
    stateOfArt: StateOfArt
}

export function FinishedInfo({ stateOfArt }: FinishedInfoProps) {

    return (
        <div>
            {stateOfArt === StateOfArt.END &&
                <span style={{ padding: "8px", backgroundColor: "white" }}>Finished drawing!</span>}
        </div>
    )

}