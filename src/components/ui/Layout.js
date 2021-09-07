import styled from 'styled-components'

import { colors, tablet } from './theme'

export const Layout = styled.div`
  display: grid;
  grid-template-rows: 100px auto auto;
  grid-template-areas: 'navbar' 'code' 'switch';
  grid-template-columns: 100%;
  position: relative;
  width: 100%;
  z-index: 0;
  background: ${colors.dark[200]};

  ${tablet} {
    grid-template-rows: 100px auto;
    grid-template-columns: 50% 50%;
    grid-template-areas: 'navbar navbar' 'code switch';
  }
`

export const Header = styled.header`
  grid-area: navbar;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 9px solid ${colors.dark[100]};
`

export const GitHubLink = styled.div`
  display: grid;
  place-items: center;
  padding: 0 24px;
`

export const LeftColumn = styled.section`
  grid-area: code;
  height: calc(100vh - 100px);
  width: 100%;

  ${tablet} {
    width: 100%;
  }
`

export const RightColumn = styled.main`
  grid-area: switch;
  height: 100vh;
  width: 100%;

  ${tablet} {
    height: calc(100vh - 100px);
    width: 100%;
  }
`

export const SingleColumn = styled.main`
  grid-area: 2 / 1 / 3 / 1;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - 100px);
  max-width: 756px;

  ${tablet} {
    grid-area: 2 / 1 / 3 / 3;
  }
`
