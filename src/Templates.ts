import { Quiz } from "./Quiz";
import * as PlayTemplate from "./templates/PlayTemplate";
import * as QuizTemplate from "./templates/QuizTemplate";
import * as ScoreTemplate from "./templates/ScoreTemplate";

export class Templates {
    private constructor() {
    }

    static startingPage(): string {
        return PlayTemplate.templateString();
    }

    static quizPage(quiz: Quiz): string {
        return QuizTemplate.templateString(quiz);
    }

    static scorePage(score: number, total: number): string {
        return ScoreTemplate.templateString(score, total);
    }

    // https://stackoverflow.com/questions/23296094
    // myBundle: browserify bundle name
    // to change; see bundle command in package.json

}