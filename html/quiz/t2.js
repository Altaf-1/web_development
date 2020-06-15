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
    question: "<h4>A. Consider the following statements with respect to ‘Hope Spots’:</h4><p><br>1. They are ecologically unique areas of the ocean designated for protection under a global conservation campaign. <br> 2. They can be Marine Protected Areas that need attention or new sites. <br> 3. Presently,no site in India has been designated as Hope Spots. <br> Select the correct answer using the code given below: </p> ",
    choiceW: "1 only",
    choiceX: "Both 1 and 2",
    choiceY: "2 only",
    choiceZ: "1,2 and 3",
    correct: "X"
}, {
    question: "<h4>B. Which of the following species are considered as autogenic ecosystem engineers? </h4><p><br>1. Corals. <br>2. Lianas.<br> 3. Shell forming Molluscs.<br>Select the correct answer using the code given below:</p> ",
    choiceW: "1 and 2",
    choiceX: "2 only",
    choiceY: "1,2 and 3",
    choiceZ: "2 and 3",
    correct: "Y"
}, {
    question: "<h4>C. Consider the following statements with respect to ‘Project Mausam’:</h4><p><br>It aims to conduct research with respect to the onset of the South-West Monsoon in the Indian subcontinent. <br> 2. It will also study the effect of El-Nino and La-Nina on the Indian Monsoon. <br> 3. The project is a joint collaboration between India and the Indian Ocean Rim Association(IORA). <br> Which of the statements given above is/are correct ? </p>",
    choiceW: "1 only",
    choiceX: "2 only",
    choiceY: "3 only",
    choiceZ: "1 & 2",
    correct: "Y"
}, {
    question: "<h4>D. Consider the following statements with respect to the UNESCO:</h4><p>br> 1. It is a specialized agency of the United Nations based in Paris.<br>2. Recently, Russia and Syria left UNESCO.<br> Which of the statements given above is/are correct ? </p>",
    choiceW: "1 only",
    choiceX: "2 only",
    choiceY: "1 and 2",
    choiceZ: "Neither 1 nor 2",
    correct: "W"
}, {
    question: "<h4>E. Consider the following statements with respect to the Panel of Chairpersons of Lok Sabha: </h4><p><br>1. The President nominates from amongst the members of the Lok Sabha, a panel of not more than ten chairpersons. <br> 2. A member of the panel of chairpersons cannot preside over the House, when the office of the Speaker or the Deputy Speaker falls vacant. <br> Which of the statements given above is/are correct ? </p>",
    choiceW: "1 only",
    choiceX: "2 only",
    choiceY: "Both 1 & 2",
    choiceZ: "Neither 1 nor 2",
    correct: "X"
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
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
    if (scorePerCent < 40) {
        alert("I am an alert box!");
    } else if (scorePerCent < 60) {
        alert("I am an alert box!");
    } else if (scorePerCent < 80) {
        alert("I am an alert box!");
    }
}

function myFunction() {
    location.replace("onlinequiz.html")
}