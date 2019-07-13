class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')
        this.fallSpeed = 50
        this.wrenchSpeed = 150

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.add(100, 100)
        this.add(300, 100)
        this.add(500, 100)

        this.add(100, 300)
        this.add(300, 300)
        this.add(500, 300)

        this.add(100, 500)
        this.add(300, 500)
        this.add(500, 500)
    }

    add(x, y) {
        let nut = this.group.create(x, y, 'nut')
        nut.setDisplaySize(50 * 1.15, 50)
        nut.body.angularVelocity = -100
        nut.tighten = false

        nut.setInteractive().on('pointerover', () => {
            nut.tighten = true
        });

        nut.setInteractive().on('pointerout', () => {
            nut.tighten = false
        });
    }

    update() {
        self = this
        Phaser.Actions.Call(this.group.getChildren(), (nut) => {
            if(nut.displayWidth > 200) {
                nut.body.angularVelocity = 0
                let newHeight = nut.body.height + 50
                nut.setDisplaySize(newHeight * 1.15, newHeight)
                if(nut.displayWidth > 1500) {
                    nut.destroy()
                    self.fallSpeed+=15
                }
            } else {
                nut.body.angularVelocity = (nut.tighten ? self.wrenchSpeed : 0) - this.fallSpeed
                let newHeight = nut.body.height - nut.body.angularVelocity *0.001
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            }
        })
    }
}
