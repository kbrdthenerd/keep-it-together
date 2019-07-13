class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')
        this.fallSpeed = 50
        this.wrenchSpeed = 150

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.add(250, 250)
        this.add(200, 200)
        this.add(100, 100)
    }

    add(x, y) {
        let nut = this.group.create(x, y, 'nut')
        nut.setDisplaySize(50 * 1.15, 50)
        nut.body.angularVelocity = -100
        nut.falling = false

        nut.setInteractive().on('pointerover', () => {
            if(!nut.falling) {
                nut.body.angularVelocity = this.wrenchSpeed - this.fallSpeed
            }
        });

        nut.setInteractive().on('pointerout', () => {
            if(!nut.falling) {
                nut.body.angularVelocity = -this.fallSpeed
            }
        });
    }

    update() {
        Phaser.Actions.Call(this.group.getChildren(), (nut) => {
            if(nut.displayWidth > 100) {
                nut.falling = true
                nut.body.angularVelocity = 0
                let newHeight = nut.body.height + 50
                nut.setDisplaySize(newHeight * 1.15, newHeight)
                if(nut.displayWidth > 2000) {
                    nut.destroy()
                }
            } else {
                let newHeight = nut.body.height - nut.body.angularVelocity *0.001
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            }
        })
    }
}
