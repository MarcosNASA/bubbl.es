import * as React from 'react'
import {
  Blog,
  ButtonContainer,
  ButtonLink,
  Center,
  Code,
  CodeBox,
  Header,
  HeaderTitle,
  List,
  ListItem,
  Paragraph,
  Section,
  SectionSubtitle,
  SectionTitle,
  SocialMedia,
} from '../../components/ui/Blog'
import { ResourceLink } from '../../components/ui/ResourceLink'

const Theory = () => (
  <Blog>
    <Header>
      <HeaderTitle>JS Scope Theory</HeaderTitle>
    </Header>
    <Section>
      <Header>
        <SectionTitle>What's a block?</SectionTitle>
      </Header>
      <Paragraph>
        According to the{' '}
        <ResourceLink href="https://tc39.es/ecma262/" target="_blank" rel="noopener noreferrer">
          ECMAScript Language Specification
        </ResourceLink>
        , a block statement is composed by a pair of brackets and a list of statements. If you are familiar with
        functions or any sort of flow control statement (for loops, if statements, switch statements...), you are
        already familiar with blocks.
      </Paragraph>

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
      <Paragraph>Blocks allows us to group a set of statements together.</Paragraph>
    </Section>
    <Section>
      <Header>
        <SectionTitle>What's the scope?</SectionTitle>
      </Header>
      <Paragraph>
        The scope can be seen as the set of rules which determines whether a variable is available or not in a specific
        execution context or region of the code.
      </Paragraph>
      <Paragraph>
        JS Scope is <var>lexically</var> determined.
      </Paragraph>
      <Paragraph>
        This means that the scopes are set before the code execution, during the compilation (<var>lexical</var> comes
        from the compilation <var>lexing</var> step where the code is split into tokens, the smallest meaningful chunks
        of information).
      </Paragraph>
      <Paragraph>
        We can take advantage of this information in order to predict and visualize the scopes just from looking at our
        code!
      </Paragraph>
    </Section>
    <Section>
      <Header>
        <SectionTitle>How do we visualize the scope chain?</SectionTitle>
      </Header>
      <Paragraph>
        The JS engine declares a scope for each block in the code and <var>assigns</var> each variable to the scope
        where it was declared.
      </Paragraph>
      <Paragraph>
        In order to predict scopes, thus, we will have to think like the JS engine does! Every time we find a block in
        our code, we will assign a color to it. Every time we find a variable, we will also assign a color to it. But in
        order to do that, we need to dive into some concepts!
      </Paragraph>
      <Section>
        <Header>
          <SectionSubtitle>Variables: target and source references</SectionSubtitle>
        </Header>
        <Paragraph>Every variable in our program has one out of two roles: target or source.</Paragraph>
        <Paragraph>
          In technical documents, target is commonly referred as LHS (left-hand side) and source is commonly referred as
          RHS (right-hand side). This terminology was adapted by computer scientists from maths.
        </Paragraph>
        <Paragraph>
          Whenever we assign something to a variable, we say the variable is in a target reference position (or LHS):
          the variable is the target of the assignment operator.
        </Paragraph>
        <Paragraph>
          In other words, a target reference to a variable has a <var>writing</var> role: we write a value into the
          variable.
        </Paragraph>
        <Paragraph>
          Whenever we pass a variable as an argument in a function call, we say the variable is in a source reference
          position (or RHS): our variable is the source of the value for the function parameter.
        </Paragraph>
        <Paragraph>
          In other words, a source reference to a variable has a <var>reading</var> role: we read the value that the
          variable holds.
        </Paragraph>
        <CodeBox>
          <Code>
            {`var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // "array" is a target reference
addOdds(...array); // "array" is a source reference`}
          </Code>
        </CodeBox>
        <Paragraph>To state it (clearly):</Paragraph>
        <List>
          <ListItem>
            a target reference is the one where we access a memory address to write a value in it, and
          </ListItem>
          <ListItem>a source reference is the one where we access a memory address to read a value from it.</ListItem>
        </List>
      </Section>
      <Section>
        <Header>
          <SectionSubtitle>Variable declarations</SectionSubtitle>
        </Header>
        <Paragraph>
          A variable declaration is a statement that allocates some space in memory to store a value.
        </Paragraph>
        <Paragraph>
          Formal variable declarations can be easily spotted: in JS, there are 3 keywords which will help us to formally
          declare a variable: <var>var</var>, <var>const</var> and <var>let</var>.
        </Paragraph>
        <Paragraph>
          However, there are other variables in the target roles that might join our variable declaration group, as in
          function parameters or loop declarations.
        </Paragraph>
        <CodeBox>
          <Code>
            {`function add(a, b) {
/* 
  a and b fulfill the target role and are indeed variable declarations
  which will be initialized with the passed arguments at run-time
*/
  return a + b;
}`}
          </Code>
        </CodeBox>
      </Section>
      <Section>
        <Header>
          <SectionSubtitle>Scope &amp; Variables</SectionSubtitle>
        </Header>
        <Paragraph>
          The variables declared in a particular scope will only be available inside that scope and the nested ones.
        </Paragraph>
        <Paragraph>
          To understand JS scoping rules applied to variables availability, we need to differentiate between function
          scoped variables and block scoped variables.
        </Paragraph>
        <Paragraph>
          Before ES2015, the only way to declare a variable in JS was via the <var>var</var>
          variable declaration. The <var>var</var> variable declaration declares a <var>function scoped variable</var>.
          Function scoped variables set the bounds for their availability to the nearest enclosing function and, as we
          discussed previously, the nested blocks.
        </Paragraph>
        <Paragraph>
          ES2015 introduced <var>let</var> and <var>const</var> variable declarations. Both <var>let</var> and{' '}
          <var>const</var> variable declarations declare <var>block scoped variables</var>. Block scoped variables set
          the bounds for their availability to the nearest enclosing block (whether it is a function, a pair of
          brackets, an if statement, a for statement...), and, as we discussed previously, the nested blocks.
        </Paragraph>
      </Section>
      <Section>
        <Header>
          <SectionSubtitle>Conclusion</SectionSubtitle>
        </Header>
        <Paragraph>
          The information we need to extract from the previous sub-Sections and which will give us the rules to assign a
          color to our variables can be summarized in two main ideas:
          <br />— Variable declarations will always have the color of the block where they are being declared, attending
          to the differences that using block or function scoped variables might carry. We will always consider function
          parameters as declarations inside the function scope.
          <br />— Whenever we find a variable in a source position or a variable in a target position which is not a
          variable declaration, we will perform a lookup for its declaration, starting in the current block all the way
          up to the outermost. We will stop as soon as we find it and will assign to it the color of the block where it
          was declared.
        </Paragraph>
        <Paragraph>
          With our current knowledge, we should be ready to test our new gained scope analysis skills!
          <br />
          Try revisiting our <var>addOdds</var> function and assign a colored bubble to each scope and variable we can
          find!
        </Paragraph>
        <details>
          <summary>Solution</summary>
          <CodeBox>
            <Code>
              {`// global/outer scope start: WHITE
function addOdds(...numbers) { // 1st block start
  var total = 0;
  // function scope: RED
  for (let number of numbers) { // 2nd block start
    // loop scope: BLUE
    if (number % 2 !== 0) { // 3rd block start
      // if scope: GREEN
      total += number;
    } // 3rd block end
  } // 2nd block end
  return total;
} // 1st block end`}
            </Code>
          </CodeBox>
        </details>
      </Section>
    </Section>
    <Section>
      <Header>
        <SectionTitle>About this project</SectionTitle>
      </Header>
      <Paragraph>
        Bubbl.es is the first of the «3 pilars project» inspired by Kyle Simpson. It represents the scope chain as
        colored bubbles. The main purpose of this project is helping new JS students to understand the scoping system
        and is intended for small snippets; however, it should be able to handle any script.
      </Paragraph>
      <Paragraph>
        Authored by Marcos S. (
        <ResourceLink href="https://www.twitter.com/MarcosNASA" target="_blank" rel="noopener noreferrer">
          @MarcosNASAG
        </ResourceLink>
        ) - 2020.
      </Paragraph>
      <Center>
        <ResourceLink href="https://github.com/MarcosNASA/bubbl.es" target="_blank" rel="noopener noreferrer">
          <SocialMedia>
            <Center>
              <svg height="24" width="24">
                <title>GitHub icon</title>
                <path
                  fill="#FFFFFF"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                ></path>
              </svg>
              <p>Check it in GitHub</p>
            </Center>
          </SocialMedia>
        </ResourceLink>
      </Center>
    </Section>
    <Section>
      <Header>
        <SectionTitle>Want to learn more?</SectionTitle>
      </Header>
      <Paragraph>
        <ResourceLink href="https://github.com/getify/You-Dont-Know-JS" target="_blank" rel="noopener noreferrer">
          You Don't Know JS Yet
        </ResourceLink>{' '}
        is a book series by Kyle Simpson (
        <ResourceLink href="https://www.twitter.com/getify" target="_blank" rel="noopener noreferrer">
          @getify
        </ResourceLink>
        ) which dives deep into the core mechanisms of the JavaScript language.
      </Paragraph>
      <Paragraph>
        The second chapter of the series (
        <ResourceLink
          href="https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Scope &amp; Closures
        </ResourceLink>
        ) takes a look into how the scoping rules behave in JS.
      </Paragraph>
      <Center>
        <ButtonContainer>
          <ButtonLink href="https://leanpub.com/ydkjsy-scope-closures" target="_blank" rel="noopener noreferrer">
            Buy it now!
          </ButtonLink>
        </ButtonContainer>
      </Center>
    </Section>
  </Blog>
)

export default Theory
