var config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 600,
    height: 600,
    backgroundColor: 0xFFFFFF,
    scene: [GamePlay]
}

let game = new Phaser.Game(config)
