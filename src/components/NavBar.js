import { useLocation } from 'wouter'

export const NavBar = ({ children }) => {
  const { pathname } = useLocation()

  return children({ activeLink: pathname })
}
