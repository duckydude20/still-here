import { BarsDatabase } from "./BarsDatabase";
import { ButtonClickEvent } from "./ButtonClickEvent";
import { Quiz } from "./Quiz";
import { QuizGenerator } from "./QuizGenerator";
import { randomNumberGenerator } from "./randomNumberGenerator";
import { stillHereBarsCount, stillHereBarsObj } from "./stillHereBars";
import { Templates } from "./Templates";

const barsDatabase = new BarsDatabase(stillHereBarsObj);
const quizGenerator = new QuizGenerator(barsDatabase, randomNumberGenerator);

let currentQuiz: Quiz;
let score = 0;
let total = 0;

// TODO: remove duplicates
export function buttonClick(type: ButtonClickEvent) {
    let mainContainer = document.getElementsByClassName("main-container")[0] as HTMLElement;

    if (type === ButtonClickEvent.PLAY) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }
    else if (isOption(type)) {
        if (getOptionFromType(type) === currentQuiz.answer) {
            increaseScore();
        }
        increaseTotal();
        nextQuiz(mainContainer);
    }
    else if (type === ButtonClickEvent.SKIP) {
        increaseTotal();
        nextQuiz(mainContainer);
    }

    else if (type === ButtonClickEvent.END) {
        mainContainer.innerHTML = Templates.scorePage(score, total);
    }

    else if (type === ButtonClickEvent.PLAY_AGAIN) {
        window.location.reload();
    }
}

function nextQuiz(mainContainer: HTMLElement) {
    if (questionsRemaining()) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }
    else {
        mainContainer.innerHTML = Templates.scorePage(score, total);
    }
}

function questionsRemaining() {
    return total !== stillHereBarsCount;
}

function isOption(type: ButtonClickEvent) {
    return type === ButtonClickEvent.OPTION_0
        || type === ButtonClickEvent.OPTION_1
        || type === ButtonClickEvent.OPTION_2
        || type === ButtonClickEvent.OPTION_3;
}

function getOptionFromType(type: ButtonClickEvent) {
    return (type - 1);
}

function increaseScore() {
    score++;
}

function increaseTotal() {
    total++;
}
