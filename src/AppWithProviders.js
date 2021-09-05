import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { ScopesProvider } from './context/scopes'

export const AppWithProviders = () => (
    <Router>
        <ScopesProvider>
            <App />
        </ScopesProvider>
    </Router>
)
