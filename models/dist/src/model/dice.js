import { times } from "../utils/array_utils";
export const die_values = [1, 2, 3, 4, 5, 6];
export function isDieValue(x) {
    return die_values.indexOf(x) > -1;
}
export function dice_roller(randomizer) {
    const random_dice = () => randomizer(6) + 1;
    return {
        roll(n) {
            return times(random_dice, n);
        },
        reroll(rolled, held) {
            const s = new Set(held);
            return rolled.map((d, i) => s.has(i) ? d : random_dice());
        }
    };
}
