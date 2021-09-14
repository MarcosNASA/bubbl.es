import * as React from 'react'

const ScopesStateContext = React.createContext()
const ScopesDispatchContext = React.createContext()

export const useScopesState = () => {
  const scopesState = React.useContext(ScopesStateContext)

  if (!scopesState) {
    throw new Error('useScopesState must be used within a ScopesProvider')
  }

  return scopesState
}

export const useScopesDispatch = () => {
  const scopesDispatch = React.useContext(ScopesDispatchContext)

  if (!scopesDispatch) {
    throw new Error('useScopesDispatch must be used within a ScopesProvider')
  }

  return scopesDispatch
}

export const DEFAULT_SCOPES_STATE = {
  scopes: [],
  colors: [],
}
export const ScopesProvider = ({ children }) => {
  const [scopes, setScopes] = React.useState(DEFAULT_SCOPES_STATE)

  return (
    <ScopesDispatchContext.Provider value={setScopes}>
      <ScopesStateContext.Provider value={scopes}>{children}</ScopesStateContext.Provider>
    </ScopesDispatchContext.Provider>
  )
}
