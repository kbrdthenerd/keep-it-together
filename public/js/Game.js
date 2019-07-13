var config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 500,
    height: 500,
    backgroundColor: 0x004455,
    scene: [GamePlay]
}

let game = new Phaser.Game(config)
