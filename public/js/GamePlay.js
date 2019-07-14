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
        this.timePassed = 0
        this.score = 0
        this.nuts.create()
        const self = this

        WebFont.load({
          active: () => {
                 self.title = new Text(self, 'Keep It Together', 70, 140, '60px', true, 0.008)
                  self.credit = new Text(self, 'by Katherine Brennan', 70, 210, '25px', true, 0.008)
                  self.scoreText = new Text(self, 'Score: 0', 100, 550, '25px', false, 0.008)
                  self.title.startFadeIn()
                  self.credit.startFadeIn()
                  self.scoreText.startFadeIn()
              },
          custom: {
            families: ['Nova'],
            urls: ['assets/fonts/Nova.css'],
          },
        })
    }

    update() {
        this.timePassed++
        if(this.timePassed % 10 == 0) {
            this.score+= this.nuts.group.getChildren().length
        }
        if(this.title && this.credit) {
            this.title.update()
            this.credit.update()
        }
        if(this.tryAgain) {
            this.tryAgain.update()
        }
        if(this.scoreText) {
            this.scoreText.update()
            this.scoreText.setText(`Score: ${this.score}`)
        }
        this.nuts.update()
    }

    endGame() {
        const years = Math.floor(this.score / 30)
        const days = Math.floor((this.score / 30 - years) * 365)
        this.tryAgain = new Text(this, `Try again?`, 200, 200, '25px', false, 0.008)
        this.tryAgain.startFadeIn()
        this.tryAgain.sceneText.setInteractive().on('pointerdown', () => {
            this.tryAgain.sceneText.destroy()
            this.nuts.create()
            this.score = 0
        })

        this.tryAgain.sceneText.setInteractive().on('pointerover', () => {
            this.tryAgain.sceneText.setStroke('#16DB93', 5)

        })

        this.tryAgain.sceneText.setInteractive().on('pointerout', () => {
            this.tryAgain.sceneText.setStroke('#000000', 5)

        })
    }
}
