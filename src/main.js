import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import { Provider } from 'react-redux';
import App from './components/App';
import Promise from 'promise-polyfill';
import "../node_modules/react-vis/dist/style.css";

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// To add Promise to window for older browsers
if (!window.Promise) {
  window.Promise = Promise;
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = (Component) => {
  const routes = require('./routes/index').default(store);
  ReactDOM.render(<Provider store={store}><Component routes={routes} /></Provider>, MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = (Component) => {
      try {
        renderApp(Component);
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        const NextApp = require('./components/App').default;
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(NextApp);
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render(App);

