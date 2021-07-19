// Goal: all questions in an array and cycle through them 

// links to HTML
var questionTitle = document.getElementById('question-title');  
var questionChoices = document.getElementById("choices"); 
var beginningScreen = document.getElementById('beginning-screen'); 
var startButton = document.getElementById("start-button"); 
var timerId = document.getElementById("score-counter");  
var endScreen = document.getElementById('end-screen'); 
var initialsInput = document.getElementById('initials-input'); 
var userInput = document.getElementsByClassName('user-input'); 
var highscoreScreen = document.getElementById("highscore-screen"); 
var highscoreBtn = document.getElementById("view-highscore-btn"); 

//Global Variables  
var timerCount = 10; 
var isWin = false;  
var input; 
var scores; 

timerId.textContent = "Score: " + timerCount;
// Question Objects to cycle through, 6 questions total 
var myQuestions = [
    {
        title:"What is the command we use to create a new file in the command line?", 
        choices:['touch' , 'cd' , 'mkdir' , 'pwd'], 
        answer:'touch', 
    },
    {
        title: "Which of the following is not a component of the box model?", 
        choices: ['The Content', 'The Display Property', 'The Border Property', 'The Padding Property'], 
        answer: 'The Display Property', 
    },
    {
        title:"Which of the following must be done in order to use `git init`?", 
        choices: ["You must run 'git status' to check the status of your repository before running 'git init'." , "You must add and commit files before running 'git init'.", "You must have a repository created on GitHub before using 'git init'.", "You must be in you rproject folder when you run 'git init'."], 
        answer: "You must be in you rproject folder when you run 'git init'.", 
    },
    {
        title: "In JavaScript, what operator is used to assign a value to a declared variable?", 
        choices: ["Equal sign (=)", "Colon (:)", "Double-equal (==)", "Question Mark (?)"], 
        answer: "Equal sign (=)", 
    },
    {
        title: "How do we declare a conditional statement in JavaScript?", 
        choices: ["for loop", "while loop", "if ... else", "difference ... between"], 
        answer: "if ... else", 
    },
    {
        title: "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']", 
        choices: ['0', '1', '2', '3'], 
        answer: "1", 
    }
];

//start game with question 1
var questionIndex = 0;
//links activeQuestion to question1 from question array
var activeQuestion = myQuestions[questionIndex];
 
// This starts the game 
startButton.onclick = startGame; 

function startGame() {
    countdown(); 
    isWin = false; 
    //change screens - hide the start screen 
    beginningScreen.setAttribute("style", 'display:none');
    //unhide the question screen 
    questionTitle.setAttribute("style", "display:block");  
    questionChoices.setAttribute("style", "display:block"); 
    // call the question function 
    showQuestion();   
} 

function showQuestion() { 
    //displays title from question1 
    questionTitle.textContent = activeQuestion.title;
    //creates buttons for each choice option  
    activeQuestion.choices.forEach(function(choice) {
        eachChoice = document.createElement("button"); 
        eachChoice.setAttribute("class", 'user-choice');  
        eachChoice.setAttribute("value", choice); 
        //this works, how can I pass this value into questionClick function!?!  
        eachChoice.textContent = choice; 
        eachChoice.addEventListener('click', questionClick);  
        questionChoices.append(eachChoice);   
    })
} 

function questionClick() {
    //not working...   
    //var userChoice = 
    console.log(activeQuestion.choice); 
    console.log(activeQuestion.value); 
    //if statement to check correct value / if correct go to the next question if not, substract time  
    if (activeQuestion.choice === activeQuestion.answer) {
        timerCount += 20; 
        //moves to the next question 
        questionIndex++;   
        console.log(questionIndex); 
        showQuestion; 
    } else {
        timerCount -= 5;  
        var whoopsText = document.createElement('p'); 
        whoopsText.textContent = "Whoops! Try Again!"; 
        whoopsText.setAttribute('style', 'color:red; font-size:1em;'); 
        questionTitle.append(whoopsText); 
    }
    if (questionIndex === myQuestions.length) {
        isWin = true; 
        quizOver; 
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
    //Final Score Text 
    var finalScoreText = document.createElement('p'); 
    finalScoreText.textContent = "Your final score is: " + timerCount + "."; 
    endScreen.append(finalScoreText); 
    //initials Input 
    initialsInput.setAttribute("style", 'display:block'); 
    var initialsText = document.createElement('p'); 
    initialsText.textContent = "Enter your initials below to save your Highscore!"; 
    initialsInput.append(initialsText); 
    //Input Area 
    input = document.createElement("input");    
    initialsInput.append(input); 
    //created add button 
    var initialsBtn = document.createElement("button");  
    initialsBtn.textContent = "Add"; 
    initialsInput.append(initialsBtn); 
    //calls highScore function when user presses Add 
    initialsBtn.onclick = highScore; 
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

function viewHighScore() {
    //when you click on view highscores it: 
    // hides current screen  
    beginningScreen.setAttribute('style', 'display:none'); 
    endScreen.setAttribute('style', 'display:none'); 
    initialsInput.setAttribute('style', 'display:none'); 
    //displays High Score Screen 
    highscoreScreen.setAttribute('style', 'display:block'); 
    var topScorers = document.createElement('h1'); 
    topScorers.textContent = "Top Scores:"; 
    highscoreScreen.append(topScorers); 
    var topScoresInfo = document.createElement('p'); 
    topScoresInfo.textContent = localStorage.getItem('initials') + ": " + localStorage.getItem('score'); 
    highscoreScreen.append(topScoresInfo); 
}

//highscoreBtn.onclick = viewHighScore; 

var highScoreObject = {
    initials:[], 
    userScore:[], 
}

function highScore() { 
    //save both initials and score into an object then push them into the local storage 
    userInitials = input.value; 
    highScoreObject.initials.push(userInitials); 
    highScoreObject.userScore.push(timerCount); 
    //highScoreObject.userScore = localStorage.getItem('score'); 
    for (i = 0; i < 5; i++) {
        initialsInput.textContent = highScoreObject.initials + ": " + highScoreObject.userScore;
        localStorage.setItem("initials", userInitials); 
        localStorage.setItem("score", timerCount);  
    }
    var btn = document.createElement('button'); 
    btn.textContent = "Ok"; 
    initialsInput.append(btn); 
    btn.onclick = viewHighScore; 
}; 