class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.add(250, 250)
    }

    add(x, y) {
        let nut = this.group.create(x, y, 'nut')
        nut.setDisplaySize(50 * 1.15, 50)
        nut.body.angularVelocity = -100
        nut.spinning = false

        nut.setInteractive().on('pointerdown', () => {
            if(!nut.spinning) {
                nut.body.angularVelocity = 100
                nut.spinning = true
            } else {
                nut.body.angularVelocity = -100
                nut.spinning = false
            } }
        );
    }

    update() {
        Phaser.Actions.Call(this.group.getChildren(), (nut) => {
            if(!nut.spinning) {
                let newHeight = nut.body.height + 0.05
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            } else {
                let newHeight = nut.body.height - 0.1
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            }
        })
    }
}
