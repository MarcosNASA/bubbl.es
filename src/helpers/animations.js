export const defaultRouteAnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    opacity: 0,
    translateX: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
}

export const getScopeBubbleAnimationProps = ({ level }) => ({
  initial: {
    opacity: 0,
    translateX: '-100vw',
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
  transition: {
    delay: Math.max(level - 1, 0) / 100,
    type: 'spring',
    stiffness: 100,
    damping: 30,
  },
})

export const getBubbleAnimationProps = ({ scopeLevel }) => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: { opacity: 0 },
  transition: {
    delay: Math.max(scopeLevel - 1, 0) / 100 + 1,
    duration: Math.max(scopeLevel - 1, 0) / 100 + 1,
  },
})
