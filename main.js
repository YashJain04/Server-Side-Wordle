/**
 * Author: Yash Jain - 300245571
 * Author: Oliver Byl - 300168571
 * 
 * This main.js file contains the JavaScript functionality for the index.html page
 * It creates new elements, functions, checks the state of the game, and allows for overall wordle functionality
 */

let wordleLetters = 5; //wordle words contain only 5 letters
let numberOfGuesses = 6; //wordle word must be guessed in 6 or less attempts
const allPossibleLetters = "abcdefghijklmnopqrstuvwxyz".split(''); //all possible letter inputs
const allOtherPossibleInputs = ["Enter", "Backspace"]; //all other possible inputs (Enter or Backspace)

let stateOfGame = true; //tracks the state of the game, true for ongoing, false for ended
let usersCurrentRow = 1; //tracks the row the user is currently on
let usersCurrentColumn = 1; //tracks the column the user is currently on
let currentLetter; //tracks the current letter the user is on
let counter = 1; //a counter for the specific letter (used in grabbing ID's)
let attemptsAtEnter = []; //counter to ensure correct enter functionality

const squareParent = document.getElementById("game-board"); //constant used to nest all square letters inside the parent element (comes from HTML page)
const squareClass = "squares-for-letters"; //constant variable used for the class name for each letter square (comes from CSS styling)

const letterClass = "letter"; //constant variable used for the letter class (comes from CSS styling)
let letterIdentity = "letter"; //variable used to track the unique letter in the game (from 1-30)

let answer = document.getElementById("reveal-answer"); //reveal text for answer or incorrect word

let score = 0; //users score

//on window load event call the function to create the squares for the letters and track key inputs from user
window.onload = function() {
    createSquaresForLetters();
    document.addEventListener("keyup", userFunctionality);
    getWordFromServer();
}

//function to create squares for the letters
function createSquaresForLetters() {
    /**
     * No parameters
     * Calls the createLetters(squareID, uniqueLetterNumber)
     * 
     * Loops through 30 times (because 30 letters) creating 30 divs which represent the squares
     * Assigns the class name of "squares-for-letters" to each div for styling
     * Associates each square with an ID of "square" + position.toString() which represents the square number
     * Appends created div to the parent which is the div with an id of "game-board"
     * 
     * Calls createLetters(squareID, uniqueLetterNumber) and passes the parentElementID name (which is the square) + currentSquare
     */

    for (let position = 1; position <= wordleLetters * numberOfGuesses; position++) {
        let square = document.createElement("div");
        square.className = squareClass;
        square.id = "square" + position;
        squareParent.appendChild(square);
        createLetters(square.id, position.toString());
    }
}

//function to create the letters
function createLetters(squareID, uniqueLetterNumber) {
    /**
     * String : squareID = Holds the ID of the parent element in which the letter will be (the associated square)
     * int : uniqueLetterNumber = Holds the NUMBER of the letters in the board to associate the ID's with (1-30 letters)
     * 
     * All of this is done 30 times because of the loop:
     * Creates the paragraph to allow for regular text
     * Associates the class name of letter to each <p> tag for styling
     * Associates each letter with an ID of "letter" + uniqueLetterNumber which represents the unique letters from 1-30
     * Appends each created letter to the parent which is the square (div element) with an id of squareID ["square" + position.toString()]
     */

    let letter = document.createElement("p");
    letter.className = letterClass;
    letter.id = letterIdentity + uniqueLetterNumber;

    letter.innerHTML = "";
    
    document.getElementById(squareID).appendChild(letter);
}

//function to check for user inputs such as letter clicked, enter or backspace
function userFunctionality(keyPressed) {
    /**
     * keyPressed : An event that tracks which key the user clicked
     * Uses the code of the key buttons pressed to track users actions and provide functionality based off of it
     * 
     * JUSTIFICATION OF WHY SERVER DOESN'T HANDLE THIS PROCESS:
     * - Pushing every keystroke to the server is not a good approach for this game as the user has to make many keystrokes (Wordle requires a lot of typing for entering keys, and also backspacing for deleting letters, entering [could be an invalid word then user has to make even more keystrokes to delete letters], thinking, etc...)
     * - This leads to increased server load, higher latency, and a less responsive user experience
     * - With each keystroke made an AJAX request would have to be made and then the server would first have to validate the keystroke (only valid keys in Wordle are keys: a-z, Enter, Backspace) then communicate it back to the client for each single keystroke
     * - This follows bad practice as it will overload the server and more
     * - Furthermore this does not count as GAME STATE as this is just UI STATE in the end the final word is concatenated from the letters and that is sent to the SERVER
     */

    //if the game is ongoing
    if (stateOfGame) {

        //if the user pressed a key from a-z increment the counter + current column and set the text to the key pressed
        if (allPossibleLetters.includes(keyPressed.key.toLowerCase())) {
            if (usersCurrentColumn < wordleLetters + 1) {
                currentLetter = document.getElementById(letterIdentity + counter);
                if (currentLetter.innerHTML === "") {
                    currentLetter.innerHTML = keyPressed.key.toUpperCase();
                    counter = counter + 1;
                    usersCurrentColumn = usersCurrentColumn + 1;
                }
            }
        }

        //for all other valid inputs such as Enter or Backspace
        if (allOtherPossibleInputs.includes(keyPressed.key)) {

            //if the user pressed enter
            if (keyPressed.key === "Enter" && (counter - 1) % 5 === 0 && !attemptsAtEnter.includes(counter - 1)) {
                checkUsersGuess(); //first check if the word is valid and user can move on
            }

            //if the user pressed Backspace delete letters and decrement the current column + counter
            if (keyPressed.key === "Backspace") {
                if (1 < usersCurrentColumn && usersCurrentColumn <= wordleLetters + 1) {
                    counter = counter - 1;
                    usersCurrentColumn = usersCurrentColumn - 1;
                }
                currentLetter = document.getElementById(letterIdentity + counter.toString());
                currentLetter.innerHTML = "";
            }
        }
    }

    //if the game ended
    else if (!stateOfGame) {
        return;
    }
}

//function to call server and retrieve the word
function getWordFromServer() {
    let ajaxXHR = new XMLHttpRequest(); //create an AJAX request

    ajaxXHR.open('POST', 'wordle.php', true);
    ajaxXHR.setRequestHeader('Content-Type', 'application/json');
    ajaxXHR.onreadystatechange = function() {

        if (ajaxXHR.readyState === XMLHttpRequest.DONE) {
            if (ajaxXHR.status === 200) {
                let data = JSON.parse(ajaxXHR.responseText); //use the JSON API
                word = data.word; //retrieve the answer
                console.log('ANSWER: ' + word); //console.log the answer for accessibility
            }
            
            else {
                console.error('Error fetching word:', ajaxXHR.statusText); //error fetching word
            }
        }
    };
    ajaxXHR.send(JSON.stringify({ action: 'getWord' })); //use the JSON API
}

//function that calls the server to check the users attempted guess with the answer
function checkUsersGuess() {
    //users attempted word in a string variable
    let attemptedGuess = "";

    for (let index = 0; index < wordleLetters; index++) {
        currentLetter = document.getElementById(letterIdentity + (counter - 5 + index));
        attemptedGuess += currentLetter.innerHTML;
    }

    attemptedGuess = attemptedGuess.toLowerCase(); //turn lower case so we can compare to see if it exists in the word list

    let ajaxXHR = new XMLHttpRequest(); //create an AJAX request
    ajaxXHR.open('POST', 'wordle.php', true);
    ajaxXHR.setRequestHeader('Content-Type', 'application/json');
    ajaxXHR.onreadystatechange = function() {

        if (ajaxXHR.readyState === XMLHttpRequest.DONE) {
            if (ajaxXHR.status === 200) {
                let data = JSON.parse(ajaxXHR.responseText); //use the JSON API

                if (data.valid) {
                    answer.innerHTML = "";
                    validate(data.result); //call the validate function to apply the necessary styling with a parameter that holds the result
                    
                    if (data.gameOver) {
                        stateOfGame = false; //games over
                        answer.innerHTML = "ANSWER: " + data.correctWord; //reveal answer
                    }

                    if (usersCurrentRow === numberOfGuesses && attemptedGuess != data.correctWord.toLowerCase()) {
                        score = score + 1;
                    }
                    
                    else {
                        usersCurrentRow = usersCurrentRow + 1; //increment the row (next word)
                        usersCurrentColumn = 1; //set the column back to 1 (first letter)
                        attemptsAtEnter.push(counter - 1); //list to ensure that user cannot click enter at random times and only once the word is complete and is in a different row from before
                    }

                    score = score + 1; //increment the number of attempted guesses for the total score
                }
                
                else {
                    answer.innerHTML = "NOT A VALID WORD"; //reveal that the word entered is INVALID
                }
            }
            
            else {
                console.error('Error checking word:', ajaxXHR.statusText); //error within server checking word
            }
        }
    };
    ajaxXHR.send(JSON.stringify({ action: 'checkWord', guess: attemptedGuess })); //use the JSON API
}
 
//function to check for correct and wrong letters as well letters that are in the word but not in the correct spot
function validate(result) {
    /**
     * result : An array that holds the validation results for each letter in the user's guess
     * 
     * Each element in the array corresponds to a letter in the guess (in order) and can have one of three values:
     * 
     * correct - The letter is correct and in the correct position
     * incorrectSpot - The letter is in the word but in the wrong position
     * incorrect - The letter is not in the word.
     */
    for (let index = 0; index < result.length; index++) {
        let currentBox = document.getElementById("square" + (counter - 5 + index));
        
        //if the user guessed a letter correctly add the styling to the box to make it green
        if (result[index] === 'correct') {
            currentBox.classList.add("correct");
        }
        
        //if the user guessed a letter correctly that is in the word but in the wrong spot add the styling to make it yellow
        else if (result[index] === 'incorrectSpot') {
            currentBox.classList.add("incorrectSpot");
        }
        
        //if the user guessed a letter that doesnt exist in the word at all then add the styling to make it grey
        else {
            currentBox.classList.add("incorrect");
        }
    }
}

//function that clears and resets the game state, so user can play again, and stores the score in the leaderboard
function playAgain() {
    // Send the score to the server to be saved in a PHP session
    let ajaxXHR = new XMLHttpRequest();
    
    ajaxXHR.open('POST', 'wordle.php', true);
    ajaxXHR.setRequestHeader('Content-Type', 'application/json');
    ajaxXHR.onreadystatechange = function() {

        if (ajaxXHR.readyState === XMLHttpRequest.DONE) {
            if (ajaxXHR.status === 200) {
                let data = JSON.parse(ajaxXHR.responseText); //use the JSON API
                let topScores = data.scores; //retrieve all of the users scores stored in the session
                console.log('ALL SCORES IN SESSION: ' + topScores); //console.log the results for accessibility

                //update the leaderboard only if user played game through
                if (!stateOfGame) {
                    for (let i = 1; i <= Math.min(10, topScores.length); i++) { //get the top 10 scores throughout the entire array
                        if (topScores[i-1] != 7) {
                            document.getElementById("leaderboard-score-" + i.toString()).innerHTML = "TOP " + i.toString() + " SCORE: " + topScores[i - 1] + " ATTEMPTS";
                        }
                        else {
                            document.getElementById("leaderboard-score-" + i.toString()).innerHTML = "TOP " + i.toString() + " SCORE: " + topScores[i - 1] + " ATTEMPTS (LOST)";
                        }
                    }
                }

                //reset the game state
                stateOfGame = true;
            }
            
            else {
                console.error('Error sending score:', ajaxXHR.statusText); //error within server sending score
            }
        }
    };

    //only send the score to the server if the game was played through (user can hit play again at anytime but that doesn't mean the score should be sent cause they didnt finish the game)
    if (!stateOfGame) {
        ajaxXHR.send(JSON.stringify({ action: 'saveScore', score: score }));
    }

    //reset the variables back to the original value
    usersCurrentRow = 1;
    usersCurrentColumn = 1;
    counter = 1;
    attemptsAtEnter = [];
    answer.innerHTML = "";
    score = 0;

    //clear the board and reset it
    for (let position = 1; position <= wordleLetters * numberOfGuesses; position++) {
        document.getElementById("letter" + position).innerHTML = "";
        document.getElementById("square" + position).classList.remove("correct", "incorrectSpot", "incorrect");
    }

    //retrieve a new word from the server
    getWordFromServer();

    //reattach the event listeners
    document.removeEventListener("keyup", userFunctionality);
    document.addEventListener("keyup", userFunctionality);

    //make sure the button is out of focus and the page focuses on the board
    document.getElementById('play-again-button').blur();
    document.getElementById("game-board").focus();
}