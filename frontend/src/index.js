import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// prod
const container = document.getElementById('pc_configurer_page');
if (container) {
    ReactDOM.render(<App />, container);
}

// dev
// ReactDOM.render(<App />, document.getElementById('root'));