type NumberSlot = {
    readonly type: 'number';
    readonly target: number;
};
type OfAKindSlot = {
    readonly type: 'kind';
    readonly count: number;
};
export type Slot = NumberSlot | OfAKindSlot | {
    type: 'yahtzee' | 'two pair' | 'full house' | 'small straight' | 'large straight' | 'chance';
};
export declare function number_slot(target: number): NumberSlot;
export declare const pair_slot: Slot;
export declare const two_pair_slot: Slot;
export declare const trips_slot: Slot;
export declare const quads_slot: Slot;
export declare const full_house_slot: Slot;
export declare const small_straight_slot: Slot;
export declare const large_straight_slot: Slot;
export declare const chance_slot: Slot;
export declare const yahtzee_slot: Slot;
export declare function score(slot: Slot, roll: number[]): number;
export {};
