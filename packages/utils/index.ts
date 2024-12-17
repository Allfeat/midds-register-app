export * from './actions'
export * from './apiFragments'
export * from './array'
export * from './constants'
export * from './easings'
export * from './math'
export * from './scroll'
export * from './string'
export * from './text'


/**
 * Get a true random number
 */
export const trueRandomNumber = (min: number, max: number) => {
    const range = max - min + 1
    const randomBuffer = new Uint32Array(1)
    window.crypto.getRandomValues(randomBuffer)
    return min + (randomBuffer[0] % range)
}


/**
 * Create a delay
 */
export const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
