import { ElementHandle } from "puppeteer";
import { BarsDatabase } from "../../src/BarsDatabase";
import { stillHereBarsObj } from "../../src/stillHereBars";
import { ChildAsserter } from "./ChildAsserter";

export class Driver {

    private mainContainer!: ElementHandle<Element>;

    async goto(url: string) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        this.mainContainer = await this.getMainContainer();
    }

    async isStartingPage() {
        await ChildAsserter.assertChildCount(this.mainContainer, 2);

        await this.pageShouldHavePlayButton();
    }

    private async pageShouldHavePlayButton() {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);

        await ChildAsserter.assertElementWithText(inner_item, 0, 'BUTTON', "Play");
    }

    async clickOnPlayButton() {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);

        const playButton = await this.getChild(inner_item, 0);
        await playButton.click();

        await this.waitForLoading();
    }

    async isQuizPage() {
        await ChildAsserter.assertChildCount(this.mainContainer, 7);

        await this.pageShouldHaveAQuestion();
        await this.pageShouldHaveOptions();
        await this.pageShouldHaveEndAndSkip();
    }

    private async pageShouldHaveAQuestion() {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);

        await ChildAsserter.assertElement(inner_item, 0, 'SPAN');
    }

    private async pageShouldHaveOptions() {
        await ChildAsserter.assertElement(this.mainContainer, 2, 'DIV');
        await ChildAsserter.assertElement(this.mainContainer, 3, 'DIV');
        await ChildAsserter.assertElement(this.mainContainer, 4, 'DIV');
        await ChildAsserter.assertElement(this.mainContainer, 5, 'DIV');
    }

    private async pageShouldHaveEndAndSkip() {
        const container_item = await this.getChild(this.mainContainer, 6);
        const inner_item = await this.getChild(container_item, 0);

        await ChildAsserter.assertElementWithText(inner_item, 0, 'BUTTON', "End");
        await ChildAsserter.assertElementWithText(inner_item, 1, 'BUTTON', "Skip");
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

    private getAnswerKey(q: string) {
        const question = q.replace(/\n/g, " ");

        const barsDatabase = new BarsDatabase(stillHereBarsObj);
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

    async isScorePageWithScore(score: number, total: number) {
        await ChildAsserter.assertChildCount(this.mainContainer, 4);

        await this.pageHaveScore(score, total);
    }

    private async pageHaveScore(score: number, total: number) {
        const container_item = await this.getChild(this.mainContainer, 1);
        const inner_item = await this.getChild(container_item, 0);

        await ChildAsserter.assertElementWithText(inner_item, 1, 'SPAN', `${score}/${total}`);
    }

    async clickOnPlayAgain() {
        const container_item = await this.getChild(this.mainContainer, 3);
        const inner_item = await this.getChild(container_item, 0);

        const playAgainButton = await this.getChild(inner_item, 0);
        await playAgainButton.click();

        await this.reloadTimeout();

        this.mainContainer = await this.getMainContainer();
    }

    private async getMainContainer() {
        return await page.$('.main-container') as ElementHandle;
    }

    private async getChild(parent: ElementHandle, position: number) {
        return await parent.evaluateHandle(function (node: HTMLElement, pos: number) {
            return node.children[pos];
        }, position) as ElementHandle;
    }

    private async getInnerTextOfChild(parent: ElementHandle, position: number) {
        return await parent.evaluate((node: HTMLElement, pos: number) => {
            let child = node.children[pos] as HTMLElement;
            return child.innerText;
        }, position);
    }

    private async waitForLoading() {
        await page.waitForTimeout(10);
    }

    private async reloadTimeout() {
        await page.waitForTimeout(50);
    }
}
