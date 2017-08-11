import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
} from 'react-redux';
import {
  Router,
  browserHistory,
} from 'react-router';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  composeWithDevTools,
} from 'redux-devtools-extension';
import thunk from 'thunk';
import reducer from './reducers';
import routes from './routes';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

if (__DEV__ && module.hot) {
  module.hot.accept('./reducers.js', () => {
    store.replaceReducer(reducer)
  });
}

window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={browserHistory}
        onUpdate={() => window.scrollTo(0, 0)}
        routes={routes}
      />
    </Provider>,
    window.document.getElementById('root'),
  );
});
