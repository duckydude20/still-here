"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarsDatabase = void 0;
class BarsDatabase {
    constructor(barsObj) {
        this.barsObject = barsObj;
    }
    getKeyCount() {
        return Object.keys(this.barsObject).length;
    }
    getValueCount(keyIndex) {
        const key = this.getKeyAt(keyIndex);
        const valueArray = this.barsObject[key];
        return valueArray.length;
    }
    getKeyAt(index) {
        const key = Object.keys(this.barsObject)[index];
        if (key === undefined) {
            throw new RangeError("Key Index out of Bound");
        }
        return key;
    }
    getValueAt(keyIndex, valueIndex) {
        const key = this.getKeyAt(keyIndex);
        const valueArray = this.barsObject[key];
        const value = valueArray[valueIndex];
        if (value === undefined) {
            throw new RangeError("Value Index out of Bound");
        }
        return value;
    }
    popValueAt(keyIndex, valueIndex) {
        const key = this.getKeyAt(keyIndex);
        const valueArray = this.barsObject[key];
        const value = valueArray[valueIndex];
        if (value === undefined) {
            throw new RangeError("Value Index out of Bound");
        }
        valueArray.splice(valueIndex, 1);
        return value;
    }
}
exports.BarsDatabase = BarsDatabase;
