import * as React from 'react'
import { Link } from 'wouter'
import { styled } from '@linaria/react'

import { colors } from './theme'

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${colors.light[200]};
`

export const NavLink = styled(({ isActive, ...rest }) => <Link {...rest} />)`
  display: grid;
  place-items: center;
  height: 100%;
  padding: 0px 20px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? colors.yellow[200] : colors.light[200])};
  transition: color 0.3s ease-in-out;

  :hover {
    color: ${colors.yellow[300]};
    background-color: ${colors.dark[300]};
  }
`

export const Home = styled.h1`
  font-size: 16px;
  font-family: 'Lobster', sans-serif;
`
