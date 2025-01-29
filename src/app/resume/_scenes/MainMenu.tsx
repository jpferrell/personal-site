import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor()
    {
        super('MainMenu');
    }

    preload()
    {
        //t
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}