import { DieValue } from './dice';
import { type Slot } from './yahtzee.slots';
type DieArray<T> = {
    [key in DieValue]: T;
};
export declare const upper_section_slots: DieArray<Slot>;
export type UpperSection = Readonly<{
    scores: DieArray<number | undefined>;
    bonus?: 0 | 50;
}>;
export declare function upper_section(): UpperSection;
export declare function sum_upper(scores: DieArray<number | undefined>): number;
export declare function finished_upper(section: UpperSection): boolean;
export declare function register_upper(section: UpperSection, value: DieValue, roll: DieValue[]): UpperSection;
export declare function total_upper(section: UpperSection): number;
export declare const lower_section_slots: {
    readonly pair: Slot;
    readonly 'two pairs': Slot;
    readonly 'three of a kind': Slot;
    readonly 'four of a kind': Slot;
    readonly 'full house': Slot;
    readonly 'small straight': Slot;
    readonly 'large straight': Slot;
    readonly chance: Slot;
    readonly yahtzee: Slot;
};
type LowerSectionSlots = typeof lower_section_slots;
export type LowerSectionKey = keyof LowerSectionSlots;
export declare const lower_section_keys: Readonly<LowerSectionKey[]>;
export declare function isLowerSection(key: any): key is LowerSectionKey;
export type LowerSection = {
    scores: Partial<Record<LowerSectionKey, number>>;
};
export declare function lower_section(): LowerSection;
export declare function finished_lower(section: LowerSection): boolean;
export declare function register_lower(section: LowerSection, key: LowerSectionKey, roll: DieValue[]): LowerSection;
export declare function total_lower(section: LowerSection): number;
export {};
