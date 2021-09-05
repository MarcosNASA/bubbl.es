export const debounce = (callback, wait) => {
    let timeoutId = null
    return (...args) => {
        window.clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => {
            callback(...args)
        }, wait)
    }
}
