import ReactDOM from 'react-dom'

export const Portal = ({ children, container }) => ReactDOM.createPortal(children, container)
