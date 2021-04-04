import * as BarsDatabaseModel from "../../src/BarsDatabase";
import { QuizGenerator } from "../../src/QuizGenerator";

const mockGetKeyAt = jest.fn();
const mockPopValueAt = jest.fn();
const mockNumberGenerator = jest.fn();
const mockGetKeyCount = jest.fn();
const mockGetValueCount = jest.fn();

const emptyObj = {}

jest.mock('../../src/BarsDatabase', () => {
    return {
        BarsDatabase: jest.fn(() => {
            return {
                getKeyAt: mockGetKeyAt,
                popValueAt: mockPopValueAt,
                getKeyCount: mockGetKeyCount,
                getValueCount: mockGetValueCount
            };
        })
    };
});

let quizGenerator: QuizGenerator

const mockedModel = BarsDatabaseModel as jest.Mocked<typeof BarsDatabaseModel>;
const barsDatabaseMock = mockedModel.BarsDatabase;

let testNumberGeneratorCount = 0;

beforeEach(() => {
    const barsDatabase = new BarsDatabaseModel.BarsDatabase(emptyObj);
    quizGenerator = new QuizGenerator(barsDatabase, mockNumberGenerator);

    testNumberGeneratorCount = 0;
});

function numberGeneratorTestImplementation() {
    mockNumberGenerator.mockImplementation(function (upperBound: number) {
        return ++testNumberGeneratorCount;
    });
}

function getKeyAtTestImplementation() {
    mockGetKeyAt.mockImplementation(function (index: number) {
        return index.toString();
    });
}

afterEach(() => {
    mockGetKeyCount.mockRestore();
    mockGetValueCount.mockRestore();
    mockNumberGenerator.mockRestore();
    mockGetKeyAt.mockRestore();
    mockPopValueAt.mockRestore();
});

test("calls numberGenerator", () => {
    numberGeneratorTestImplementation();
    getKeyAtTestImplementation();

    mockGetKeyCount.mockReturnValue(4);
    mockGetValueCount.mockReturnValue(3);

    quizGenerator.generate();

    expect(mockNumberGenerator).toHaveBeenCalledTimes(5);
    expect(mockNumberGenerator).toHaveBeenNthCalledWith(1, 4);
    expect(mockNumberGenerator).toHaveBeenNthCalledWith(2, 3);
});

test("generates question", () => {
    numberGeneratorTestImplementation();
    getKeyAtTestImplementation();
    mockPopValueAt.mockReturnValueOnce("key2-value2");

    const quiz = quizGenerator.generate();

    expect(quiz.question).toBe("key2-value2");
    expect(mockPopValueAt).toHaveBeenCalledTimes(1);
    expect(mockPopValueAt).toHaveBeenCalledWith(1, 2);
});

test("generates options", () => {
    mockNumberGenerator.mockReturnValueOnce(5).mockReturnValueOnce(2);

    getKeyAtTestImplementation();

    mockNumberGenerator
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(1);

    const quiz = quizGenerator.generate();

    expect(hasDuplicates(quiz.options)).toBe(false);

    expect(mockNumberGenerator).toHaveBeenCalledTimes(6);
});

test("generate answer", () => {
    mockPopValueAt.mockReturnValueOnce("key2-value2");

    mockGetKeyAt
        .mockReturnValueOnce("key2")
        .mockReturnValueOnce("2")
        .mockReturnValueOnce("3")
        .mockReturnValueOnce("4");

    const quiz = quizGenerator.generate();

    expect(quiz.question).toBe("key2-value2");
    expect(quiz.options).toContain("key2");
    expect(quiz.answer).toBe(quiz.options.indexOf("key2"));
});

test("quiz should be unique", () => {
    numberGeneratorTestImplementation();
    getKeyAtTestImplementation();

    mockPopValueAt.mockReturnValueOnce("key2-value2")
    mockPopValueAt.mockReturnValueOnce("key1-value3")

    const quiz1 = quizGenerator.generate();
    const quiz2 = quizGenerator.generate();

    expect(quiz1.question).not.toBeUndefined();
    expect(quiz2.question).not.toBeUndefined();

    expect(quiz1.equals(quiz2)).toBe(false);

    expect(mockPopValueAt).toHaveBeenCalledTimes(2);
});


function hasDuplicates(array: Array<string>): any {
    // https://stackoverflow.com/a/7376645
    return (new Set(array)).size !== array.length;
}


// https://stackoverflow.com/questions/53502054/mock-imported-class-in-typescript-with-jest
// https://stackoverflow.com/a/58034052

// additional note: https://jestjs.io/docs/mock-functions#custom-matchers
// https://jestjs.io/docs/es6-class-mocks

// https://jestjs.io/docs/es6-class-mocks#spying-on-methods-of-our-class
// https://jestjs.io/docs/es6-class-mocks#mocking-non-default-class-exports

// May be there is a better way to write mocks; i.e using some syntactic sugar;