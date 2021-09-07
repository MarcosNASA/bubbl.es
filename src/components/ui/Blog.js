import { motion } from 'framer-motion'
import styled from 'styled-components'

import { colors, desktop } from '../../components/ui/theme'

export const Blog = styled.article`
  margin: 60px 18px 60px 18px;
  color: ${colors.light[200]};
`

export const Header = styled(motion.header).attrs({
  initial: {
    opacity: 0,
    translateX: '-100vw',
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
  transition: {
    duration: 1.5,
    ease: 'easeInOut',
  },
})``

export const HeaderTitle = styled.h2`
  margin: 64px 0 16px;
  font-size: 30px;
  font-family: 'Lobster', sans-serif;
  line-height: 1.2;
  text-align: center;
  color: ${colors.yellow[200]};
`

export const Section = styled.section`
  :not(:last-child) {
    margin-bottom: 45px;
  }
`

export const SectionTitle = styled(motion.h3).attrs({
  initial: {
    opacity: 0,
    translateX: '-100vw',
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
  transition: {
    duration: 2,
    ease: 'easeInOut',
  },
})`
  margin: 64px 0 16px;
  font-size: 24px;
  font-family: 'Lobster', sans-serif;
  line-height: 1.3;
  color: ${({ color }) => color || colors.yellow[200]};
`

export const SectionSubtitle = styled(motion.h4).attrs({
  initial: {
    opacity: 0,
    translateX: '-100vw',
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
  transition: {
    duration: 2.5,
    ease: 'easeInOut',
  },
})`
  margin: 16px 0 12px;
  font-size: 18px;
  font-family: 'Lobster', sans-serif;
  line-height: 1.4;
  color: ${colors.yellow[200]};
`

export const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;

  :not(:last-child) {
    margin-bottom: 30px;
  }
`

export const CodeBox = styled(motion.div).attrs({
  tabIndex: 0,
  animate: {
    opacity: [0, 1],
    translateY: [-30, 25, -20, 15, -10, 5, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
})`
  margin: 30px 12px;
  padding: 30px 30px;
  border-radius: 8px;
  box-shadow: 18px 18px 2px 0px rgba(0, 0, 0, 0.25);
  background: ${colors.dark[100]};

  ${desktop} {
    margin: 30px -45px;
    padding: 30px 60px;
  }
`

export const Code = styled.pre`
  font-family: monospace;
  font-size: 16px;
  line-height: 1.5;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-button:single-button {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.accent[200]};
    border-radius: 12px;
  }
`

export const SocialMedia = styled.div`
  margin-top: 24px;
  p {
    margin-top: 12px;
  }
`

export const ButtonContainer = styled.div`
  margin-top: 30px;
`

export const ButtonLink = styled.a`
  display: inline-block;
  padding: 12px 21px;
  background-color: ${colors.accent[200]};
  border-radius: 100px;
  color: ${colors.light[100]};
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;

  :hover {
    background-color: ${colors.accent[100]};
  }
`

export const List = styled.ul`
  margin-left: 60px;

  :not(:last-child) {
    margin-bottom: 30px;
  }
`

export const ListItem = styled.li`
  :not(:last-child) {
    margin-bottom: 12px;
  }
`

export const Center = styled.div`
  display: grid;
  place-items: center;
`
