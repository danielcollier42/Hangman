//Instructions
// - A list of all the letters already guessed must be displayed
// - After each guess the user must see updated progress mixing letters and blanks (“_”)...For the word “cat”:
// “_ _ _”   or   “c _ t”   or   “ _ a t”
// - The user must see how many guesses they have remaining
// - Game must use a CSS framework - w3.css or bootstrap
// - Letter guessing input must either be a sized select box, or a button for each letter.
// - The user must not be allowed to guess the same letter twice.  Remove/deactivate  selection or deactivate the button
// - Create a “win” or “lose” routine
// - Once the game ends, a new game can be initiated without a page refresh
//
//Advanced features
// - Allow user to select their word based on categories or difficulty
// - Display an image that advances on wrong guesses until the game ends (google “Hangman Images”)
// - Other UI or validation sophistication (check with Albinson)
//
//Structure
// Global variables (variables that are declared outside of a function):
// word - string
// words - array
// guesses - number
// guessedLetters - array
//
// startGame():
// Reset the board, clear out any traces of the last round from guessedLetters
// Choose a word - this code will grab  a random element from your words array for you:
// var rand = myArray[Math.floor(Math.random() * myArray.length)];
//
// printWord():
// Compare word to guessedLetters using guessedLetters.indexOf(letter in word) to build the “_” word with the correctly
// guessed letters filled in.
//
// guessLetter():
// Take the most recently guessed letter and validate it, re-print the word, deduct from guesses, check to see if the
// user has won or lost yet.

//var spots = word.length;
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];



var NUMBERS = ["One","Nineteen","Three","Four","Seventeen","Fourteen","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen"];
var VP = ["Clinton","Gerry","Cheney","Tyler","Fillmore","Hamlin","Colfax","Hobart","Nixon","Garner","Curtis","Marshall","Rockefeller"];
var CAT = ["Persian","Bengal","Siamese","Sphynx","Savannah","Siberian","Bombay","Manx","Singapura","Burmese","Tonkinese","Snowshoe","LaPerm"];
var TOWNS = ["McMullen","Jerome","Vernon","Bonanza","Union","Hartly","Manele","Moonshine","Beaconsfield","Funkley","Gosnold","Mound","Freeport"];
var HP = ["ErnieMacmillan","ScorpiusMalfoy","TeddyLupin","XenophiliusLovegood","PenelopeClearwater","AmeliaBones","BathildaBagshot","ZachariasSmith","CormacMcLaggen","KatieBell","BlaiseZabini","RomildaVane","ColinCreevey"];
var KNOTS = ["FigureEight","Bowline","Reef","Butterfly","SheetBend","CloveHitch","Prusik","KleimHeist","ChainSplice","CarrickBend","MunterHitch","HalterHitch","AnchorBend"];
var COLORS = ["Malachite","Gamboge","Fallow","Razzmatazz","Falu","Arsenic","Feldgrau","Xanadu","Sarcoline","Coquelicot","Smaragdine","Mikado","Glaucous"];


var easyImages = ["image/Hang-base.jpg", "image/EasyPerson/EasyHead.jpg", "image/EasyPerson/EasyEyes.jpg", "image/EasyPerson/EasyEyebrow1.jpg", "image/EasyPerson/EasyEyebrow2.jpg", "image/EasyPerson/EasyMouth.jpg", "image/EasyPerson/EasyBody.jpg", "image/EasyPerson/EasyArm1.jpg", "image/EasyPerson/EasyArm2.jpg", "image/EasyPerson/EasyLeg1.jpg", "image/EasyPerson/EasyLeg2.jpg", "image/EasyPerson/EasyGlove1.jpg", "image/EasyPerson/EasyGlove2.jpg", "image/EasyPerson/EasyHat.jpg"];
var medImages =["image/Hang-base.jpg", "image/MediumPerson/MediumHead.jpg", "image/MediumPerson/MediumEye1.jpg", "image/MediumPerson/MediumEye2.jpg", "image/MediumPerson/MediumMouth.jpg", "image/MediumPerson/MediumBody.jpg", "image/MediumPerson/MediumArm1.jpg", "image/MediumPerson/MediumArm2.jpg", "image/MediumPerson/MediumLeg1.jpg", "image/MediumPerson/MediumLeg2.jpg"];
var hardImages = ["image/Hang-base.jpg", "image/HardPerson/HardHead.jpg", "image/HardPerson/HardFace.jpg", "image/HardPerson/HardBody.jpg", "image/HardPerson/HardArms.jpg", "image/HardPerson/HardLegs.jpg"];

//var category = document.getElementById(category).value;
    //return wordsByCat[category];

//var CATEGORIES = [["Numbers", NUMBERS], ["US Vice Presidents", VP], ["House Cats", CAT], ["Small Towns", TOWNS], ["Harry Potter", HP], ["Knots", KNOTS], ["Strange Colors", COLORS]];


var word = "";
var words = "";
var guesses = "";
var guessedLetters = [];
var n = 1; //This variable is so I can have different pictures for each difficulty


function startGame(){

    var difficulty = document.getElementById("difficulty").value;
    var category = document.getElementById("category").value;
    var words;


    if(category == 0){
        words = NUMBERS;
    } else if(category == 1){
        words = VP;
    } else if(category == 2){
        words = CAT;
    } else if(category == 3){
        words = TOWNS;
    } else if(category == 4){
        words = HP;
    } else if(category == 5){
        words = KNOTS;
    } else if(category == 6){
        words = COLORS;
    }

    word = words[Math.floor(Math.random() * words.length)].toUpperCase();

    document.getElementById("message").innerHTML = "";
    guessedLetters = [];
    determineGuesses(difficulty);
    doDashes();
    doButtons();

    document.getElementById('image').src = easyImages[0];

    n = 1;
}

function doDashes(){
    var length = word.length;
    var dashes = "";
    for(var i = 0; i < length; i++){
        dashes += "_";
    }
    document.getElementById("answer").innerHTML = dashes;
}

//step 0
function doButtons(){
    var button;
    var div = document.getElementById("buttons");
    div.innerHTML = "";

    for(var i = 0; i < alphabet.length; i++){

        button = document.createElement("button");

        button.setAttribute("class", "letterButton");
        button.setAttribute("value", alphabet[i]);
        button.setAttribute("onclick", "guessLetter(this)");

        button.innerHTML = alphabet[i];
        div.appendChild(button);
    }
}

//step 1.5
function guessLetter(button) {
    button.disabled = "true";
    var guess = button.value;
    guessedLetters += guess;
    if(letterInWord(guess) == false){
        doImage();
        guesses--;
    }
    printWord();
    document.getElementById("remainingGuesses").innerHTML = "Remaining Guesses: " + guesses;
    if(guesses <= 0){
        youLose();
        disableButtons();

        if(displayedWord == word) {
            youWin();
            disableButtons();
        }
    }
}

function letterInWord(letter){
    var includes = false;
    for(var i = 0; i < word.length; i++){
        if(word.substring(i, i + 1) == letter){
            includes = true
        }
    }
    return includes;
}

function doImage(){
    var imgArr;
    var cap;
    var difficulty = document.getElementById("difficulty").value;
    if(difficulty == "Easy"){
        imgArr = easyImages;
        cap = 13;
    } else if(difficulty == "Medium"){
        imgArr = medImages;
        cap = 9;
    } else if(difficulty == "Hard"){
        imgArr = hardImages;
        cap = 5
    }
    document.getElementById('image').src = imgArr[n];
    if(n < cap){
        n++;
    }
}

//step 2
function printWord(){
    var displayedWord = "";
    for(var i = 0; i < word.length; i++){
           //if (word[i] != " ") {
        if (guessedLetters.indexOf(word[i]) != -1) {
                    displayedWord += word[i];
        } else {
                    displayedWord += "_";
        }
    }
    document.getElementById("answer").innerHTML = displayedWord;
}
//step 0
function determineGuesses(difficulty){
    var imgArr;
    if(difficulty == "Easy"){
        guesses = 13;
    } else if(difficulty == "Medium"){
        guesses = 9;
    } else if(difficulty == "Hard"){
        guesses = 5;
    }
    document.getElementById("remainingGuesses").innerHTML = "Remaining Guesses: " + guesses;
    return difficulty;
}


function youLose(){
    document.getElementById("message").innerHTML = "You Lose... Try again?";
    guessedLetters = alphabet;
    printWord();
}

function youWin() {
    document.getElementById("message").innerHTML = "You Win!!! Play again?";
    document.getElementById("remainingGuesses").innerHTML = "";
    return yes;
}

function disableButtons(){
    var buttons = document.getElementById("buttons");

    for(var i = 0; i < buttons.children.length; i++ ){
        buttons.children[i].disabled = "true"
    }
}

function resetButtons(){
    var buttons = document.getElementById("buttons");

    for(var i = 0; i < buttons.children.length; i++){
        buttons.children[i].setEnabled (true);
    }
}


//Turns strings into arrays
function wordToArray(string) {
    var strArr = string.toString();
    var arr = strArr.split();
    return arr;
}


//   | stuff I had done but I decided to restart
//   V

// function doBackground(category){
//     var source;
//     if(category == "numbers"){
//         document.style.backgroundImage = "image/numbers.jpg";
//         words = NUMBERS;
//     }
//     if(category == "VP"){
//         document.style.backgroundImage = "image/Vice_Presidents.jpg";
//         words = VP;
//     }
//     if(category == "HC"){
//         document.style.backgroundImage = "image/IMAGENAME.jpg";
//         words = HC;
//     }
//     if(category == ""){
//         document.style.backgroundImage = "image/IMAGENAME.jpg";
//         words = CAT4;
//     }
//     if(category == ""){
//         document.style.backgroundImage = "image/IMAGENAME.jpg";
//         words = CAT5;
//     }
//     if(category == ""){
//         document.style.backgroundImage = "image/IMAGENAME.jpg";
//         words = CAT6;
//     }
//     if(category == ""){
//         document.style.backgroundImage = "image/IMAGENAME.jpg";
//         words = CAT7;
//     }
//     return words;
// } // categories need finishing, images need to be found.



// function startGame(){
//
//     //gets the random word
//     var difficulty = getElementById("difficulty").value;
//     var category = document.getElementById("category").value;
//     var words = getWords();
//     word = words * (math.floor(Math.random() * words.length)).toUpperCase();
//
//     //resets the game
//     guesses = findGuesses(difficulty);
//     guessedLetters = [];
//     makeButtons();
//     makeDashes();
//     doBackground();
//     //printWord();
// }
//
// //determines the number of guesses based on what difficulty they chose
// function findGuesses(difficulty){
//     var guesses;
//     if(difficulty == Easy){
//         guesses = 13;
//         document.getElementById("remaining guesses").innerHTML = "Remaining Guesses: 13";
//     }
//     if(difficulty == Medium){
//         guesses = 9;
//         document.getElementById("remaining guesses").innerHTML = "Remaining Guesses: 9";
//     }
//     if(difficulty == Hard){
//         guesses = 5;
//         document.getElementById("remaining guesses").innerHTML = "Remaining Guesses: 5";
//     }
// } //complete
//
// function makeDashes(){
//     var spots = word.length;
//     var displayedWord = "";
//     for (var i = 0; i < spots; i++){
//         if(word.substring[i] == " "){
//             displayedWord += " ";
//         } else {
//             displayedWord += "_";
//         }
//     }
//     document.getElementById("word").innerHTML = displayedWord;
// } //complete but might need reworking
//
// Turns strings into arrays
// function wordToArray(string){
//     var strArr = string.toString();
//     var arr = strArr.split();
//     return arr;
// } //complete
//
//
// function makeButtons(){
//     var button;
//     var div = document.getElementById("letters");
//     var length = alphabet.length;
//
//     for(var i = 0; i < length; i++){
//
//         button = document.createElement("Button");
//
//         button.setAttribute("class", "letterButton");
//         button.setAttribute("value", alphabet[i]);
//         button.setAttribute("onclick", "guessLetter(this)");
//
//         button.innerHTML = alphabet[i];
//
//         div.appendChild(button);
//     }
// }
//
// function guessLetter(button){
//
//     button.setEnabled(false);
//     var guessedLetter = button.value;
//
//     for(var i = 0; i < word.length; i++) {
//         if (word.substring[i] == guessedLetter) {
//             = guessedLetter;
//         } else {
//             guesses--
//         }
//     }
//     guessedLetters += guessedLetter;
//     printWord();
// } // needs re-doing
//
//
// function printWord(){
//     var final = "";
//     for (var i = 0; i < word.length; i++){
//         if (guessedLetters.indexOf(word[i]) >= 0){
//             final += word[i];
//         } else {
//             final += "_"
//         }
//     }
//     return final;
// }
//
//
// function doBackground(category){
//     if(category == "numbers"){
//         .style.backgroundImage = "image/numbers.jpg";
//     }
//     if(category == "VP"){
//         .style.backgroundImage = "image/Vice_Presidents.jpg";
//     }
//     if(category == ""){
//         .style.backgroundImage = "image/IMAGENAME.jpg";
//     }
//     if(category == ""){
//         .style.backgroundImage = "image/IMAGENAME.jpg";
//     }
//     if(category == ""){
//         .style.backgroundImage = "image/IMAGENAME.jpg";
//     }
//     if(category == ""){
//         .style.backgroundImage = "image/IMAGENAME.jpg";
//     }
//     if(category == ""){
//         .style.backgroundImage = "image/IMAGENAME.jpg";
//     }
// } // categories need finishing, images need to be found.



// function getWords(){
//     var wordsByCategories = {
//         FOODANDDRINK: [
//             ""
//         ],
//         LEGENDSANDTALES: [
//             ""
//         ],
//         SLANG: [
//             ""
//         ],
//         WEAPONS: [
//             ""
//         ],
//         BOATS: [
//             "Knarr", "Longships", "Karve", "Nydam", "Oseberg", "Gokstad", "Skip", "Dreki", "Karfi", "Snekkja",
//             "Langskip", "Herskip", "Skeid"
//         ],
//         GODS: [
//             "Aegir", "Balder", "Freyja", "Frigga", "Hel", "Hod", "Loki", "Mimir", "Odin", "Ran", "Thor", "Thrud", "Tyr"
//         ]
//     }
// }