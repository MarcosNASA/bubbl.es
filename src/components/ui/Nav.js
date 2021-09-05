import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from './theme'

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${colors.light[200]};
  border-bottom: 9px solid ${colors.dark[100]};
`

export const NavLink = styled(Link)`
  display: grid;
  place-items: center;
  height: 100%;
  padding: 0px 20px;
  text-decoration: none;
  color: ${colors.light[200]};
  transition: color 0.3s ease-in-out;

  :hover {
    color: ${colors.yellow[300]};
    background-color: ${colors.dark[300]};
  }

  ${({ $isActive }) =>
    $isActive &&
    `
      color: ${colors.yellow[200]};
    `}
`

export const Home = styled.h1`
  font-size: 16px;
  font-family: 'Lobster', sans-serif;
`
