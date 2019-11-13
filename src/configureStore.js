import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {responsiveStoreEnhancer} from 'redux-responsive';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers';

export default function configureStore(initialState) {

  const middlewares = [
    responsiveStoreEnhancer,
    applyMiddleware(thunk),
  ];

  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });

  if (process.env.NODE_ENV !== 'production') {
    //middlewares.push(applyMiddleware(logger));
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(...middlewares)
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

/*
const configureStore = (initialState) => {
	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(thunk), //redux-thunk
		window.devToolsExtension ? window.devToolsExtension() : f => f //Browser Extension
	));

	//React-Hot-Loader API
	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextReducer = require('./reducers/index').default;
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}

export default configureStore;
*/
