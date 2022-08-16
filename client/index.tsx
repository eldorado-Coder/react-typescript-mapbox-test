import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 3000,
    offset: '30px',
    type: types.INFO,
    // you can also just use 'scale'
    transition: transitions.SCALE
}
  
const Root = () => (
<AlertProvider template={AlertTemplate} {...options}>
    <App />
</AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById("react-root"));
