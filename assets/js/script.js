const questions = [
    {
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "Which method creates a new array by transforming each element?",
        options: ["forEach()", "map()", "push()", "pop()"],
        answer: "map()"
    },
    {
        question: "Which symbol is used for an arrow function?",
        options: ["=>", "->", "::", "**"],
        answer: "=>"
    },
    {
        question: "Which operator checks both value and type?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        question: "Which array method adds an element to the end?",
        options: ["shift()", "pop()", "unshift()", "push()"],
        answer: "push()"
    },
    {
        question: "Which method removes the last element from an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: "pop()"
    },
    {
        question: "What is the result of typeof null in JavaScript?",
        options: ["'null'", "'object'", "'undefined'", "'boolean'"],
        answer: "'object'"
    },
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
        answer: "JSON.parse()"
    },
    {
        question: "Which of these is NOT a JavaScript data type?",
        options: ["Symbol", "BigInt", "Float", "Boolean"],
        answer: "Float"
    },
    {
        question: "Which method is used to attach an event handler to an element?",
        options: ["addEvent()", "attachEvent()", "addEventListener()", "onEvent()"],
        answer: "addEventListener()"
    }
];

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionCountElement = document.getElementById("question-count");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const showQuestion = () => {
    hasAnswered = false;
    const questionData = questions[currentQuestion];
    const questionText = questionData.question;
    const options = questionData.options;

    questionElement.textContent = questionText;
    questionCountElement.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
    scoreElement.textContent = "Score: " + score;
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    nextButton.disabled = true;
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "See Results";
    } else {
        nextButton.textContent = "Next Question";
    }

    optionsElement.innerHTML = "";
    options.forEach((option) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option;
        button.type = "button";
        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });
        optionsElement.appendChild(button);
    });
};
const checkAnswer = (selectedButton, selectedOption) => {
    if (hasAnswered) {
        return;
    }
    hasAnswered = true;
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
        score = score + 1;
        selectedButton.classList.add("correct");
        feedbackElement.textContent = "Correct! Great job";
        feedbackElement.className = "feedback success";
    } else {
        selectedButton.classList.add("wrong");
        feedbackElement.textContent = "Incorrect! Answer: " + correctAnswer;
        feedbackElement.className = "feedback error";
    }
    const allButtons = optionsElement.querySelectorAll(".option-btn");
    allButtons.forEach((button) => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });
    scoreElement.textContent = "Score: " + score;
    nextButton.disabled = false;
};
const showResults = () => {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    const percentage = Math.round((score / questions.length) * 100);
    finalScore.textContent = score + " / " + questions.length + " (" + percentage + "%)";

    if (percentage >= 80) {
        resultMessage.textContent = "Excellent! You know your JavaScript well.";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good effort! Keep practicing.";
    } else {
        resultMessage.textContent = "Keep learning! Practice makes progress.";
    }

    localStorage.setItem("quizResult", JSON.stringify({ score: score, total: questions.length, result: resultMessage.textContent }));
};
const nextQuestion = () => {
    currentQuestion = currentQuestion + 1;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
};
const restartQuiz = () => {
    currentQuestion = 0;
    score = 0;
    hasAnswered = false;
    quizScreen.hidden = false;
    resultScreen.hidden = true;
    showQuestion();
};
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
showQuestion();