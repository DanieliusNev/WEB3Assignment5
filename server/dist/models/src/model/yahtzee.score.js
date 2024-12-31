"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lower_section_keys = exports.lower_section_slots = exports.upper_section_slots = void 0;
exports.upper_section = upper_section;
exports.sum_upper = sum_upper;
exports.finished_upper = finished_upper;
exports.register_upper = register_upper;
exports.total_upper = total_upper;
exports.isLowerSection = isLowerSection;
exports.lower_section = lower_section;
exports.finished_lower = finished_lower;
exports.register_lower = register_lower;
exports.total_lower = total_lower;
const dice_1 = require("./dice");
const yahtzee_slots_1 = require("./yahtzee.slots");
exports.upper_section_slots = {
    [1]: (0, yahtzee_slots_1.number_slot)(1),
    [2]: (0, yahtzee_slots_1.number_slot)(2),
    [3]: (0, yahtzee_slots_1.number_slot)(3),
    [4]: (0, yahtzee_slots_1.number_slot)(4),
    [5]: (0, yahtzee_slots_1.number_slot)(5),
    [6]: (0, yahtzee_slots_1.number_slot)(6),
};
function die_array(gen) {
    return dice_1.die_values.reduce((o, n) => ({ ...o, [n]: gen(n) }), {});
}
function values(dArr) {
    return dice_1.die_values.map(v => dArr[v]);
}
function upper_section() {
    return {
        scores: die_array(_ => undefined)
    };
}
function sum_upper(scores) {
    return values(scores)
        .map(v => v ?? 0)
        .reduce((s, v) => s + v, 0);
}
function finished_upper(section) {
    return values(section.scores).every(s => s !== undefined);
}
function register_upper(section, value, roll) {
    const scores = { ...section.scores, [value]: (0, yahtzee_slots_1.score)(exports.upper_section_slots[value], roll) };
    if (finished_upper({ scores })) {
        const total = sum_upper(scores);
        return { ...section, scores, bonus: total >= 63 ? 50 : 0 };
    }
    return { ...section, scores };
}
function total_upper(section) {
    return sum_upper(section.scores) + (section.bonus ?? 0);
}
exports.lower_section_slots = {
    'pair': yahtzee_slots_1.pair_slot,
    'two pairs': yahtzee_slots_1.two_pair_slot,
    'three of a kind': yahtzee_slots_1.trips_slot,
    'four of a kind': yahtzee_slots_1.quads_slot,
    'full house': yahtzee_slots_1.full_house_slot,
    'small straight': yahtzee_slots_1.small_straight_slot,
    'large straight': yahtzee_slots_1.large_straight_slot,
    'chance': yahtzee_slots_1.chance_slot,
    'yahtzee': yahtzee_slots_1.yahtzee_slot
};
exports.lower_section_keys = Object.keys(exports.lower_section_slots);
function isLowerSection(key) {
    return exports.lower_section_keys.indexOf(key) !== -1;
}
function lower_section() {
    return { scores: {} };
}
function finished_lower(section) {
    return exports.lower_section_keys.every(key => section.scores[key] !== undefined);
}
function register_lower(section, key, roll) {
    const scores = { ...section.scores, [key]: (0, yahtzee_slots_1.score)(exports.lower_section_slots[key], roll) };
    return { scores };
}
function total_lower(section) {
    return exports.lower_section_keys
        .map(k => section.scores[k] ?? 0)
        .reduce((a, b) => a + b, 0);
}
