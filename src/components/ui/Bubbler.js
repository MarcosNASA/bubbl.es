import styled from 'styled-components'

import { colors, tablet } from '../../components/ui/theme'

const LINES_COUNTER_WIDTH = 32

// @TODO: Is this useful at all?
export const CodeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  height: calc(100vh - 100px);
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${colors.light[200]};

  ${tablet} {
    height: calc(100vh - 100px);
  }
`

export const CodeDisplay = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${LINES_COUNTER_WIDTH}px auto;
`

export const CODE_OFFSET = 20

export const Code = styled.pre`
  grid-area: 1 / 2 / 2 / 3;
  padding: 4px 0;
  margin-left: ${CODE_OFFSET}px;
  font-size: 16px;
  color: ${colors.dark[200]};
  counter-reset: lineOfCode;
`

export const LineOfCode = styled.div`
  position: relative;
  width: fit-content;
  padding: 4px 4px;
  margin: 4px 0px 2px;

  :before {
    content: counter(lineOfCode);
    position: absolute;
    top: 4px;
    left: ${-LINES_COUNTER_WIDTH - CODE_OFFSET}px;
    counter-increment: lineOfCode;
    width: ${LINES_COUNTER_WIDTH}px;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
    color: ${colors.light[900]};
  }
`

const INDENT_WIDTH = 10
export const Indent = styled.span`
  display: inline-block;
  width: ${({ level }) => `${level * INDENT_WIDTH}`}px;
`
