import styled from 'styled-components'

import { colors } from '../../components/ui/theme'

export const ButtonContainer = styled.div`
  display: flex;
  gap: 9px;
  margin-top: ${({ topMargin }) => (topMargin ? topMargin : 30)}px;
`

export const ButtonLink = styled.a`
  display: inline-block;
  padding: 12px 21px;
  background-color: ${colors.accent[200]};
  border-radius: 100px;
  color: ${colors.light[100]};
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${colors.accent[100]};
  }
`

export const Button = styled.button`
  display: inline-block;
  padding: ${({ isSmall }) => (isSmall ? '9px 18px' : '12px 21px')};
  background-color: ${colors.accent[200]};
  border: none;
  border-radius: 100px;
  color: ${colors.light[100]};
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${colors.accent[100]};
  }
`
