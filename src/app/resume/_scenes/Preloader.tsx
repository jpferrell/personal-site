import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor()
    {
        super('Preloader');
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