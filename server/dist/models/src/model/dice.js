"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.die_values = void 0;
exports.isDieValue = isDieValue;
exports.dice_roller = dice_roller;
const array_utils_1 = require("../utils/array_utils");
exports.die_values = [1, 2, 3, 4, 5, 6];
function isDieValue(x) {
    return exports.die_values.indexOf(x) > -1;
}
function dice_roller(randomizer) {
    const random_dice = () => randomizer(6) + 1;
    return {
        roll(n) {
            return (0, array_utils_1.times)(random_dice, n);
        },
        reroll(rolled, held) {
            const s = new Set(held);
            return rolled.map((d, i) => s.has(i) ? d : random_dice());
        }
    };
}
