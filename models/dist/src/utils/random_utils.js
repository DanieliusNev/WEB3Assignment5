// Uniformly selected pseudo-random number
export const standardRandomizer = n => Math.floor(Math.random() * n);
// Perfect shuffle using the Fisher-Yates method
export function standardShuffler(randomizer, ts) {
    const copy = [...ts];
    for (let i = 0; i < copy.length - 1; i++) {
        const j = randomizer(copy.length - i) + i;
        const temp = copy[j];
        copy[j] = copy[i];
        copy[i] = temp;
    }
    return copy;
}
