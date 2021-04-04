import { BarsDatabase } from "../../src/BarsDatabase";
import { testBarsObj } from "./testBars";

let database: BarsDatabase;

beforeEach(() => {
    database = new BarsDatabase(testBarsObj);
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

// https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest

test("exception at invalid position", () => {
    expect(() => { database.getKeyAt(-1) }).toThrow(RangeError);
    expect(() => { database.getKeyAt(-1) }).toThrow("Key Index out of Bound");

    expect(() => { database.getValueAt(2, 5) }).toThrow(RangeError);
    expect(() => { database.getValueAt(2, 5) }).toThrow("Value Index out of Bound");
});

