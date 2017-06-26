//Do imports so you can organize code

var letter = randomLetter();
var wins = 0;
var losses = 0;
var gameObject;

initialize();

//put in a differnt file
/**
 * @param {KeyboardEvent} e
 */
document.onkeydown = function (e) {
    var userInput = e.key.toUpperCase();

    //if the user input isnt a letter or 
    if (e.keyCode > 90 || e.keyCode < 65 ||
        gameObject.guessedCharacters.includes(userInput) && gameObject.guessesLeft != 0) {
        alert("Please enter a letter or a letter you haven't already used");
        return;
    }

    //if the user doesn't guess in time
    if (gameObject.guessesLeft <= 1) {
        losses++;
        alert("You lose");
        initialize();
        return;
    }

    if (userInput === letter) {
        wins++;
        alert("You win!");
        initialize();
        return;
    }

    gameObject.guessedCharacters.push(userInput);
    gameObject.guessesLeft -= 1;
    updateAllElements();
}

function initialize() {
    letter = randomLetter();
    gameObject = new Game();
    updateAllElements();
}

//Game constructor
function Game() {
    this.wins = wins;
    this.losses = losses;
    this.guesses = [];
    this.guessesLeft = 10;
    this.guessedCharacters = [];
    this.letter = randomLetter();
}

function randomLetter() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function updateAllElements() {
    updateHtmlElement("wins", "Wins: " + gameObject.wins);
    updateHtmlElement("losses", "Losses: " + gameObject.losses);
    updateHtmlElement("guesses", "Your guesses: " + gameObject.guessedCharacters.join(", "));
    updateHtmlElement("guessesLeft", "Guesses left: " + gameObject.guessesLeft);
}

/**
 * 
 * @param {string} elementId 
 * @param {string} elementValue 
 */
function updateHtmlElement(elementId, elementValue) {
    var element = document.getElementById(elementId);
    element.innerHTML = elementValue;
}

