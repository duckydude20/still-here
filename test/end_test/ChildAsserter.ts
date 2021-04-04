import { ElementHandle } from "puppeteer";


export class ChildAsserter {

    static async assertElement(parent: ElementHandle, position: number, expectedTag: string) {
        const actualTag = await parent.evaluate(function (node: HTMLElement, pos: number) {
            return node.children[pos].tagName
        }, position);

        expect(actualTag).toBe(expectedTag);
    }

    static async assertElementWithText(parent: ElementHandle, position: number, expectedTag: string, expectedText: string) {

        await this.assertElement(parent, position, expectedTag);

        const actualText = await parent.evaluate(function (node: HTMLElement, pos: number) {
            return node.children[pos].textContent
        }, position);

        expect(actualText).toBe(expectedText);
    }

    static async assertChildCount(parent: ElementHandle, expectedCount: number) {
        const actualCount = await parent.evaluate((node: HTMLElement) => node.children.length);
        expect(actualCount).toBe(expectedCount);
    }
}