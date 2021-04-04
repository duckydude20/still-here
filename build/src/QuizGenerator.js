"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizGenerator = void 0;
const Quiz_1 = require("./Quiz");
class QuizGenerator {
    constructor(barsDatabase, numberGenerator) {
        this.database = barsDatabase;
        this.numberGenerator = numberGenerator;
    }
    generate() {
        return this.newQuiz();
    }
    newQuiz() {
        const answerKeyIndex = this.numberGenerator(this.database.getKeyCount());
        const questionIndex = this.numberGenerator(this.database.getValueCount(answerKeyIndex));
        const question = this.database.popValueAt(answerKeyIndex, questionIndex);
        const answerKey = this.database.getKeyAt(answerKeyIndex);
        let options = [answerKey];
        let i = 0;
        while (i < 3) {
            const optionIndex = this.numberGenerator(this.database.getKeyCount());
            const option = this.database.getKeyAt(optionIndex);
            if (!options.includes(option)) {
                options.push(option);
                i++;
            }
        }
        this.shuffle(options);
        return new Quiz_1.Quiz(question, options, options.indexOf(answerKey));
    }
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}
exports.QuizGenerator = QuizGenerator;
