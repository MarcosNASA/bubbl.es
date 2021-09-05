import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { colors } from './components/ui/theme'

import { PATH_BUBBLES, PATH_THEORY, PATH_WELCOME } from './constants'

import { NavBar } from './components/NavBar'
import { Nav, NavLink, Home } from './components/ui/Nav'
import { Layout, Header, LeftColumn, RightColumn, SingleColumn } from './components/ui/Layout'
import { FullPageSpinner } from './components/ui/Spinner'
import { Alerts } from './components/Alerts'

import { Welcome } from './screens/welcome/Welcome'
const Bubbler = React.lazy(() => import('./screens/bubbler/Bubbler'))
const CodeEditor = React.lazy(() => import('./screens/code-editor/CodeEditor'))
const Theory = React.lazy(() => import('./screens/theory/Theory'))

export const App = () => (
  <>
    <Alerts />
    <Layout>
      <Header>
        <NavBar>
          {({ activeLink }) => (
            <Nav>
              <NavLink to={PATH_BUBBLES} $isActive={activeLink === PATH_BUBBLES}>
                <Home>Bubbl.es</Home>
              </NavLink>
              <NavLink to={PATH_THEORY} $isActive={activeLink === PATH_THEORY}>
                Scope Theory
              </NavLink>
            </Nav>
          )}
        </NavBar>
      </Header>
      <Switch>
        <Route exact path={PATH_WELCOME}>
          <SingleColumn>
            <Welcome />
          </SingleColumn>
        </Route>

        <Route path={PATH_BUBBLES}>
          <LeftColumn>
            <React.Suspense fallback={<FullPageSpinner />}>
              <CodeEditor />
            </React.Suspense>
          </LeftColumn>
          <RightColumn>
            <React.Suspense fallback={<FullPageSpinner background={colors.light[200]} />}>
              <Bubbler />
            </React.Suspense>
          </RightColumn>
        </Route>

        <Route path={PATH_THEORY}>
          <SingleColumn>
            <React.Suspense fallback={<FullPageSpinner />}>
              <Theory />
            </React.Suspense>
          </SingleColumn>
        </Route>

        <Redirect to={PATH_BUBBLES} />
      </Switch>
    </Layout>
  </>
)
