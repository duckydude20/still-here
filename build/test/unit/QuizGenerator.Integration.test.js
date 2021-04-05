"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarsDatabase_1 = require("../../src/BarsDatabase");
const QuizGenerator_1 = require("../../src/QuizGenerator");
const randomNumberGenerator_1 = require("../../src/randomNumberGenerator");
test("valid question when Value Count is Zero", () => {
    const obj = {
        "key0": [],
        "key1": [],
        "key2": [
            "key2-value0"
        ],
        "key3": []
    };
    const quizGenerator = new QuizGenerator_1.QuizGenerator(new BarsDatabase_1.BarsDatabase(obj), randomNumberGenerator_1.randomNumberGenerator);
    const quiz = quizGenerator.generate();
    expect(quiz.question).toBe("key2-value0");
});
