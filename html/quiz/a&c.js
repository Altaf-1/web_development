// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceW = document.getElementById("W");
const choiceX = document.getElementById("X");
const choiceY = document.getElementById("Y");
const choiceZ = document.getElementById("Z");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const end = document.getElementById("end");

// create our questions 
let questions = [{
    question: "<h4>A. Consider the following statements with reference to the Mughal empire:</h4><p><br>1. The Mughal economy was largely dependent on the income from agriculture.<br>2. Along with agriculture, the peasants under the Mughal state also adopted the jajmani system. <br> Select the correct answer using the code given below:</p> ",
    choiceW: "1 only",
    choiceX: "Both 1 and 2",
    choiceY: "2 only",
    choiceZ: "Neither 1 nor 2",
    correct: "X"
}, {
    question: "<h4>B. Which of the following was/were prevalent during the Rig Vedic age?</h4><p><br>1. Owning land as a private property. <br>2. Knowledge of agriculture. <br>3. Awareness of metallurgical operations.<br>Select the correct answer using the code given below:</p> ",
    choiceW: "1 and 2",
    choiceX: "2 only",
    choiceY: "1,2 and 3",
    choiceZ: "2 and 3",
    correct: "Z"
}, {
    question: "<h4>C. Consider the following statements with respect to ‘Mohiniattam’, a classical dance form of India: </h4><p><br>1. It is a solo classical dance form of Tamil Nadu, performed by women. <br>2. It is interpreted as the dance of ‘mohini’, the female form taken by Vishnu to kill Bhasmasura. <br> 3. It belongs to the ‘lasya’ style, which is feminine, tender and graceful. <br> Which of the statements given above is/are correct? </p>",
    choiceW: "1 only",
    choiceX: "2 only",
    choiceY: "2 & 3",
    choiceZ: "None of the above",
    correct: "Y"
}, {
    question: "<h4>D. Recently, the Prime Minister named ‘Rohtang tunnel’ as ‘Atal Tunnel’. Consider the following statements in this context: <br> 1. The Rohtang Tunnel is constructed through the Karakoram range.<br>2. It is being built through a joint collaboration of India and China. <br> Which of the statements given above is/are correct ? </p>",
    choiceW: "1 only",
    choiceX: "2 only",
    choiceY: "1 and 2",
    choiceZ: "Neither 1 nor 2",
    correct: "Z"
}, {
    question: "<h4>E. Consider the following statements regarding ‘minar’, a common feature of stambha or tower in the Indian subcontinent:</h4><p><br>1. The phenomenal height of a minar, symbolized the might and power of the ruler. <br>2. The minar was also used for everyday activities like the azaan or call to prayer.<br>Which of the statements given above is/are correct ?</p>",
    choiceW: "1 only",
    choiceX: "2 only",
    choiceY: "Both 1 & 2",
    choiceZ: "Neither 1 nor 2",
    correct: "Y"
}];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 120; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceW.innerHTML = q.choiceW;
    choiceX.innerHTML = q.choiceX;
    choiceY.innerHTML = q.choiceY;
    choiceZ.innerHTML = q.choiceZ;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);
    
    if (scorePerCent < 40) {
        Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="onlinequiz.html">GO HOME</a>'
    });
    } else if (scorePerCent < 60) {
        Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="onlinequiz.html">GO HOME</a>'
    });
    } else if (scorePerCent < 80) {
        Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="onlinequiz.html">GO HOME</a>'
    });
}

function myFunction() {
    location.replace("onlinequiz.html")
}
