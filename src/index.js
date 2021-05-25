import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import State from "./context/State";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <State>
    <App />
  </State>,
  document.getElementById('root')
);

reportWebVitals();
