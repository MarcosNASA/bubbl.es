import { useEffect, useRef } from 'react'

import { cancelRunAfterRendered, runAfterRendered } from '../helpers/dom'

export const useScrollIntoView = ({ isActive, ref, shouldAutoScroll }) => {
  const wasActiveRef = useRef(isActive)

  useEffect(() => {
    if (!shouldAutoScroll) return
    const wasActive = wasActiveRef.current
    wasActiveRef.current = isActive
    if (wasActive) return
    if (!isActive) return
    if (!ref.current) return
    let requestAnimationFrameId
    runAfterRendered().then(() => {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    })
    return () => {
      if (requestAnimationFrameId) cancelRunAfterRendered(requestAnimationFrameId)
    }
  }, [isActive, ref, shouldAutoScroll])
}
