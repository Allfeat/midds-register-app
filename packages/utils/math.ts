/**
 * Linear Interpolation
 */
export const lerp = (start: number, end: number, amount: number, round = true): number => {
    const result = (1 - amount) * start + amount * end
    return round ? parseFloat(result.toFixed(3)) : result
}


/**
 * Clamp a number
 */
export const clamp = (num: number, a: number, b: number) => {
    const minValue = a < b ? a : b
    const maxValue = a > b ? a : b
    return Math.min(Math.max(num, minValue), maxValue)
}


/**
 * Re-maps a number from one range to another
 * @param value the incoming value to be converted
 * @param start1 lower bound of the value's current range
 * @param stop1 upper bound of the value's current range
 * @param start2 lower bound of the value's target range
 * @param stop2 upper bound of the value's target range
 * @param [withinBounds] constrain the value to the newly mapped range
 * @return remapped number
 */
export const map = (n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds: boolean) => {
    const value = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
    return withinBounds
        ? (start2 < stop2 ? Math.min(value, stop2) : Math.max(value, stop2))
        : value
}
