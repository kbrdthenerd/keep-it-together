class GamePlay extends Phaser.Scene {
    constructor() {
        super({key: 'GamePlay',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                }
            },
            active: true
        })
    }

    preload() {
        this.nuts = new Nuts(this)
    }

    create() {
        this.nuts.create()
    }

    update() {
        this.nuts.update()
    }
}
