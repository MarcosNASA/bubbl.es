import * as React from 'react'
import styled from 'styled-components'

import { telescope } from '../../lib/telescope/telescope'

import { DEFAULT_SCOPES_STATE, useScopesDispatch } from '../../context/scopes'
import { generateColors } from '../../helpers'
import { debounce } from '../../helpers/utils'

import { Alert } from '../../components/Alerts'

import CodeMirror from 'codemirror'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/keymap/sublime'
import './codemirror.css'

const codeSample = `function addOdds(...numbers) {
  var total = 0;
  for (let number of numbers) {
    if (number % 2 !== 0) {
      total += number;
    }
  }
  return total;
}
`

const useCodeMirror = (codeEditorRef) =>
  React.useCallback(
    (handleChange) => {
      const codeEditor = codeEditorRef.current
      if (!codeEditor) return

      const debouncedHandleChange = debounce(handleChange, 600)

      const codeMirror = CodeMirror.fromTextArea(codeEditor, {
        mode: 'application/javascript',
        parserfile: 'javascript.js',
        lineNumbers: true,
        lineWrapping: false,
        fixedGutter: false,
        matchBrackets: true,
        autofocus: true,
        readOnly: false,
        tabSize: 2,
        tabindex: 0,
      })
      codeMirror.setOption('theme', 'ayu-mirage')
      codeMirror.on('change', debouncedHandleChange)

      codeMirror.setValue(codeSample)

      return () => {
        codeMirror.off('change', debouncedHandleChange)
      }
    },
    [codeEditorRef]
  )

const Container = styled.div`
  position: relative;
  height: calc(100vh - 100px);
  background: #101014;
  color: #cbccc6;
`

const CodeEditor = () => {
  const setScope = useScopesDispatch()
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')
  const codeEditorRef = React.useRef()
  const setupCodeMirror = useCodeMirror(codeEditorRef)

  React.useLayoutEffect(() => {
    const handleChange = (event) => {
      const value = event.getValue()
      setCode(value)
    }
    return setupCodeMirror(handleChange)
  }, [setCode, setupCodeMirror])

  React.useEffect(() => {
    try {
      const bubbles = telescope(code)
      const { scopes } = bubbles
      const numberOfScopes = scopes.length
      setScope({
        ...bubbles,
        bubbleColors: generateColors(
          numberOfScopes /* @TODO: Generate colors based on max number of levels and mod scope's colors */
        ),
      })
      setError('')
    } catch (e) {
      setError(e)
      setScope(DEFAULT_SCOPES_STATE)
    }
  }, [code, setScope])

  return (
    <Container>
      <textarea ref={codeEditorRef} />
      {error && <Alert>{error.message}</Alert>}
    </Container>
  )
}

export default CodeEditor