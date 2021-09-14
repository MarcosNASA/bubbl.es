import { motion } from 'framer-motion'
import styled from 'styled-components'

import { colors } from './theme'

// @TODO: Add error badge to unresolved bubbles
export const Bubble = styled(motion.span).attrs({
  tabIndex: 0,
})`
  ${({ background, $isFormalParameterOrIteratorAble = false, $isVariableDeclaration = false }) =>
    background &&
    `
    position: relative;
    z-index: 1;
    
    :hover {
        cursor: default;
      }

      :after {
          content: '';
          background: ${background};
          position: absolute;
          top: -1px;
          left: -2px;
          height: 100%;
          width: 100%;
          z-index: -1;
          padding: 0px 2px ${$isFormalParameterOrIteratorAble ? 8 : 2}px 2px;
          border-radius: 2px;
        }
        
        &[data-is-hovered="true"] {
          filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, ${$isVariableDeclaration ? 1 : 0.75}));
          padding: 0px 0px ${$isFormalParameterOrIteratorAble ? -2 : 2}px 0px;
      }
  `}
`

const GLIPH_WIDTH = 9.61
const SPACES_PER_TAB = 4
const INDENT_SIZE = GLIPH_WIDTH * SPACES_PER_TAB

export const ScopeBubble = styled(motion.div).attrs({
  tabIndex: 0,
})`
  width: fit-content;
  ${({ background, indents, levels, level }) =>
    background &&
    `
      position: relative;
      z-index: 0;

      :focus {
        outline: 0;
        box-shadow: -6px 0px 0px 0px ${colors.dark[200]}, 6px 0px 0px 0px ${colors.dark[200]};
      }
      
      :after {
        content: '';
        background: ${background};
        position: absolute;
        top: -3px;
        left: ${!level ? 0 : Math.max(0, level - 2) * INDENT_SIZE + 16}px;
        height: 100%;
        width: ${!level ? `100%` : `calc(100% - ${(level - 2) * INDENT_SIZE + 16}px)`};
        z-index: -1;
        padding: 0px 4px 6px 0px;
        padding-right: ${
          !level ? (levels + 1) * (GLIPH_WIDTH * 2) + 16 : (Math.max(0, levels - level) * INDENT_SIZE + 16) / 2
        }px;
        border-radius: 3px;
      }
  `}
`
