"use strict";

// Select DOM elements
const startBtn = document.getElementById("start-quiz");
const submitBtn = document.getElementById("submit-quiz");
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");

// Question Database
const questions = [
  {
    question: "Who created JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
      d: "Bill Gates",
    },
    correctAnswer: "c",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "npm",
      c: "TypeScript",
      d: "Babel",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Which one of these is the correct form to declare a constant variable?",
    answers: {
      a: "const constant = 0;",
      b: "var constant = 0;",
      c: "let constant = 0;",
      d: "constant = 0;",
    },
    correctAnswer: "a",
  },
];

// hide element
const hideHtmlElement = function (element) {
  element.classList.add("hidden");
};

// show element
const showHtmlElement = function (element) {
  element.classList.remove("hidden");
};

// Create Quiz
const buildQuiz = function () {
  // variable to store the HTML output
  const output = [];

  // for each question...
  questions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (let letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `
          <label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter.toUpperCase()} ) &nbsp;
            ${currentQuestion.answers[letter]}
          </label>
        `
      );
    }

    // add this question and its answers to the output
    output.push(
      `
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
      `
    );
  });

  // combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
};

// Display Results
const showResults = function () {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  questions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].classList.add("right-answer");
    }
    // if answer is wrong or blank
    else {
      answerContainers[questionNumber].classList.add("wrong-answer");
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `How did you do?<br><br>${numCorrect} out of ${questions.length}`;
};

// Start Quiz
startBtn.addEventListener("click", () => {
  // hide start button
  hideHtmlElement(startBtn);

  // hide results
  hideHtmlElement(resultsContainer);

  // build quiz
  buildQuiz();

  // display submit button
  showHtmlElement(submitBtn);
});

// Handle submit event
submitBtn.addEventListener("click", () => {
  // show results
  showResults();
  showHtmlElement(resultsContainer);

  // show start button
  startBtn.innerText = "RESTART";
  showHtmlElement(startBtn);

  // hide submit button
  hideHtmlElement(submitBtn);
});
