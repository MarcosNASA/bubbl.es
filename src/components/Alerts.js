import * as React from 'react'

import { Portal } from './Portal'
import { Alerts as StyledAlerts, Alert as StyledAlert } from './ui/Alerts'

export const Alerts = () => <StyledAlerts id="alerts" />

export const Alert = ({ children }) => {
    const [alertsContainer, setAlertsContainer] = React.useState(null)

    React.useEffect(() => {
        setAlertsContainer(document.querySelector('#alerts'))
    }, [setAlertsContainer])

    if (!alertsContainer) return null
    return (
        <Portal container={alertsContainer}>
            <StyledAlert>{children}</StyledAlert>
        </Portal>
    )
}
