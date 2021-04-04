"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BarsDatabaseModel = __importStar(require("../../src/BarsDatabase"));
const QuizGenerator_1 = require("../../src/QuizGenerator");
const mockGetKeyAt = jest.fn();
const mockPopValueAt = jest.fn();
const mockNumberGenerator = jest.fn();
const mockGetKeyCount = jest.fn();
const mockGetValueCount = jest.fn();
const emptyObj = {};
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
let quizGenerator;
const mockedModel = BarsDatabaseModel;
const barsDatabaseMock = mockedModel.BarsDatabase;
let testNumberGeneratorCount = 0;
beforeEach(() => {
    const barsDatabase = new BarsDatabaseModel.BarsDatabase(emptyObj);
    quizGenerator = new QuizGenerator_1.QuizGenerator(barsDatabase, mockNumberGenerator);
    testNumberGeneratorCount = 0;
});
function numberGeneratorTestImplementation() {
    mockNumberGenerator.mockImplementation(function (upperBound) {
        return ++testNumberGeneratorCount;
    });
}
function getKeyAtTestImplementation() {
    mockGetKeyAt.mockImplementation(function (index) {
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
    mockPopValueAt.mockReturnValueOnce("key2-value2");
    mockPopValueAt.mockReturnValueOnce("key1-value3");
    const quiz1 = quizGenerator.generate();
    const quiz2 = quizGenerator.generate();
    expect(quiz1.question).not.toBeUndefined();
    expect(quiz2.question).not.toBeUndefined();
    expect(quiz1.equals(quiz2)).toBe(false);
    expect(mockPopValueAt).toHaveBeenCalledTimes(2);
});
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}
