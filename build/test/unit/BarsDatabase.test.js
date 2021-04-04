"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarsDatabase_1 = require("../../src/BarsDatabase");
const testBars_1 = require("./testBars");
let database;
beforeEach(() => {
    database = new BarsDatabase_1.BarsDatabase(testBars_1.testBarsObj);
});
test("return a key and value at valid position", () => {
    const keyName = database.getKeyAt(4);
    expect(keyName).toBe("key4");
    const value = database.getValueAt(1, 4);
    expect(value).toBe("key1-value4");
});
test("key and value count", () => {
    expect(database.getKeyCount()).toBe(5);
    expect(database.getValueCount(2)).toBe(5);
});
test("get value and remove it", () => {
    expect(database.getKeyCount()).toBe(5);
    expect(database.getValueCount(2)).toBe(5);
    const value = database.popValueAt(2, 3);
    expect(value).toBe("key2-value3");
    expect(database.getValueCount(2)).toBe(4);
});
test("exception at invalid position", () => {
    expect(() => { database.getKeyAt(-1); }).toThrow(RangeError);
    expect(() => { database.getKeyAt(-1); }).toThrow("Key Index out of Bound");
    expect(() => { database.getValueAt(2, 5); }).toThrow(RangeError);
    expect(() => { database.getValueAt(2, 5); }).toThrow("Value Index out of Bound");
});
