import { die_values } from "./dice";
export function number_slot(target) {
    return {
        type: 'number',
        target,
    };
}
const of_a_kind_slot = (count) => ({ type: 'kind', count });
export const pair_slot = of_a_kind_slot(2);
export const two_pair_slot = { type: 'two pair' };
export const trips_slot = of_a_kind_slot(3);
export const quads_slot = of_a_kind_slot(4);
export const full_house_slot = { type: 'full house' };
export const small_straight_slot = { type: 'small straight' };
export const large_straight_slot = { type: 'large straight' };
export const chance_slot = { type: 'chance' };
export const yahtzee_slot = { type: 'yahtzee' };
function count_dice(target, roll) {
    return roll.filter(d => d === target).length;
}
function of_a_kind(count, roll) {
    var _a;
    const candidates = die_values
        .toReversed()
        .filter(target => count_dice(target, roll) >= count);
    return (_a = candidates[0]) !== null && _a !== void 0 ? _a : 0;
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
export function score(slot, roll) {
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
