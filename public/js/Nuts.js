class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')
        this.scene.load.image('bolt', 'assets/bolt.png')

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.bolts = this.scene.physics.add.group({})
        this.fallSpeed = 50
        this.wrenchSpeed = 150

        this.add(100, 100, 0xA4036F, 0x5BFC90, 60)
        this.add(300, 100, 0x048BA8, 0xFB7457, 70)
        this.add(500, 100, 0xF29E4C, 0x0D61B3, 60)

        this.add(100, 300, 0xC12447, 0x3EDBB8, 75)
        this.add(300, 300, 0x16DB93, 0xE9246C, 65)
        this.add(500, 300, 0xEFEA5A, 0x1015A5, 80)

        this.add(100, 500, 0x343E3D, 0xCBC1C2, 70)
        this.add(300, 500, 0xFFB5CA, 0x004A35, 65)
        this.add(500, 500, 0x654321, 0x9ABCDE, 60)
        this.timedEvent = this.scene.time.addEvent({ delay: 0, callback: this.invert, callbackScope: this, repeat: 0});

    }

    invert() {
        Phaser.Actions.Call(this.group.getChildren(), (nut) => {
            if(nut.displayHeight > 90) {
                if(nut.currentColor == nut.inverse) {
                    nut.currentColor = nut.color
                    nut.setTint(nut.color)
                } else {
                    nut.currentColor = nut.inverse
                    nut.setTint(nut.inverse)
                }
            } else {
                nut.currentColor = nut.color
                nut.setTint(nut.color)
            }
        })
       this.timedEvent.reset({ delay: 300, callback: this.invert, callbackScope: this, repeat: 1})
    }

    add(x, y, color, invertColor, startSize) {
        let nut = this.group.create(x, y, 'nut')
        let bolt = this.bolts.create(x, y, 'bolt')
        let innerBolt = this.bolts.create(x, y, 'bolt')
        bolt.setDisplaySize(57, 57)
        innerBolt.setDisplaySize(50, 50)
        bolt.setTint(0xb3b3b3)
        innerBolt.setTint(0x999999)
        nut.setDisplaySize(startSize * 1.15, startSize)
        nut.body.angularVelocity = -100
        nut.tighten = false
        nut.setTint(color)
        nut.currentColor = color
        nut.color = color
        nut.inverse = invertColor
        nut.flashing = false

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
            if(nut.displayHeight > 100) {
                nut.depth = 5
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
            } else if(self.wrenchSpeed > self.fallSpeed && nut.tighten && nut.displayHeight < 60) {
                nut.body.angularVelocity = 0
            } else {
                nut.body.angularVelocity = (nut.tighten ? self.wrenchSpeed : 0) - this.fallSpeed
                let newHeight = nut.body.height - nut.body.angularVelocity *0.0005
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            }
        })
    }
}
