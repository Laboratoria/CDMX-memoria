class Game {
    constructor(array) {
        this.array = array
        this.chars = this.doubleArray()
        this.shufleArray()
    }

    doubleArray() {
        return [...this.array, ...this.array]
    }

    shufleArray() {
        for (let i = 0; i < this.chars.length; i++) {
            let randomNumber = Math.floor(Math.random() * this.chars.length)
            let temp = this.chars[randomNumber]
            this.chars[randomNumber] = this.chars[i]
            this.chars[i] = temp
        }
        return [...this.chars]
    }
    getNewArray() {
        this.shufleArray()
        return this.chars
    }
    compareChars(id1, id2) {
        return id1 === id2
    }
}

export default Game