/*Material UI*/
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

/*Components*/
import TopBar from '../nav/TopBar';
import TextInput from '../inputs/TextInput';

/*Actions*/
import { login } from '../../actions/login';
import { fetchUser } from '../../actions';

/*Styles*/
import { palette } from '../../theme';
const styles = {
  wrapper: {
    height: '100%',
    width: '100%',
    paddingTop: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.secondary,
  },
  paper: {
    margin: 'auto',
    maxHeight: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflowY: 'auto',
  },
  fieldsWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textField: {
    minWidth: '360px',
    margin: '16px 0px',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      passwordView: 'password',
      user_id: '',
      password: '',
      forgotPassword: false,
      email: '',
      loginError: this.props.loginError,
    };
  }

  handleKeyPress(e){
    if(e.key === 'Enter'){
      this.props.login({user_id: this.state.user_id, password: this.state.password}).then(() => this.props.fetchUser())
    }
  }

  componentDidMount(){
    if (this.props.location.state !== undefined) {
      if ('message' in this.props.location.state) {
        this.setState({loginError: this.props.location.state.message})
      }
    }
  }

  render(){
    if (this.props.isValid) {
      return <Router.Redirect to="/" from="/login" />
    } else {
      return(
        <React.Fragment>

          <TopBar />

          <div style={styles.wrapper}>
            <Paper style={styles.paper} elevation={8} onKeyPress={(e) => this.handleKeyPress(e)}>
              <Typography variant={'h4'} style={{padding: '16px'}}>{TITLE + ' | Login'}</Typography>

              <div style={styles.fieldsWrapper}>
                <TextInput
                  label="Username"
                  fullWidth
                  required
                  value={this.state.user_id}
                  onChange={(e) => this.setState({user_id: e.target.value})}
                  style={styles.textField}
                />

                <TextField
                  id="login_password"
                  label="Password"
                  variant="outlined"
                  required
                  fullWidth
                  type={this.state.passwordView}
                  value={this.state.password}
                  style={styles.textField}
                  onChange={(e) => this.setState({password: e.target.value})}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex="-1"
                          disableRipple
                          onMouseDown={() => this.setState({passwordView: 'text'})}
                          onTouchStart={() => this.setState({passwordView: 'text'})}
                          onMouseUp={() => this.setState({passwordView: 'password'})}
                          onTouchEnd={() => this.setState({passwordView: 'password'})}
                        >
                          <Icon>visibility</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <Typography
                variant="h5"
                style={{padding: '16px 0px', color: palette.error}}
              >
                {this.state.loginError}
              </Typography>

              <div style={styles.buttonWrapper}>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={() => this.props.login({user_id: this.state.user_id, password: this.state.password}).then(() => this.props.fetchUser())}
                >
                  Login
                </Button>
              </div>

            </Paper>
          </div>
        </React.Fragment>
      )
    }
  }
}

const mapStatetoProps = (state) => {
  return{
    isValid: state.session.isValid,
    loginError: state.session.loginError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    login: (loginObj) => dispatch(login(loginObj)),
    fetchUser: () => dispatch(fetchUser()),
  }
}

Login.propTypes = {
  login: PropTypes.func,
  fetchUser: PropTypes.func,
  isValid: PropTypes.bool,
  loginError: PropTypes.string,
  location: PropTypes.object,
}

Login.defaultProps = {
  isValid: false,
  loginError: '',
}

export default Redux.connect(mapStatetoProps, mapDispatchToProps)(Login);
