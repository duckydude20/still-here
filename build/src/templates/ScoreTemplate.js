"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateString = void 0;
const ButtonClickEvent_1 = require("../ButtonClickEvent");
const scoreString = `
    <div class="container-items ">
        <div class="inner-item score-heading">
            <span>Still Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item score">
            <span>You Scored: </span>
            <span style="font-size: 6rem; font-weight: bold;">{score}/{total}</span>
        </div>
    </div>
        <div class="container-items ">
        <div class="inner-item advice">
            <span>Listen to</span>
            <span style="cursor:pointer; font-size: 3rem; font-weight: bold;"
                onclick="window.open('https://krsna.bfan.link/still-here', '_blank').focus();" >Still Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.PLAY_AGAIN})">Play Again</button>
        </div>
    </div>
`;
function templateString(score, total) {
    let generatedString = scoreString;
    generatedString = generatedString.replace("{score}", score.toString());
    generatedString = generatedString.replace("{total}", total.toString());
    return generatedString;
}
exports.templateString = templateString;
