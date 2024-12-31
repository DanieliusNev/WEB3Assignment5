export type Randomizer = (bound: number) => number;
export declare const standardRandomizer: Randomizer;
export type Shuffler<T> = (ts: T[]) => T[];
export declare function standardShuffler<T>(randomizer: Randomizer, ts: T[]): T[];
