import { useRef } from "react";
import { IRefPhaserGame } from "./_PhaserGame";
import PhaserGame from "./_PhaserGame";

export default function ResumeComponent() {

    const phaserRef = useRef<IRefPhaserGame | null>(null);

    return (
        <div id="resume-component-container">
            <PhaserGame ref={phaserRef}/>
        </div>
    )
}