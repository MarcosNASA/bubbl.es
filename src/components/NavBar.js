import { useLocation } from 'react-router-dom'

export const NavBar = ({ children }) => {
  const { pathname } = useLocation()

  return children({ activeLink: pathname })
}
