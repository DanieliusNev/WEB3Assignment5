export declare const times: <T>(gen: (i: number) => T, size: number) => T[];
export declare const repeat: <T>(val: T, size: number) => T[];
export declare const update: <T>(index: number, val: T, array: T[]) => T[];
export declare const zipWith: <T, U, V>(w: (t: T, u: U) => V, ts: T[], us: U[]) => V[];
