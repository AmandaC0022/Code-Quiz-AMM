// all questions in an array and cycle through them 

// an array of objects 

// question object 
//     questions 
//     choices
//     answers

// var questions = [
//     {
//         title: "Question you ask",
//         choices: ["choice 1", "choice 2"],
//         answer: "choice 1"
//     }
// ]
// TODO: Create global variable for start button
startButton.onclick = startGame; 

var questionIndex = 0; 

var time = 60; 

var timerId; 

// TO DO: ADD ID TO HTML
var allChoices = document.getElementById("choices"); 

//create global variables that link to elements in the HTML 
var startButton = document.getElementById("start-button"); 

function startGame() {
    //start the countdown timer 
    //change screens - hide the start screen 
    // unhide the question screen 
    // call the question function 

}

function question() {
    var activeQuestion = questions[questionIndex]; 

    // TO DO: ADD ID TO HTML
    var questionTitle = document.getElementById('question-title'); 
    questionTitle.textContent = activeQuestion.title; 

    activeQuestion.choices.forEach(function(choice) {
        var eachChoice = document.createElement("button"); 
        eachChoice.setAttribute("class", 'choice'); 
        eachChoice.setAttribute("value", choice);
        eachChoice.textContent = choice; 
        eachChoice.onclick = questionClick;
        allChoices.append(eachChoice); 
    }); 
}

function questionClick() {
    //if statement to check correct value / if correct go to the next question if not, substract time 
    //if time reaches 0, game over 
    //if question is right, add time to timeclock 
    //shows user if answer is correct or not 
//questionIndex++; - that moves to the next index of the array 
//if questionIndex = questionIndex.length then ends game 
}

function quizOver() {
    //stop timer
    //show end screen 
    //hide question screen 
    //give user final score 
}

function countdown() {
    //controls the timer 
    //when timer reaches 0, go to quizOver screen 
}

function highScore() {
    //local Storage 
    //save both initials and score into an object then push them into the local storage 
    //control info into string before pushing it into local storage 
    //var userInitals 
}