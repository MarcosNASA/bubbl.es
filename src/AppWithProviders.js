import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { ScopesProvider } from './context/scopes'
import { ShepherdProvider } from 'js-shepherd'

export const AppWithProviders = () => (
  <Router>
    <ShepherdProvider>
      <ScopesProvider>
        <App />
      </ScopesProvider>
    </ShepherdProvider>
  </Router>
)
