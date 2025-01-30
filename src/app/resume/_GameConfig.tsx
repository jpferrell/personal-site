import { Boot } from "./_scenes/Boot";
import { AUTO, Game } from "phaser"

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'resume-phaser-game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot
    ]
};

const StartGame = (parent: string) => {

    console.log("starting game...");

    return new Game({ ...config, parent });

}

export default StartGame;