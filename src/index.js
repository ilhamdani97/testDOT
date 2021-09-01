// Polyfill IE
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

// Main Style
import './assets/styles/main.scss';

// App
import App from './container/app';

ReactDOM.render(<App />, document.getElementById('root'));
