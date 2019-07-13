class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')

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
        nut.spinning = false

        nut.setInteractive().on('pointerover', () => {
                if(!nut.falling) {
                    nut.body.angularVelocity = 100
                    nut.spinning = true
                }
            }

        );

        nut.setInteractive().on('pointerout', () => {
            if(!nut.falling) {
                nut.body.angularVelocity = -100
                nut.spinning = false
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
            } else {
                if(!nut.spinning) {
                    let newHeight = nut.body.height + 0.05
                    nut.setDisplaySize(newHeight * 1.15, newHeight)
                } else {
                    let newHeight = nut.body.height - 0.1
                    nut.setDisplaySize(newHeight * 1.15, newHeight)
                }
            }
        })
    }
}
