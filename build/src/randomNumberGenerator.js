"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumberGenerator = void 0;
function randomNumberGenerator(upperBound) {
    return Math.floor(Math.random() * upperBound);
}
exports.randomNumberGenerator = randomNumberGenerator;
