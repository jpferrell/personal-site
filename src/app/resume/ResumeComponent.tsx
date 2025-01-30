import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./_PhaserGame";

export default function ResumeComponent() {

    const phaserRef = useRef<IRefPhaserGame | null>(null);

    return (
        <div id="resume-component-container">
            <PhaserGame ref={phaserRef}/>
        </div>
    )
}