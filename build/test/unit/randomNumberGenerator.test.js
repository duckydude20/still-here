"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomNumberGenerator_1 = require("../../src/randomNumberGenerator");
test("generates random no. between 0 to given bound", () => {
    expect(randomNumberGenerator_1.randomNumberGenerator(5)).toBeGreaterThanOrEqual(0);
    expect(randomNumberGenerator_1.randomNumberGenerator(5)).toBeLessThan(5);
});
