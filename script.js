// links to HTML
var questionTitle = document.getElementById('question-title');  
var questionChoices = document.getElementById("choices"); 
var beginningScreen = document.getElementById('beginning-screen'); 
var startButton = document.getElementById("start-button"); 
var timerId = document.getElementById("score-counter");  
var endScreen = document.getElementById('end-screen'); 
var initialsInput = document.getElementById('initials-input'); 
var highscoreScreen = document.getElementById("highscore-screen"); 
var highscoreBtn = document.getElementById("view-highscores-btn"); 

//Global Variables  
var timerCount = 60; 
var isWin = false; 
var input; 

timerId.textContent = "Score: " + timerCount;
// Question Objects to cycle through, 6 questions total 
var myQuestions = [
    { //questionIndex = 0
        title:"Inside which HTML element do we put the JavaScript?", 
        choices:['<style>' , '<head>' , '<meta>' , '<script>'], 
        answer:'<script>', 
    },
    { //questionIndex = 1
        title: "Which of the following is not a JavaScript Data Types?", 
        choices: ['Undefined', 'Number', 'Boolean', 'Float'], 
        answer: 'Float', 
    },
    { //questionIndex = 2
        title: "In JavaScript, what operator is used to assign a value to a declared variable?", 
        choices: ["Equal sign (=)", "Colon (:)", "Double-equal (==)", "Question Mark (?)"], 
        answer: "Equal sign (=)", 
    },
    { //questionIndex = 3
        title: "How do we declare a conditional statement in JavaScript?", 
        choices: ["for loop", "while loop", "if ... else", "difference ... between"], 
        answer: "if ... else", 
    },
    { //questionIndex = 4
        title: "From the given array which index is the letter 'b' on?   ['a', 'b', 'c', 'd']", 
        choices: ['0', '1', '2', '3'], 
        answer: "1", 
    }
];

// This starts the game 
startButton.onclick = startGame; 

function startGame() {
    //calls the countdown function 
    countdown(); 
    timerCount = 60; 
    isWin = false; 
    questionIndex = 0; 
    //change screens - hide the start screen 
    beginningScreen.setAttribute("style", 'display:none');
    highscoreScreen.setAttribute("style", "display:none"); 
    //unhide the question screen 
    questionTitle.setAttribute("style", "display:block");  
    questionChoices.setAttribute("style", "display:block"); 
    // call the question function 
    showQuestion();   
} 

//controls countdown timer and score 
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
var questionIndex = 0;
//links activeQuestion to myQuestions Array 
var activeQuestion = {
    title: myQuestions[questionIndex].title, 
    choices: myQuestions[questionIndex].choices, 
    answer:myQuestions[questionIndex].answer,
}

function showQuestion() {  
    //displays title of active Question 
    questionTitle.textContent = activeQuestion.title;  

    //creates buttons for each choice option  
    activeQuestion.choices.forEach(function(choice) {
        var eachChoice = document.createElement("button"); 
        eachChoice.setAttribute("class", 'user-choice');  
        eachChoice.setAttribute("value", choice);  
        eachChoice.textContent = choice; 
        eachChoice.addEventListener('click', function(event){
            userChoice = event.target.value;
            questionClick(); 
        });  
        questionChoices.append(eachChoice);    
    })  
} 

function questionClick() {
    //if statement to check correct value / if correct go to the next question if not, substract time   
    if (userChoice == activeQuestion.answer) {
        //timer adds 20 seconds
        timerCount += 20; 
        //adds +1 to question Index  
        questionIndex++; 
        if (questionIndex === myQuestions.length) {
            isWin = true;
            timerId.textContent = "Score: " + timerCount; 
            quizOver(); 
        }
        console.log(questionIndex); 
        //updates the active question 
        activeQuestion = myQuestions[questionIndex]; 
        //So that the choices update but do not show up as text 
        questionChoices.textContent = " ";
        //calls the showQuestion function 
        showQuestion(); 
    } else {
        timerCount -= 5;  
        var whoopsText = document.createElement('p'); 
        whoopsText.textContent = "Whoops! Try Again!"; 
        whoopsText.setAttribute('style', 'color:red; font-size:1em;'); 
        questionTitle.append(whoopsText); 
    } 
}

function quizOver() {
    //stop timer
    clearInterval(timer); 
    //hide question screen  
    questionTitle.setAttribute("style", 'display:none');
    questionChoices.setAttribute("style", 'display:none');
    //show end screen 
    endScreen.setAttribute("style", 'display:block');
    //Game Over Text 
    var endScreenText = document.createElement('h1'); 
    endScreenText.textContent = "Game Over!"; 
    endScreen.append(endScreenText); 
    //initials Input 
    initialsInput.setAttribute("style", 'display:block'); 
    var initialsText = document.createElement('p'); 
    initialsText.textContent = "Enter your initials below to save your Highscore!"; 
    initialsInput.append(initialsText); 
    //Input Area 
    input = document.createElement("input");     
    initialsInput.append(input);   
    //created add button 
    var addBtn = document.createElement("button");  
    addBtn.textContent = "Add"; 
    initialsInput.append(addBtn); 
    //calls highScore function when user presses Add 
    addBtn.onclick = highScore; 
}
//empty object to store multiple players scores in 
var highScoreObject = {
    players:[], 
    scores:[], 
}

function highScore() { 
    //hide initial's input screen 
    initialsInput.setAttribute('style', 'display:none'); 
    //create userInitials 
    userInitials = input.value;  
    //create userScore 
    userScore = timerCount; 
    //adds userInitials and Scores to highScoreObject 
    highScoreObject.players.push(userInitials);
    highScoreObject.scores.push(timerCount);  
    //add Player Initials and Score to local storage 
    localStorage.setItem("initials", highScoreObject.players); 
    localStorage.setItem("score", highScoreObject.scores);  
    //Final Score Text 
    var finalScoreText = document.createElement('p'); 
    finalScoreText.textContent = userInitials + "'s final score is: " + timerCount + "."; 
    endScreen.append(finalScoreText); 
    //OK button 
    var btn = document.createElement('button'); 
    btn.textContent = "Ok"; 
    endScreen.append(btn); 
    btn.onclick = viewHighScore; 
}; 

function viewHighScore() {
    // hides current screen  
    beginningScreen.setAttribute('style', 'display:none'); 
    endScreen.setAttribute('style', 'display:none'); 
    initialsInput.setAttribute('style', 'display:none'); 
    //displays High Score Screen 
    highscoreScreen.setAttribute('style', 'display:block'); 
    //Top Scorers: 
    var topScorers = document.createElement('h1'); 
    topScorers.textContent = "Top Scores:"; 
    highscoreScreen.append(topScorers); 
    //shows score 
    var topScoresInfo = document.createElement('p'); 
    topScoresInfo.textContent = localStorage.getItem('initials') + ": " + localStorage.getItem('score');  
    highscoreScreen.append(topScoresInfo);  
}

//When you click on the View Highscores text, it takes you to the Highscores page 
highscoreBtn.onclick = viewHighScore; 
