import { Driver } from "./driver";

test("Zero score without Playing", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuizPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(0, 0);
});

test("Zero Score with skipping", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuizPage();
    await driver.clickOnSkipButton();
    await driver.isQuizPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(0, 1);
});

test("One score in One rounds", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuizPage();
    await driver.clickOnRightOption();
    await driver.isQuizPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(1, 1);
});

test("Play Again", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuizPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(0, 0);
    await driver.clickOnPlayAgain();
    await driver.isStartingPage();
})