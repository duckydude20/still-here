"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildAsserter = void 0;
class ChildAsserter {
    static async assertElement(parent, position, expectedTag) {
        const actualTag = await parent.evaluate(function (node, pos) {
            return node.children[pos].tagName;
        }, position);
        expect(actualTag).toBe(expectedTag);
    }
    static async assertElementWithText(parent, position, expectedTag, expectedText) {
        await this.assertElement(parent, position, expectedTag);
        const actualText = await parent.evaluate(function (node, pos) {
            return node.children[pos].textContent;
        }, position);
        expect(actualText).toBe(expectedText);
    }
    static async assertChildCount(parent, expectedCount) {
        const actualCount = await parent.evaluate((node) => node.children.length);
        expect(actualCount).toBe(expectedCount);
    }
}
exports.ChildAsserter = ChildAsserter;
