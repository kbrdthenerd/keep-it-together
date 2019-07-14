class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.fallSpeed = 50
        this.wrenchSpeed = 150

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
                    self.fallSpeed+=13
                    if(self.group.getChildren().length === 0) {
                        const years = Math.floor(self.scene.timePassed / 100)
                        const days = Math.floor((self.scene.timePassed / 100 - years) * 365)
                        self.scene.end = new Text(self.scene, `You kept it together for ${years} years and ${days} days`, 30, 210, '25px', false, 0.008)
                        self.scene.end.startFadeIn()
                        self.scene.tryAgain = new Text(self.scene, `Try again?`, 150, 300, '25px', false, 0.008)
                        self.scene.tryAgain.startFadeIn()
                        self.scene.tryAgain.sceneText.setInteractive().on('pointerdown', () => {
                            self.scene.end.sceneText.destroy()
                            self.scene.tryAgain.sceneText.destroy()
                            self.scene.nuts.create()
                            self.scene.timePassed = 0
                        })

                        self.scene.tryAgain.sceneText.setInteractive().on('pointerover', () => {
                            self.scene.tryAgain.sceneText.setStroke('#0000FF', 5)

                        })

                        self.scene.tryAgain.sceneText.setInteractive().on('pointerout', () => {
                            self.scene.tryAgain.sceneText.setStroke('#004455', 5)

                        })
                    }
                }
            } else {
                nut.body.angularVelocity = (nut.tighten ? self.wrenchSpeed : 0) - this.fallSpeed
                let newHeight = nut.body.height - nut.body.angularVelocity *0.001
                nut.setDisplaySize(newHeight * 1.15, newHeight)
            }
        })
    }
}
