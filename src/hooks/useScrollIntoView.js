import { useEffect, useRef } from 'react'

import { cancelRunAfterRendered, runAfterRendered } from '../helpers/dom'

export const useScrollIntoView = ({ delay, ref, shouldScrollIntoView }) => {
  const hasBeenScrolledIntoViewRef = useRef(false)

  useEffect(() => {
    if (!shouldScrollIntoView) return
    if (!ref.current) return
    if (hasBeenScrolledIntoViewRef.current) return
    let idleId
    runAfterRendered(() => {
      if (!ref.current) return
      idleId = undefined
      hasBeenScrolledIntoViewRef.current = true
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }, delay).then((id) => {
      idleId = id
    })
    return () => {
      if (!idleId) return
      cancelRunAfterRendered(idleId)
    }
  }, [delay, ref, shouldScrollIntoView])
}
