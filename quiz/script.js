"use strict";

// Select DOM elements
const startBtn = document.getElementById("start-quiz");
const submitBtn = document.getElementById("submit-quiz");
const quizContainer = document.getElementById("quiz");

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

// toggle hide/show element
const toggleDisplayElement = function (element) {
  element.classList.toggle("hidden");
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
            <input type="radio" name="question${questionNumber}" value"${letter}">
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

startBtn.addEventListener("click", () => {
  // hide start button
  toggleDisplayElement(startBtn);

  // build quiz
  buildQuiz();

  // display submit button
  toggleDisplayElement(submitBtn);
});
