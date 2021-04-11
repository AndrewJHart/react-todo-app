import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserHistory, createBrowserHistory } from 'history';
import AppLayout from './AppLayout';

import './styles.css';

// Create a history of your choosing note that we're using
// browser history only since this app is not a universal js app
export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <AppLayout routerHistory={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

