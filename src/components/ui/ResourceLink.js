import styled from 'styled-components'

import { colors } from './theme'

export const ResourceLink = styled.a`
  text-decoration: none;
  color: ${colors.accent[200]};

  :hover {
    text-decoration: underline;
  }

  :visited {
    color: ${colors.accent[200]};
  }
`
