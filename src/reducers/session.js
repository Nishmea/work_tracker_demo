import {
  VALIDATE_LOGIN,
  VALID_LOGIN,
  LOGOUT,
  LOGIN,
  FAILED_LOGIN,
} from '../actions/login';

const defaultState = {
  isValidating: false,
  isValid: false,
  lastChecked: 0,
  mode: null,
  loginError: '',
};

const session = (state = defaultState, action) => {
  switch (action.type) {

    case LOGIN:
    case VALIDATE_LOGIN:
      return{
        ...state,
        isValidating: true,
        isValid: false,
        mode: null,
        loginError: '',
        lastChecked: 0,
      }
      break;

    case VALID_LOGIN:
      return{
        ...state,
        isValidating: false,
        isValid: true,
        mode: action.mode,
        loginError: '',
        lastChecked: Date.now(),
        warningTimer: action.warningTimer,
        logoutTimer: action.logoutTimer,
      }
      break;

    case FAILED_LOGIN:
      return{
        ...state,
        isValidating: false,
        isValid: false,
        loginError: action.message,
        lastChecked: Date.now(),
      }
      break;

    case LOGOUT:
      return{
        ...state,
        isValidating: false,
        isValid: false,
        mode: null,
        loginError: 'You have been logged out.',
        lastChecked: 0,
        warningTimer: null,
        logoutTimer: null,
      }
      break;

    default:
      return state;
  }
}

export default session;
