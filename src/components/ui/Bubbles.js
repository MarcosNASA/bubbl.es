import { motion } from 'framer-motion'
import { styled } from '@linaria/react'

import { colors } from './theme'

// @TODO: Add error badge to unresolved bubbles
export const Bubble = styled(motion.span)`
  position: relative;
  z-index: 1;

  :hover {
    cursor: default;
  }

  :after {
    content: '';
    background: ${({ background }) => background || 'transparent'};
    position: absolute;
    top: -1px;
    left: -2px;
    height: 100%;
    width: 100%;
    z-index: -1;
    padding: 0px 2px ${({ $isFormalParameterOrIteratorAble }) => `${$isFormalParameterOrIteratorAble ? 8 : 2}`}px 2px;
    border-radius: 2px;
  }

  &[data-is-hovered='true'] {
    filter: ${({ $isVariableDeclaration }) =>
      `drop-shadow(2px 2px 2px rgba(0, 0, 0, ${$isVariableDeclaration ? 1 : 0.75})`};
    padding: 0px 0px ${({ $isFormalParameterOrIteratorAble }) => `${$isFormalParameterOrIteratorAble ? -2 : 2}`}px 0px;
  }
`
Bubble.defaultProps = {
  tabIndex: 0,
}

const GLIPH_WIDTH = 9.61
const SPACES_PER_TAB = 4
const INDENT_SIZE = GLIPH_WIDTH * SPACES_PER_TAB

export const ScopeBubble = styled(motion.div)`
  width: fit-content;
  position: relative;
  z-index: 0;

  :focus {
    outline: 0;
    box-shadow: -3px 0px 0px 0px ${colors.dark[200]}, 3px 0px 0px 0px ${colors.dark[200]};
  }

  :after {
    content: '';
    background: ${({ background }) => background || 'transparent'};
    position: absolute;
    top: -3px;
    left: ${({ level }) => (!level ? 0 : Math.max(0, level - 2) * INDENT_SIZE + 16)}px;
    height: 100%;
    width: ${({ level }) => (!level ? `100%` : `calc(100% - ${(level - 2) * INDENT_SIZE + 16}px`)};
    z-index: -1;
    padding: 0px 4px 6px 0px;
    padding-right: ${({ level, levels }) =>
      !level ? (levels + 1) * (GLIPH_WIDTH * 2) + 16 : (Math.max(0, levels - level) * INDENT_SIZE + 16) / 2}px;
    border-radius: 3px;
  }
`
ScopeBubble.defaultProps = {
  tabIndex: 0,
}
