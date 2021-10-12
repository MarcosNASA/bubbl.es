import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useComponentSelfRegistration } from '../hooks/useComponentSelfRegistration'
import { useNodeRefPosition } from '../hooks/useNodeRefPosition'
import { useScrollIntoView } from '../hooks/useScrollIntoView'
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

const DEFAULT_SHEPHERD_OPTIONS = {
  initialDelay: 0, // @TODO: Implement
  farmyardId: 'shepherd-farmyard',
  shouldAutoScrollIntoView: true,
}
export const ShepherdProvider = ({ children, options = {} }) => {
  const [shepherd, setShepherd] = useState({
    activeSheep: 0,
    options: { ...DEFAULT_SHEPHERD_OPTIONS, ...options },
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

  // @TODO: Test useLayoutEffect with ref
  useEffect(() => {
    if (flockContainer) return
    setFlockContainer(document.getElementById(farmyardId))
  }, [farmyardId, flockContainer])

  if (!flockContainer) return null
  return <Portal container={flockContainer}>{children}</Portal>
}

const DEFAULT_SHEEP_OPTIONS = { delay: 0 }
export const Sheep = ({ children: child, number, options = {}, spotRef }) => {
  const [{ activeSheep }] = useShepherdContext()
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

  if (!spotRef.current) return null
  if (!isActive) return null
  return (
    <SheepContext.Provider value={sheep}>
      <RenderAtSpot spotRef={spotRef} options={{ ...DEFAULT_SHEEP_OPTIONS, ...options }}>
        {child}
      </RenderAtSpot>
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
const RenderAtSpot = ({ children: child, options, spotRef }) => {
  const [position] = useNodeRefPosition({ ref: spotRef })
  const [shepherd, setShepherd] = useShepherdContext()
  const {
    options: { shouldAutoScrollIntoView },
  } = shepherd
  const [flock] = useFlockContext()
  const sheep = useSheepContext()

  const { delay } = options

  useScrollIntoView({ delay, ref: spotRef, shouldScrollIntoView: shouldAutoScrollIntoView })

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
            flockLength: flock.length,
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
