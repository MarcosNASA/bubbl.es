import * as React from 'react'
import { styled } from '@linaria/react'

import { colors } from './theme'

const SpinnerSVG = styled.svg`
  animation: 2s linear infinite spinnerAnimation;
  transform-origin: center center;

  @keyframes spinnerAnimation {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`
export const Spinner = () => (
  <SpinnerSVG
    xmlns="http://www.w3.org/2000/svg"
    width="50px"
    height="50px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    role="progressbar"
    aria-live="polite"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#e15b64"
      strokeWidth="10"
      strokeDasharray="164.93361431346415 56.97787143782138"
      r="35"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1.25s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </SpinnerSVG>
)
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const FullPage = styled.div`
  display: grid;
  place-items: center;
  width 100%;
  height: 100%;
  background: ${({ background }) => background || colors.dark[200]};
`

export const FullPageSpinner = ({ background }) => (
  <FullPage background={background}>
    <Spinner />
  </FullPage>
)
