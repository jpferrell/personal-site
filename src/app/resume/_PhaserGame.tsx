import { forwardRef, useRef } from "react";
import { EventBus } from "./_EventBus";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {

    const game = useRef<Phaser.Game | null>(null!);

    return (
        <div id="resume-phaser-game-container"></div>
    );
});

export default PhaserGame;