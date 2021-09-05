import React from 'react'
import ReactDOM from 'react-dom'

import { AppWithProviders } from './AppWithProviders'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './index.css'

document.body.removeChild(document.getElementById('ssr'))

ReactDOM.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
