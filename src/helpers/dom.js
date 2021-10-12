export const runAfterRendered = (callback, delay = 0) =>
  new Promise((resolve) => {
    let id
    id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        id = setTimeout(callback, delay)
        resolve(id)
      })
    })
  })

export const cancelRunAfterRendered = (id) => {
  clearTimeout(id)
  cancelAnimationFrame(id)
}
