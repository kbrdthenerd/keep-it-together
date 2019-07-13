class Nuts {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image('nut', 'assets/nut.png')

    }

    create() {
        this.group = this.scene.physics.add.group({})
        this.add(250, 250)
    }

    add(x, y) {
        let nut = this.group.create(x, y, 'nut')
        nut.body.angularVelocity = 50
    }

    update() {
    }
}
