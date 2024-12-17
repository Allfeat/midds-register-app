/**
 * Return random elements from an array
 */
export const getRandomItems = <T> (array: T[], amount: number): T[] => {
    const shuffled = array.slice()
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, amount)
}


/**
 * Return a random element from an array
 */
export const getRandomItem = <T extends Array<unknown>> (array: T): T[0] => {
    return getRandomItems(array, 1)[0]
}


/**
 * Shuffle an array
 */
export const shuffleArray = <T> (array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
