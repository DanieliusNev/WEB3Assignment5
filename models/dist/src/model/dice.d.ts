import type { Randomizer } from "../utils/random_utils";
export declare const die_values: readonly [1, 2, 3, 4, 5, 6];
export type DieValue = typeof die_values[number];
export declare function isDieValue(x: any): x is DieValue;
export interface DiceRoller {
    roll(n: number): DieValue[];
    reroll(rolled: DieValue[], held: number[]): DieValue[];
}
export declare function dice_roller(randomizer: Randomizer): DiceRoller;
