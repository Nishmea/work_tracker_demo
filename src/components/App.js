import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

/*Components*/
import Main from './main/Main';
import Login from './login/Login';
import Loading from './misc/Loading';

import TopBar from './nav/TopBar';
import Drawer from './nav/Drawer';
import Snackbar from './nav/Snackbar';
import Day from './day/Day';
import Week from './week/Week';

/*Actions*/
import { validateLogin } from '../actions/login';
import { fetchUser } from '../actions';

class App extends React.Component {

	renderRouter(){
    let isValid = this.props.isValid;

		return (
			<HashRouter>
				<TopBar />
				<Drawer />
				<Snackbar />
				<Switch>
					<Route exact path="/login" component={Login} />

					<Route
            exact
            path="/"
            render={() => (
              (isValid) ?
              (<Main />) :
              (<Redirect to={{pathname: '/login', state: {from: '/', message: 'Please Login to Proceed'}}} />)
            )}
          />

					<Route
            exact
            path="/day"
            render={() => (
              (isValid) ?
              (<Day />) :
              (<Redirect to={{pathname: '/login', state: {from: '/day', message: 'Please Login to Proceed'}}} />)
            )}
          />

					{/*
					<Route exact path="/week" component={Week}/>
					*/}
				</Switch>
			</HashRouter>
		)
	}

  componentDidMount(){
    if (!this.props.lastChecked) {
      this.props.validateLogin().then(() => {
        this.props.fetchUser();
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.props.lastChecked && !this.props.isValidating) {
      this.props.validateLogin().then(() => {
        this.props.fetchUser();
      });
    }
  }

	render() {
    if (this.props.isValidating) {
      return <Loading />;
    } else {
      return(
        <React.Fragment>
          <CssBaseline />
          {this.renderRouter(this.props.isValid)}
        </React.Fragment>
      )
    }
	}
}

const mapStateToProps = (state) => {
	return {
    isValid: state.session.isValid,
    isValidating: state.session.isValidating,
    lastChecked: state.session.lastChecked,
    privilege: state.token.decoded.privilege,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
    validateLogin: () => dispatch(validateLogin()),
    fetchUser: () => dispatch(fetchUser()),
	}
};

App.propTypes = {
  isValid: PropTypes.bool,
  isValidating: PropTypes.bool,
  lastChecked: PropTypes.number,
  privilege: PropTypes.string,
  validateLogin: PropTypes.func,
  fetchUser: PropTypes.func,
}

App.defaultProps = {
  isValidating: false,
  lastChecked: 0,
  privilege: '0',
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(App);
