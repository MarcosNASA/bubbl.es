import { Link } from 'wouter'

import { PATH_BUBBLES } from '../../constants'

import {
  Blog,
  Center,
  Code,
  CodeBox,
  Header,
  HeaderTitle,
  ButtonContainer,
  Section,
  SectionTitle,
  ButtonLink,
} from '../../components/ui/Blog'
import { colors } from '../../components/ui/theme'

export const Welcome = () => (
  <Blog>
    <Header>
      <HeaderTitle>Welcome to Bubbl.es!</HeaderTitle>
    </Header>
    <Section></Section>
    <Section>
      <SectionTitle color={colors.light[100]}>
        <Center>
          Would you like to learn a bit about the JS scope chain? If so,
          <ButtonContainer>
            <ButtonLink as={Link} to={PATH_BUBBLES}>
              grab this piece of code and come play!
            </ButtonLink>
          </ButtonContainer>
        </Center>
      </SectionTitle>
    </Section>
    <Section>
      <CodeBox>
        <Code>
          {`function addOdds(...numbers) { // 1st block start
  var total = 0;
  for (let number of numbers) { // 2nd block start
    if (number % 2 !== 0) { // 3rd block start
      total += number;
    } // 3rd block end
  } // 2nd block end
  return total;
} // 1st block end`}
        </Code>
      </CodeBox>
    </Section>
  </Blog>
)
