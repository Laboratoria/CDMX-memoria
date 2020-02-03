import chars from './characters.js'
import Game from './memo.js'
// selectors
let cards = document.querySelector('.cards')
let restart = document.querySelector('#restart')
// Game intance
let game = new Game(chars)

// Globals
let pairs = []

function flipBack() {
    let [card0, card1] = pairs
    card0.classList.add('flip')
    card1.classList.add('flip')
    cards.style = "pointer-events:inherit"
    card0.style = "pointer-events:inherit"
    card1.style = "pointer-events:inherit"
    pairs = []
}

function checkIfCorrect() {
    let [card0, card1] = pairs
    let id0 = card0.getAttribute('data-id')
    let id1 = card1.getAttribute('data-id')
    if (game.compareChars(id0, id1)) {
        cards.style = "pointer-events:inherit"
        card0.style = "pointer-events:none"
        card1.style = "pointer-events:none"
        pairs = []
    } else {
        setTimeout(flipBack, 1000)
    }
}

function cardClicked(card) {
    return () => {
        if (pairs.length > 0) {
            card.classList.toggle('flip')
            pairs.push(card)
            cards.style = "pointer-events:none"
            checkIfCorrect()
        }
        else {
            pairs.push(card)
            card.classList.toggle('flip')
            card.style = "pointer-events:none"
        }
    }
}

function start() {
    cards.innerHTML = ""
    let array = game.getNewArray()
    cards.style = "pointer-events:inherit"
    pairs = []
    setCharacters(array)
}

// aux functions
function setCharacters(chars) {
    for (let char of chars) {
        let card = createCard(char)
        cards.appendChild(card)
    }
}

function createCard(char) {
    let card = document.createElement('article')
    card.classList.add('card')
    card.classList.add('flip')
    card.setAttribute('data-id', char.id)
    card.innerHTML = `
    <div class="back"></div>
    <div style="background-image:url('${char.url}')" class="front"></div>
    `
    card.addEventListener('click', cardClicked(card))
    return card
}

start()

// listeners
restart.addEventListener('click', start)