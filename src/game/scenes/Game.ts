import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    mainChar: Phaser.GameObjects.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor ()
    {
        super('Game');
    }

    preload() {
        this.load.spritesheet('jack', 'assets/spr_ardley.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('test-tiles', 'assets/topDown_baseTiles.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/testMap.json');
    }

    create (posX: number=400, posY: number=400)
    {
        //super.create();
        const map = this.make.tilemap({key: 'tilemap'});
        const tileset: Phaser.Tilemaps.Tileset | null = map.addTilesetImage('test-tiles', 'test-tiles');
        let groundLayer: Phaser.Tilemaps.TilemapLayer | null;
        let pathLayer: Phaser.Tilemaps.TilemapLayer | null;
        let treeLayer: Phaser.Tilemaps.TilemapLayer | null;
        let buildingLayer: Phaser.Tilemaps.TilemapLayer | null;
        let buildingExtLayer: Phaser.Tilemaps.TilemapLayer | null;
        if (tileset) {
            groundLayer = map.createLayer('ground', tileset, 0, 0);
            pathLayer = map.createLayer('path', tileset, 0, 0);
            treeLayer = map.createLayer('trees', tileset, 0, 0);
            buildingLayer = map.createLayer('building', tileset, 0, 0);
            buildingExtLayer = map.createLayer('buildingExtras', tileset, 0, 0);
            if (groundLayer) groundLayer.setDepth(-1);
            if (pathLayer) pathLayer.setDepth(-1);
            if (buildingLayer) buildingLayer.setDepth(2);
            if (treeLayer) treeLayer.setDepth(3);
            if (buildingExtLayer) buildingExtLayer.setDepth(4);
        }

        this.mainChar = this.physics.add.sprite(100, 100, 'jack');
        this.mainChar.setCollideWorldBounds(true);
        this.mainChar.setDepth(1);

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('jack', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('jack', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('jack', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('jack', {start: 12, end: 15}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'jack', frame: 0}],
            frameRate: 20
        });

        this.cursors = this.input.keyboard!.createCursorKeys();

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if(this.cursors.left.isDown) {
            this.mainChar.anims.play('left', true);
            this.mainChar.setVelocityX(-100);
            this.mainChar.setVelocityY(0);
        } else if (this.cursors.right.isDown) {
            this.mainChar.anims.play('right', true);
            this.mainChar.setVelocityX(100);
            this.mainChar.setVelocityY(0);
        } else if (this.cursors.up.isDown) {
            this.mainChar.anims.play('up', true);
            this.mainChar.setVelocityX(0);
            this.mainChar.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.mainChar.anims.play('down', true);
            this.mainChar.setVelocityX(0);
            this.mainChar.setVelocityY(100);
        } else {
            this.mainChar.setVelocityX(0);
            this.mainChar.setVelocityY(0);
            this.mainChar.anims.play('turn', true);
        }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
