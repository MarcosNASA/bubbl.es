export const runAfterRendered = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const requestAnimationFrameId = requestAnimationFrame(() => {
          resolve(requestAnimationFrameId)
        })
      })
    })
  })

export const cancelRunAfterRendered = (id) => cancelAnimationFrame(id)
