"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const BarsDatabase_1 = require("../../src/BarsDatabase");
const stillHereBars_1 = require("../../src/stillHereBars");
const ChildAsserter_1 = require("./ChildAsserter");
class Driver {
    async goto(url) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        this.mainContainer = await this.getMainContainer();
    }
    async isStartingPage() {
        await ChildAsserter_1.ChildAsserter.assertChildCount(this.mainContainer, 2);
        await this.pageShouldHavePlayButton();
    }
    async pageShouldHavePlayButton() {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);
        await ChildAsserter_1.ChildAsserter.assertElementWithText(inner_item, 0, 'BUTTON', "Play");
    }
    async clickOnPlayButton() {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);
        const playButton = await this.getChild(inner_item, 0);
        await playButton.click();
        await this.waitForLoading();
    }
    async isQuizPage() {
        await ChildAsserter_1.ChildAsserter.assertChildCount(this.mainContainer, 7);
        await this.pageShouldHaveAQuestion();
        await this.pageShouldHaveOptions();
        await this.pageShouldHaveEndAndSkip();
    }
    async pageShouldHaveAQuestion() {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);
        await ChildAsserter_1.ChildAsserter.assertElement(inner_item, 0, 'SPAN');
    }
    async pageShouldHaveOptions() {
        await ChildAsserter_1.ChildAsserter.assertElement(this.mainContainer, 2, 'DIV');
        await ChildAsserter_1.ChildAsserter.assertElement(this.mainContainer, 3, 'DIV');
        await ChildAsserter_1.ChildAsserter.assertElement(this.mainContainer, 4, 'DIV');
        await ChildAsserter_1.ChildAsserter.assertElement(this.mainContainer, 5, 'DIV');
    }
    async pageShouldHaveEndAndSkip() {
        const container_item = await this.getChild(this.mainContainer, 6);
        const inner_item = await this.getChild(container_item, 0);
        await ChildAsserter_1.ChildAsserter.assertElementWithText(inner_item, 0, 'BUTTON', "End");
        await ChildAsserter_1.ChildAsserter.assertElementWithText(inner_item, 1, 'BUTTON', "Skip");
    }
    async clickOnRightOption() {
        const question_container_item = await this.getChild(this.mainContainer, 1);
        const question = await this.getInnerTextOfChild(question_container_item, 0);
        const answer = this.getAnswerKey(question);
        let rightOption = -1;
        for (let i = 2; i <= 5; i++) {
            const optionText = await this.getInnerTextOfChild(this.mainContainer, i);
            if (optionText === answer) {
                rightOption = i;
            }
        }
        const answer_container_item = await this.getChild(this.mainContainer, rightOption);
        const answer_inner_item = await this.getChild(answer_container_item, 0);
        const rightOptionElement = await this.getChild(answer_inner_item, 0);
        rightOptionElement.click();
        await this.waitForLoading();
    }
    getAnswerKey(q) {
        const question = q.replace(/\n/g, " ");
        const barsDatabase = new BarsDatabase_1.BarsDatabase(stillHereBars_1.stillHereBarsObj);
        for (let i = 0; i < barsDatabase.getKeyCount(); i++) {
            for (let j = 0; j < barsDatabase.getValueCount(i); j++) {
                const currentValue = barsDatabase.getValueAt(i, j).replace(/\n\s+/g, " ");
                if (question === currentValue) {
                    return barsDatabase.getKeyAt(i).toUpperCase();
                }
            }
        }
        throw new Error("Answer Not found");
    }
    async clickOnSkipButton() {
        const container_item = await this.getChild(this.mainContainer, 6);
        const inner_item = await this.getChild(container_item, 0);
        const skipButton = await this.getChild(inner_item, 1);
        await skipButton.click();
        await this.waitForLoading();
    }
    async clickOnEndButton() {
        const container_item = await this.getChild(this.mainContainer, 6);
        const inner_item = await this.getChild(container_item, 0);
        const endButton = await this.getChild(inner_item, 0);
        await endButton.click();
        await this.waitForLoading();
    }
    async isScorePageWithScore(score, total) {
        await ChildAsserter_1.ChildAsserter.assertChildCount(this.mainContainer, 4);
        await this.pageHaveScore(score, total);
    }
    async pageHaveScore(score, total) {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);
        await ChildAsserter_1.ChildAsserter.assertElementWithText(inner_item, 1, 'SPAN', `${score}/${total}`);
    }
    async clickOnPlayAgain() {
        const container_item = await this.getChild(this.mainContainer, 3);
        const inner_item = await this.getChild(container_item, 0);
        const playAgainButton = await this.getChild(inner_item, 0);
        await playAgainButton.click();
        await this.reloadTimeout();
        this.mainContainer = await this.getMainContainer();
    }
    async getMainContainer() {
        return await page.$('.main-container');
    }
    async getChild(parent, position) {
        return await parent.evaluateHandle(function (node, pos) {
            return node.children[pos];
        }, position);
    }
    async getInnerTextOfChild(parent, position) {
        return await parent.evaluate((node, pos) => {
            let child = node.children[pos];
            return child.innerText;
        }, position);
    }
    async waitForLoading() {
        await page.waitForTimeout(10);
    }
    async reloadTimeout() {
        await page.waitForTimeout(50);
    }
}
exports.Driver = Driver;
