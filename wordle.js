const keyboardRow1 = document.getElementById("keyboardRow1");
const keyboardRow2 = document.getElementById("keyboardRow2");
const keyboardRow3 = document.getElementById("keyboardRow3");
const rowPanel = document.getElementById("rowPanel");

const keyboardArray = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Enter","Z","X","C","V","B","N","M","Back"]
]
const keyboardRowArray = [keyboardRow1, keyboardRow2, keyboardRow3];
const wordArray = ["ABUSE", "ADULT", "AGENT", "ANGER"];

var currentBoxId = 0;
var currentWord = "";
var numberOfGuess = 0;
var currentGuess = "";

initApp();

function initApp(){
    currentBoxId = 0;
    currentWord = "";
    numberOfGuess = 0;
    currentGuess = "";

    generateRowPanel();
    generateKeyboard();
    fowardKeystrokes();
    getNewWord();
}

function generateRowPanel(){
    for (let i = 0; i < 6; i++){
        const newBoxRow = document.createElement("div");
        newBoxRow.className = "row justify-content-center mb-1";
        rowPanel.append(newBoxRow);
        for (let j = 0; j < 5; j++){
            const newBox = document.createElement("div");
            newBox.className = "letterBox border me-1";
            newBox.id = "box"+(i*5+j).toString();
            newBoxRow.append(newBox);
        }
    }
}

function generateKeyboard(){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < keyboardArray[i].length; j++){
            let buttonText = keyboardArray[i][j];
            const newButton = document.createElement("button");
            if (buttonText == "Enter" || buttonText == "Back"){
                newButton.className = "btn keyboardLetterBoxBig me-1";
                if (buttonText == "Enter"){

                }
                else{
                    newButton.onclick = function(){removeLetter()};
                }
            }
            else{
                newButton.className = "btn keyboardLetterBox me-1";
                newButton.onclick = function(){inputLetter(newButton.textContent)}
            }
            newButton.type = "button"
            newButton.textContent = buttonText;
            keyboardRowArray[i].append(newButton);
        }
    }
}

function fowardKeystrokes(){
    document.addEventListener('keydown', function(event){
        let key = event.key.toUpperCase();
        if (key == "BACKSPACE"){
            removeLetter();
        }
        else if (key == "ENTER"){
            checkGuess();
        }
        else if (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90 && key.length == 1){
            inputLetter(key);
        }
    });
}

function inputLetter(character){
    if (currentBoxId < (numberOfGuess + 1) * 5){
        let currentBox = document.getElementById("box" + currentBoxId);
        currentBox.textContent = character;
        currentBoxId += 1;
    }
}

function removeLetter(){
    if (currentBoxId <= 0) return;
    currentBoxId -= 1;
    let currentBox = document.getElementById("box" + currentBoxId);
    currentBox.textContent = "";
}

function getNewWord(){
    currentWord = wordArray[getRandomInt(0, wordArray.length)];
    console.log(currentWord);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function checkGuess(){
    //this is checking if we are having a full line of characters (5 chars);
    let lastBox = document.getElementById("box" + (numberOfGuess * 5 + 4));
    if (lastBox.textContent == ""){
        return;
    }
    for (let i = 0; i < 5; i++){
        let box = document.getElementById("box" + (numberOfGuess * 5 + i));
        let boxCharacter = box.textContent;
        if (boxCharacter == currentWord[i]){
            console.log("Green");
        }
        else if (currentWord.indexOf(boxCharacter) > -1) {
            console.log("Yellow");
        }
        else {
            console.log("Grey");
        }
    }
}







