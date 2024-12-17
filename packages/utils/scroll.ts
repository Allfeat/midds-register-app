/**
 * Scroll back to top after page transition
 */
export const scrollToTop = (delay?: number) => {
    const scroll = () => window.scrollTo(0,0)

    if (delay && delay > 0) {
        return setTimeout(scroll, delay)
    } else {
        return scroll()
    }
}


/**
 * Smooth Scroll to an element
 * @description Promised based
 * @url Based on: https://www.youtube.com/watch?v=oUSvlrDTLi4
 */
const smoothScrollPromise = (target: HTMLElement, duration: number = 1600): Promise<void> => {
    const position = target.getBoundingClientRect().top + 1
    const startPosition = window.scrollY
    const distance = position - startPosition
    let startTime: number = 0

    // Return Promise
    return new Promise((resolve) => {
        if (!(target instanceof Element)) throw new TypeError('Argument 1 must be an Element')
        if (typeof window === 'undefined') return

        // Scroll to animation
        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            // Create easing value
            const easedYPosition = easeInOutQuart(timeElapsed, startPosition, distance, duration)
            // Scroll to Y position
            window.scrollTo(0, easedYPosition)
            // Loop or end animation
            if (timeElapsed < duration) {
                requestAnimationFrame(animation)
            } else {
                return resolve()
            }
        }

        requestAnimationFrame(animation)
    })
}


interface smoothScrollOptions {
    hash: string
    changeHash?: boolean
    event?: MouseEvent
    callback?: Function
}

export const smoothScroll = async ({ hash, callback, changeHash = true, event }: smoothScrollOptions) => {
    if (event) event.preventDefault()

    const target = document.getElementById(hash)

    smoothScrollPromise(target).then(() => {
        if (changeHash) location.hash = hash
        callback && callback()
    })
}
