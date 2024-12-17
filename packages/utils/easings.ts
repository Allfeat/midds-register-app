type Easing = [number, number, number, number]


/**
 * Easing Arrays
 */
/** Easing array: Quart - Out */
export const quartOut: Easing = [.165, .84, .44, 1]
/** Easing array: Quart - In Out */
export const quartInOut: Easing = [.76, 0, .24, 1]


/**
 * Easing Functions
 */
/** Ease function: Quart - In/Out */
export const easeInOutQuart = (x: number): number => x <.5 ? 8 * x * x * x * x : 1 - 8 * (--x) * x * x * x
