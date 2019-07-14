class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.fallSpeed = 50
        this.wrenchSpeed = 150

        this.add(100, 100, 0xA4036F)
        this.add(300, 100, 0x048BA8)
        this.add(500, 100, 0xF29E4C)

        this.add(100, 300, 0xC12447)
        this.add(300, 300, 0x16DB93)
        this.add(500, 300, 0xEFEA5A)

        this.add(100, 500, 0x343E3D)
        this.add(300, 500, 0xFFB5CA)
        this.add(500, 500, 0x654321)
    }

    add(x, y, color) {
        let nut = this.group.create(x, y, 'nut')
        nut.setDisplaySize(50 * 1.15, 50)
        nut.body.angularVelocity = -100
        nut.tighten = false
        nut.setTint(color)

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
            if(nut.displayHeight > 150) {
                nut.body.angularVelocity = 0
                let newHeight = nut.body.height + 50
                nut.setDisplaySize(newHeight * 1.15, newHeight)
                if(nut.displayHeight > 1500) {
                    nut.destroy()
                    self.fallSpeed+=15
                    if(self.group.getChildren().length === 0) {
                        self.scene.endGame()
                    }
                }
            } else if(self.wrenchSpeed > self.fallSpeed && nut.tighten && nut.displayHeight < 50) {
                nut.body.angularVelocity = 0
            } else {
                nut.body.angularVelocity = (nut.tighten ? self.wrenchSpeed : 0) - this.fallSpeed
                let newHeight = nut.body.height - nut.body.angularVelocity *0.001
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            }
        })
    }
}
