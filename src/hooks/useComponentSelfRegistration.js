import { useLayoutEffect } from 'react'

export const useComponentSelfRegistration = ({ component, useContext, index: customIndex }) => {
  const [registeredComponents, setRegisteredComponents] = useContext()

  const index =
    customIndex ??
    registeredComponents.findIndex((registeredComponent) => component.element === registeredComponent.element)

  useLayoutEffect(() => {
    const { element } = component
    const currentElement = element.current
    if (!currentElement) return

    setRegisteredComponents((previousRegisteredComponents) =>
      [
        ...previousRegisteredComponents,
        {
          ...component,
          index,
        },
      ]
        .sort(({ element: { current: a } = {} } = {}, { element: { current: b } = {} } = {}) =>
          a && b && a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1
        )
        .map((component, index) => ({
          ...component,
          index,
        }))
    )

    return () => {
      setRegisteredComponents((previousRegisteredComponents) =>
        previousRegisteredComponents.filter((registeredComponent) => registeredComponent.element === element)
      )
    }
  }, [
    component,
    index,
    setRegisteredComponents,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(component),
  ])

  return index
}
