import { useEffect, useRef } from 'react'

import { cancelRunAfterRendered, runAfterRendered } from '../helpers/dom'

export const useScrollIntoView = ({ ref, shouldScrollIntoView }) => {
  const hasBeenScrolledIntoViewRef = useRef(false)

  useEffect(() => {
    if (!shouldScrollIntoView) return
    const wasActive = hasBeenScrolledIntoViewRef.current
    if (wasActive) return
    if (!ref.current) return
    hasBeenScrolledIntoViewRef.current = true
    let requestAnimationFrameId
    runAfterRendered().then(() => {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    })
    return () => {
      if (requestAnimationFrameId) cancelRunAfterRendered(requestAnimationFrameId)
    }
  }, [ref, shouldScrollIntoView])
}
