import { BarsDatabase } from "../../src/BarsDatabase";
import { QuizGenerator } from "../../src/QuizGenerator";
import { randomNumberGenerator } from "../../src/randomNumberGenerator";


test("valid question when Value Count is Zero", () => {

    const obj = {
        "key0": [
        ],
        "key1": [
        ],
        "key2": [
            "key2-value0"
        ],
        "key3": [
        ]
    };

    const quizGenerator = new QuizGenerator(new BarsDatabase(obj), randomNumberGenerator);

    const quiz = quizGenerator.generate();

    expect(quiz.question).toBe("key2-value0");
});