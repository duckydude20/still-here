"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
class Quiz {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
    equals(obj) {
        return this.question === obj.question;
    }
}
exports.Quiz = Quiz;
