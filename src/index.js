import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

/*Material-UI*/
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

/*Store*/
import configureStore from './configureStore';

/*Components*/
import App from './components/App';

const store = configureStore();

const renderApp = () => {
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  //module.hot.accept('./components/App', renderApp)
  module.hot.accept('./index.js', renderApp)
}

renderApp();
