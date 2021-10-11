import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { cancelRunAfterRendered, runAfterRendered } from '../helpers/dom'
import { useComponentSelfRegistration } from '../hooks/useComponentSelfRegistration'
import { Portal } from './Portal'

export const Farmyard = ({ children, id = 'shepherd-farmyard', zIndex = 1 }) => (
  <div
    id={id}
    style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', pointerEvents: 'none', zIndex }}
  >
    {children}
  </div>
)

const ShepherdContext = createContext()
const FlockContext = createContext()
const SheepContext = createContext()

export const useShepherdContext = () => {
  const shepherdContext = useContext(ShepherdContext)
  if (!shepherdContext) throw new Error('useShepherdContext must be used within a ShepherdProvider')
  return shepherdContext
}

export const useFlockContext = () => {
  const flockContext = useContext(FlockContext)
  if (!flockContext) throw new Error('useFlockContext must be used within a SheepsProvider')
  return flockContext
}

export const useSheepContext = () => {
  const sheepContext = useContext(SheepContext)
  if (!sheepContext) throw new Error('useSheepContext must be used within a SheepProvider')
  return sheepContext
}

const DEFAULT_OPTIONS = {
  shouldAutoScroll: true,
  farmyardId: 'shepherd-farmyard',
}
export const ShepherdProvider = ({ children, options = {} }) => {
  const [shepherd, setShepherd] = useState({
    activeSheep: 0,
    options: { ...DEFAULT_OPTIONS, ...options },
  })
  const [sheeps, setSheeps] = useState([])

  return (
    <ShepherdContext.Provider value={[shepherd, setShepherd]}>
      <FlockContext.Provider value={[sheeps, setSheeps]}>{children}</FlockContext.Provider>
    </ShepherdContext.Provider>
  )
}

export const Flock = ({ children }) => {
  const [
    {
      options: { farmyardId },
    },
  ] = useShepherdContext()
  const [flockContainer, setFlockContainer] = useState()

  useEffect(() => {
    if (flockContainer) return
    setFlockContainer(document.getElementById(farmyardId))
  }, [farmyardId, flockContainer])

  if (!flockContainer) return null
  return <Portal container={flockContainer}>{children}</Portal>
}

const useScrollIntoView = ({ isActive, ref, shouldAutoScroll }) => {
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
export const Sheep = ({ children: child, number, spotRef }) => {
  const [
    {
      activeSheep,
      options: { shouldAutoScroll },
    },
  ] = useShepherdContext()
  const component = useMemo(
    () => ({
      element: spotRef,
    }),
    [spotRef]
  )
  const sheepNumber = useComponentSelfRegistration({ useContext: useFlockContext, component, index: number })
  const sheep = useMemo(
    () => ({
      number: sheepNumber,
    }),
    [sheepNumber]
  )
  const isActive = activeSheep === sheepNumber

  useScrollIntoView({ isActive, ref: spotRef, shouldAutoScroll })

  if (!spotRef.current) return null
  if (!isActive) return null
  return (
    <SheepContext.Provider value={sheep}>
      <RenderAtSpot spotRef={spotRef}>{child}</RenderAtSpot>
    </SheepContext.Provider>
  )
}

const VERTICAL_OFFSET = 12
const makeSheepChildPropsGetter =
  ({ position } = {}) =>
  ({ style, ...props } = {}) => ({
    style: {
      position: 'relative',
      width: `calc(100% - ${position.x}px)`,
      left: position.x + window.pageXOffset,
      top: Math.abs(position.y + position.height + window.pageYOffset + VERTICAL_OFFSET),
      pointerEvents: 'all',
      ...style,
    },
    ...props,
  })
const RenderAtSpot = ({ children: child, spotRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, height: 0 })
  const [shepherd, setShepherd] = useShepherdContext()
  const [flock] = useFlockContext()
  const sheep = useSheepContext()

  useEffect(() => {
    const currentSpotRef = spotRef.current
    if (!currentSpotRef) return

    const updatePositionCallback = () => {
      setPosition(currentSpotRef.getBoundingClientRect())
    }
    const mutationObserver = new MutationObserver(updatePositionCallback)
    const resizeObserver = new ResizeObserver(updatePositionCallback)
    mutationObserver.observe(currentSpotRef, { attributes: true, attributeFilter: ['style'] })
    resizeObserver.observe(document.body)
    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [setPosition, spotRef])

  if (!spotRef.current) return null
  return (
    <>
      {typeof child === 'function'
        ? child({
            dismiss: () => {
              setShepherd((previousShepherd) => ({
                ...previousShepherd,
                activeSheep: Infinity,
              }))
            },
            flockSize: flock.length,
            getSheepChildProps: makeSheepChildPropsGetter({ position }),
            goNextSheep: () => {
              setShepherd((previousShepherd) => ({
                ...previousShepherd,
                activeSheep: previousShepherd.activeSheep + 1,
              }))
            },
            goPreviousSheep: () => {
              setShepherd((previousShepherd) => ({
                ...previousShepherd,
                activeSheep: previousShepherd.activeSheep - 1,
              }))
            },
            position,
            sheep,
            ...shepherd,
          })
        : child}
    </>
  )
}
