import { randomNumberGenerator } from "../../src/randomNumberGenerator";


test("generates random no. between 0 to given bound", () => {
    expect(randomNumberGenerator(5)).toBeGreaterThanOrEqual(0);
    expect(randomNumberGenerator(5)).toBeLessThan(5);
});