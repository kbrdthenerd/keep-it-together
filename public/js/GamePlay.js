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
        this.nuts.create()
        const self = this

        WebFont.load({
          active: () => {
                 self.title = new Text(self, 'Keep it Together', 90, 175, '60px', true, 0.008)
                  self.credit = new Text(self, 'Designed by Katherine Brennan', 90, 240, '30px', true, 0.008)

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
        if(this.title && this.credit) {
            this.title.update()
            this.credit.update()
        }
        this.nuts.update()
    }
}
