import { Randomizer } from "../utils/random_utils";
import { DiceRoller, DieValue } from "./dice";
import { LowerSection, LowerSectionKey, UpperSection } from "./yahtzee.score";
export type YahtzeeSpecs = {
    creator?: string;
    players: string[];
    number_of_players?: number;
};
export type YahtzeeOptions = YahtzeeSpecs & {
    randomizer?: Randomizer;
};
export type Yahtzee = Readonly<{
    players: string[];
    upper_sections: UpperSection[];
    lower_sections: LowerSection[];
    playerInTurn: number;
    roll: DieValue[];
    rolls_left: number;
    roller: DiceRoller;
}>;
export declare function new_yahtzee({ players, number_of_players, randomizer }: Readonly<YahtzeeOptions>): Yahtzee;
export declare function reroll(held: number[], yahtzee: Yahtzee): Yahtzee;
export declare function register(slot: DieValue | LowerSectionKey, yahtzee: Yahtzee): Yahtzee;
export declare function scores(yahtzee: Omit<Yahtzee, 'roller'>): number[];
export declare function is_finished(yahtzee: Omit<Yahtzee, 'roller'>): boolean;
