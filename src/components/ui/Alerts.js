import styled from 'styled-components'

import { colors } from './theme'

export const Alerts = styled.div`
  display: grid;
  place-items: end center;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1;
  pointer-events: none;
`

export const Alert = styled.pre.attrs(() => ({
  role: 'alert',
  'aria-live': 'polite',
}))`
  padding: 20px 20px;
  margin: 10px;
  width: 100vh;
  background: ${colors.red[100]};
  color: ${colors.light[200]};
  white-space: pre-wrap;
`
