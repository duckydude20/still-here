"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateString = void 0;
const ButtonClickEvent_1 = require("../ButtonClickEvent");
const playString = `
    <div class="container-items ">
        <div class="inner-item main-screen-heading">
            <span style="align-self:flex-start;">Still</span>
            <span style="align-self:flex-end;">Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick('${ButtonClickEvent_1.ButtonClickEvent.PLAY}')">Play</button>
        </div>
    </div>
`;
function templateString() {
    return playString;
}
exports.templateString = templateString;
