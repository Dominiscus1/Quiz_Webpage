// ===========
// DATA
// ===========
// Global variable for applicatoin state
var questions = [
    {
        text: "My code quiz question 1",
        choices: ["user choice 1", 'user choice 2', "userchoice 3", "user's final choice"],
        answer: "user choice 1"
    },
    {
        text: "My code quiz question 2",
        choices: ["user choice 1", 'user choice 2', "userchoice 3", "user's final choice"],
        answer: 'user choice 2'
    },
    {
        text: "My code quiz question 3",
        choices: ["user choice 1", 'user choice 2', "userchoice 3", "user's final choice"],
        answer: "user choice 1"
    },
    {
        text: "My code quiz question 4",
        choices: ["user choice 1", 'user choice 2', "userchoice 3", "user's final choice"],
        answer: "user choice 1"
    },
]

var quizQuestionsIndex = 0;
var timerId;
var timeCount = questions.length * 10;

// HTML elements
var startScreenEl = document.getElementById("start-screen");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var questionTextEl = document.getElementById("question-text");
var questionChoicesEl = document.getElementById("choices");
// =============
// MAIN PROCESS
// =============
function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "show");
    // Start timer
    timerId = setInterval(handleTicks, 1000);

    // Ask questions
    askQuestions();
};

function askQuestions() {
    var currentQuestionObj = questions[quizQuestionsIndex];
    console.log(currentQuestionObj);
    var questionTitle = currentQuestionObj.text;

    // Display question text
    questionTextEl.textContent = questionTitle;
    // ?? Display choices
    var questionChoices = currentQuestionObj.choices;
    questionChoicesEl.textContent = questionChoices;
    // Increment index for the next question
    quizQuestionsIndex++;
}


function handleTicks() {
    // Decement time count
    timeCount--;
    // Display time count
    timerEl.textContent = timeCount;
    // Check time count if it reaches 0
    // if timed out, quiz ends
    if (!timeCount) {
        console.log("Time is up");
        clearInterval(timerId);
        // ?? quizEnd
    }
}

startBtn.addEventListener("click", startQuiz);

