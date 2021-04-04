import { Quiz } from "../../src/Quiz";


test("Quiz value object", () => {
    const quiz1a = new Quiz("question", ["o1", "o2", "o3", "o4"], 1);
    const quiz1b = new Quiz("question", ["o1", "o2", "o3", "o4"], 1);
    const quiz1c = new Quiz("question", ["o2", "o5", "o6", "o1"], 4);
    const quiz2 = new Quiz("question2", ["o1", "o2", "o3", "o4"], 1);

    expect(quiz1a.equals(quiz1b)).toBe(true);
    expect(quiz1a.equals(quiz1c)).toBe(true);
    expect(quiz2.equals(quiz1b)).toBe(false);
});