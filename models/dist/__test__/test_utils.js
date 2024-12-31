export const non_random = (...numbers) => {
    let index = 0;
    return (bound) => {
        const n = numbers[index];
        index = (index + 1) % numbers.length;
        return n % bound;
    };
};
