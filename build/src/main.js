"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonClick = void 0;
const BarsDatabase_1 = require("./BarsDatabase");
const ButtonClickEvent_1 = require("./ButtonClickEvent");
const QuizGenerator_1 = require("./QuizGenerator");
const randomNumberGenerator_1 = require("./randomNumberGenerator");
const stillHereBars_1 = require("./stillHereBars");
const Templates_1 = require("./Templates");
const barsDatabase = new BarsDatabase_1.BarsDatabase(stillHereBars_1.stillHereBarsObj);
const quizGenerator = new QuizGenerator_1.QuizGenerator(barsDatabase, randomNumberGenerator_1.randomNumberGenerator);
let currentQuiz;
let score = 0;
let total = 0;
function buttonClick(type) {
    let mainContainer = document.getElementsByClassName("main-container")[0];
    if (type === ButtonClickEvent_1.ButtonClickEvent.PLAY) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates_1.Templates.quizPage(currentQuiz);
    }
    else if (isOption(type)) {
        if (getOptionFromType(type) === currentQuiz.answer) {
            increaseScore();
        }
        increaseTotal();
        nextQuiz(mainContainer);
    }
    else if (type === ButtonClickEvent_1.ButtonClickEvent.SKIP) {
        increaseTotal();
        nextQuiz(mainContainer);
    }
    else if (type === ButtonClickEvent_1.ButtonClickEvent.END) {
        mainContainer.innerHTML = Templates_1.Templates.scorePage(score, total);
    }
    else if (type === ButtonClickEvent_1.ButtonClickEvent.PLAY_AGAIN) {
        window.location.reload();
    }
}
exports.buttonClick = buttonClick;
function nextQuiz(mainContainer) {
    if (questionsRemaining()) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates_1.Templates.quizPage(currentQuiz);
    }
    else {
        mainContainer.innerHTML = Templates_1.Templates.scorePage(score, total);
    }
}
function questionsRemaining() {
    return total !== stillHereBars_1.stillHereBarsCount;
}
function isOption(type) {
    return type === ButtonClickEvent_1.ButtonClickEvent.OPTION_0
        || type === ButtonClickEvent_1.ButtonClickEvent.OPTION_1
        || type === ButtonClickEvent_1.ButtonClickEvent.OPTION_2
        || type === ButtonClickEvent_1.ButtonClickEvent.OPTION_3;
}
function getOptionFromType(type) {
    return (type - 1);
}
function increaseScore() {
    score++;
}
function increaseTotal() {
    total++;
}
