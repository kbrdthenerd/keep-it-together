class Text {
    constructor(scene, text, x, y, size, shouldFadeOut, fadeInRate) {
        this.fadingIn = false
        this.shouldFadeOut = shouldFadeOut

        this.sceneText = scene.add.text(x, y, text, { fontSize: size, fill: '#ffffff' })
        this.sceneText.setFontFamily('Nova');
        this.sceneText.setAlpha(0.0)
        this.sceneText.depth = 10
        this.fadeInRate = fadeInRate

        this.sceneText.setStroke('#000000', 5)

    }

    startFadeIn() {
        this.fadingIn = true
    }

    setText(text) {
        this.sceneText.setText(text)
    }

    update() {

        this.alpha = this.sceneText.alpha

        if(this.fadingIn  && this.sceneText.alpha != 1.0) {
            this.sceneText.setAlpha(this.sceneText.alpha + 0.006)
        } else if (this.shouldFadeOut && !this.fadingIn) {
            this.sceneText.setAlpha(this.sceneText.alpha - 0.006)
        }

        if(this.sceneText.alpha == 1) {
            this.fadingIn = false
        }

    }
}
