var config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 750,
    height: 750,
    backgroundColor: 0x004455,
    scene: [GamePlay]
}

let game = new Phaser.Game(config)
