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
        this.nuts.create()
        const self = this

        WebFont.load({
          active: () => {
                 self.title = new Text(self, 'Keep It Together', 70, 140, '60px', true, 0.008)
                  self.credit = new Text(self, 'by Katherine Brennan', 70, 210, '25px', true, 0.008)
                  self.title.startFadeIn()
                  self.credit.startFadeIn()
              },
          custom: {
            families: ['Nova'],
            urls: ['assets/fonts/Nova.css'],
          },
        })
    }

    update() {
        this.timePassed++
        if(this.title && this.credit) {
            this.title.update()
            this.credit.update()
        }
        if(this.end) {
            this.end.update()
        }
        if(this.tryAgain) {
            this.tryAgain.update()
        }
        this.nuts.update()
    }

    endGame() {
        const years = Math.floor(this.timePassed / 50)
        const days = Math.floor((this.timePassed / 50 - years) * 365)
        this.end = new Text(this, `You kept it together for ${years} years and ${days} days`, 10, 210, '25px', false, 0.008)
        this.end.startFadeIn()
        this.tryAgain = new Text(this, `Try again?`, 150, 300, '25px', false, 0.008)
        this.tryAgain.startFadeIn()
        this.tryAgain.sceneText.setInteractive().on('pointerdown', () => {
            this.end.sceneText.destroy()
            this.tryAgain.sceneText.destroy()
            this.nuts.create()
            this.timePassed = 0
        })

        this.tryAgain.sceneText.setInteractive().on('pointerover', () => {
            this.tryAgain.sceneText.setStroke('#16DB93', 5)

        })

        this.tryAgain.sceneText.setInteractive().on('pointerout', () => {
            this.tryAgain.sceneText.setStroke('#000000', 5)

        })
    }
}
