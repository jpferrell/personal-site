import { EventBus } from "../EventBus";
import { Scene, Tilemaps } from "phaser";

export class JackScene extends Scene {

    mainChar: Phaser.GameObjects.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(config: Phaser.Types.Scenes.SettingsConfig)
    {
        super(config);
    }

    preload() {
        this.load.spritesheet('jack', 'assets/spr_ardley.png', {frameWidth: 16, frameHeight: 32});
    }

    create(posX=400, posY=400) {
        this.mainChar = this.physics.add.sprite(posX, posY, 'jack');
        this.mainChar.body?.setGravity(false);
        this.mainChar?.setCollideWorldBounds(true);
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
    
        // this seems hacky
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.mainChar.setVelocityX(-160);
            this.mainChar.setVelocityY(0);
            this.mainChar.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.mainChar.setVelocityX(160);
            this.mainChar.setVelocityY(0);
            this.mainChar.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            this.mainChar.setVelocityY(-160);
            this.mainChar.setVelocityX(0);
            this.mainChar.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.mainChar.setVelocityY(160);
            this.mainChar.setVelocityX(0);
            this.mainChar.anims.play('down', true);
        } else {
            this.mainChar.setVelocityX(0);
            this.mainChar.setVelocityY(0);
            this.mainChar.anims.play('turn', true);
        }
    }

    getObjects(map: Tilemaps.Tilemap, objectName: string, layer: string) {
        let arr = new Array();
        map.getObjectLayer(layer)!.objects.forEach((element) => {
            if (element.type === objectName) {
                arr.push(element);
            }
        });

        return arr;
    }
}