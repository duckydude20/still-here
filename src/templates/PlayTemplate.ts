import { ButtonClickEvent } from "../ButtonClickEvent";

const playString = `
    <div class="container-items ">
        <div class="inner-item main-screen-heading">
            <span style="align-self:flex-start;">Still</span>
            <span style="align-self:flex-end;">Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick('${ButtonClickEvent.PLAY}')">Play</button>
        </div>
    </div>
`;

export function templateString() {
    return playString;
}