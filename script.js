// Goal: all questions in an array and cycle through them 

// links to HTML
var questionTitle = document.getElementById('question-title');  
var questionChoices = document.getElementById("choices"); 
var beginningScreen = document.getElementById('beginning-screen'); 
var startButton = document.getElementById("start-button"); 
var timerId = document.getElementById("score-counter");  
var endScreen = document.getElementById('end-screen'); 
var initialsInput = document.getElementById('initials-input'); 

//Global Variables 
var questionIndex = 0; 
var timerCount = 60; 
var isWin = false; 

timerId.textContent = "Score: " + timerCount;
// Question Objects to cycle through, 6 questions total 
var question1 =
    {
        title:"What is the command we use to create a new file in the command line?", 
        choices:['touch' , 'cd' , 'mkdir' , 'pwd'], 
        answer:'touch', 
    }  
var question2 =
    {
        title: "Which of the following is not a component of the box model?", 
        choices: ['The Content', 'The Display Property', 'The Border Property', 'The Padding Property'], 
        answer: 'The Display Property', 
    }
var question3 = 
    {
        title:"Which of the following must be done in order to use `git init`?", 
        choices: ["You must run 'git status' to check the status of your repository before running 'git init'." , "You must add and commit files before running 'git init'.", "You must have a repository created on GitHub before using 'git init'.", "You must be in you rproject folder when you run 'git init'."], 
        answer: "You must be in you rproject folder when you run 'git init'.", 
    }
var question4 =
    {
        title: "In JavaScript, what operator is used to assign a value to a declared variable?", 
        choices: ["Equal sign (=)", "Colon (:)", "Double-equal (==)", "Question Mark (?)"], 
        answer: "Equal sign (=)", 
    }
var question5 =
    {
        title: "How do we declare a conditional statement in JavaScript?", 
        choices: ["for loop", "while loop", "if ... else", "difference ... between"], 
        answer: "if ... else", 
    }
var question6 =
    {
        title: "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']", 
        choices: ['0', '1', '2', '3'], 
        answer: "1", 
    }
// Array of all questions  
var allQuestions = [question1, question2, question3, question4, question5, question6]; 

// This starts the game 
startButton.onclick = startGame; 

function startGame() {
    countdown(); 
    //change screens - hide the start screen 
    beginningScreen.setAttribute("style", 'display:none');
    //unhide the question screen 
    questionTitle.setAttribute("style", "display:block");  
    questionChoices.setAttribute("style", "display:block"); 
    // call the question function 
    question();   
}

function question() {
    //links activeQuestion to question1 from question array 
    var activeQuestion = allQuestions[0]; 
    //displays title from question1 
    questionTitle.textContent = activeQuestion.title;
    //creates buttons for each choice option 
    activeQuestion.choices.forEach(function(choice) {
        var eachChoice = document.createElement("button"); 
        eachChoice.setAttribute("class", 'choice');  
        eachChoice.setAttribute("value", choice);
        eachChoice.textContent = choice; 
        eachChoice.onclick = questionClick;
        questionChoices.append(eachChoice); 
    }); 
}

function questionClick() {
    //if statement to check correct value / if correct go to the next question if not, substract time 
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
    timer = setInterval(function() {
        timerCount--;
        timerId.textContent = "Score: " + timerCount; 
        if (isWin && timerCount >= 0) {
            //stops the timer and goes to the quizOver screen 
            clearInterval(timer); 
            quizOver(); 
        } 
        //when timer reaches 0, go to quizOver screen 
        if (timerCount === 0) {
            //stops the timer and goes to the quizOver screen 
            clearInterval(timer); 
            quizOver(); 
        }
    }, 1000);  
}

function highScore() {
    //local Storage 
    //save both initials and score into an object then push them into the local storage 
    //control info into string before pushing it into local storage 
    //var userInitals 
}