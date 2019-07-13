var config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 600,
    height: 600,
    backgroundColor: 0x004455,
    scene: [GamePlay]
}

let game = new Phaser.Game(config)
