import { die_values } from './dice';
import { chance_slot, full_house_slot, large_straight_slot, number_slot, pair_slot, quads_slot, score, small_straight_slot, trips_slot, two_pair_slot as two_pairs_slot, yahtzee_slot } from './yahtzee.slots';
export const upper_section_slots = {
    [1]: number_slot(1),
    [2]: number_slot(2),
    [3]: number_slot(3),
    [4]: number_slot(4),
    [5]: number_slot(5),
    [6]: number_slot(6),
};
function die_array(gen) {
    return die_values.reduce((o, n) => (Object.assign(Object.assign({}, o), { [n]: gen(n) })), {});
}
function values(dArr) {
    return die_values.map(v => dArr[v]);
}
export function upper_section() {
    return {
        scores: die_array(_ => undefined)
    };
}
export function sum_upper(scores) {
    return values(scores)
        .map(v => v !== null && v !== void 0 ? v : 0)
        .reduce((s, v) => s + v, 0);
}
export function finished_upper(section) {
    return values(section.scores).every(s => s !== undefined);
}
export function register_upper(section, value, roll) {
    const scores = Object.assign(Object.assign({}, section.scores), { [value]: score(upper_section_slots[value], roll) });
    if (finished_upper({ scores })) {
        const total = sum_upper(scores);
        return Object.assign(Object.assign({}, section), { scores, bonus: total >= 63 ? 50 : 0 });
    }
    return Object.assign(Object.assign({}, section), { scores });
}
export function total_upper(section) {
    var _a;
    return sum_upper(section.scores) + ((_a = section.bonus) !== null && _a !== void 0 ? _a : 0);
}
export const lower_section_slots = {
    'pair': pair_slot,
    'two pairs': two_pairs_slot,
    'three of a kind': trips_slot,
    'four of a kind': quads_slot,
    'full house': full_house_slot,
    'small straight': small_straight_slot,
    'large straight': large_straight_slot,
    'chance': chance_slot,
    'yahtzee': yahtzee_slot
};
export const lower_section_keys = Object.keys(lower_section_slots);
export function isLowerSection(key) {
    return lower_section_keys.indexOf(key) !== -1;
}
export function lower_section() {
    return { scores: {} };
}
export function finished_lower(section) {
    return lower_section_keys.every(key => section.scores[key] !== undefined);
}
export function register_lower(section, key, roll) {
    const scores = Object.assign(Object.assign({}, section.scores), { [key]: score(lower_section_slots[key], roll) });
    return { scores };
}
export function total_lower(section) {
    return lower_section_keys
        .map(k => { var _a; return (_a = section.scores[k]) !== null && _a !== void 0 ? _a : 0; })
        .reduce((a, b) => a + b, 0);
}
