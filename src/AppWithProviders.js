import React from 'react'
import { App } from './App'

import { ScopesProvider } from './context/scopes'

export const AppWithProviders = () => (
  <ScopesProvider>
    <App />
  </ScopesProvider>
)
