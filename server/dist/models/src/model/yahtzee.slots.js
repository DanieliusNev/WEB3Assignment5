"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yahtzee_slot = exports.chance_slot = exports.large_straight_slot = exports.small_straight_slot = exports.full_house_slot = exports.quads_slot = exports.trips_slot = exports.two_pair_slot = exports.pair_slot = void 0;
exports.number_slot = number_slot;
exports.score = score;
const dice_1 = require("./dice");
function number_slot(target) {
    return {
        type: 'number',
        target,
    };
}
const of_a_kind_slot = (count) => ({ type: 'kind', count });
exports.pair_slot = of_a_kind_slot(2);
exports.two_pair_slot = { type: 'two pair' };
exports.trips_slot = of_a_kind_slot(3);
exports.quads_slot = of_a_kind_slot(4);
exports.full_house_slot = { type: 'full house' };
exports.small_straight_slot = { type: 'small straight' };
exports.large_straight_slot = { type: 'large straight' };
exports.chance_slot = { type: 'chance' };
exports.yahtzee_slot = { type: 'yahtzee' };
function count_dice(target, roll) {
    return roll.filter(d => d === target).length;
}
function of_a_kind(count, roll) {
    const candidates = dice_1.die_values
        .toReversed()
        .filter(target => count_dice(target, roll) >= count);
    return candidates[0] ?? 0;
}
function two_kinds(count1, count2, roll) {
    const on_top = of_a_kind(count1, roll);
    if (on_top === 0)
        return 0;
    const on_bottom = of_a_kind(count2, roll.filter(d => d !== on_top));
    if (on_bottom === 0)
        return 0;
    return count1 * on_top + count2 * on_bottom;
}
function score(slot, roll) {
    switch (slot.type) {
        case 'number':
            return count_dice(slot.target, roll) * slot.target;
        case 'kind':
            return of_a_kind(slot.count, roll) * slot.count;
        case 'two pair':
            return two_kinds(2, 2, roll);
        case 'small straight':
            return roll.toSorted().every((d, i) => d === i + 1) ? 15 : 0;
        case 'large straight':
            return roll.toSorted().every((d, i) => d === i + 2) ? 20 : 0;
        case 'full house':
            return two_kinds(3, 2, roll);
        case 'chance':
            return roll.reduce((s, d) => s + d, 0);
        case 'yahtzee':
            return of_a_kind(5, roll) > 0 ? 50 : 0;
    }
}
