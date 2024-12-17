/**
 * Debounce a function with a given amount of time
 * @description  For scrolling or other resource demanding behaviors
 */
export const debounce = (callback: (...args: unknown[]) => unknown, wait: number, immediate = false) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: unknown[]) => {
        const callNow: boolean = immediate && !timeout
        const next = () => callback(...args)
        clearTimeout(timeout)
        timeout = setTimeout(next, wait)
        if (callNow) next()
    }
}


/**
 * Throttle a function by a given amount of time
 * @description Throttling enforces a maximum number of times a function can be called over time, as in 'execute this function at most once every 100 milliseconds
 */
export const throttle = (fn: (...args: unknown[]) => unknown, delay: number) => {
    let lastCall = 0
    return (...args: unknown[]) => {
        const now = performance.now()
        if (now - lastCall < delay) return
        lastCall = now
        requestAnimationFrame(() => fn(...args))
    }
}
