export const fibonacciAlgorithm = (length: number, memo: Record<number, number> = {}): number => {
    if (length in memo) {
        return memo[length];
    }
    if (length <= 2) {
        return 1;
    }
    memo[length] = fibonacciAlgorithm(length - 1, memo) + fibonacciAlgorithm(length - 2, memo);
    return memo[length];
}