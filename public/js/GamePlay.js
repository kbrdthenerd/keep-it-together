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
                 self.title = new Text(self, 'Keep it Together', 70, 140, '60px', true, 0.008)
                  self.credit = new Text(self, 'Designed by Katherine Brennan', 70, 210, '25px', true, 0.008)
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
}
