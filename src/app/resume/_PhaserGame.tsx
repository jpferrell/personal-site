import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { EventBus } from "./_EventBus";
import StartGame from "./_GameConfig";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {

    const game = useRef<Phaser.Game | null>(null!);
    console.log("in phaser game...");
    console.log(game);
    console.log(ref);

    useLayoutEffect(() => {

        if (game.current === null) {
            console.log("in game.current === null");
            game.current = StartGame("resume-phaser-game-container");

            if (ref !== null) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        }

    }, [ref]);

    useEffect(() => {

        EventBus.on('current-scene-ready', (currentScene) => {
            if (currentActiveScene instanceof Function) {
                currentActiveScene(currentScene);
            }
            ref.current.scene = currentScene;
        });

        return () => {
            EventBus.removeListener('current-scene-ready');
        }

    }, [currentActiveScene, ref]);

    return (
        <div id="resume-phaser-game-container"></div>
    );
});

export default PhaserGame;