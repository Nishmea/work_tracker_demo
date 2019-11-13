import {
  LOGOUT,
  VALID_LOGIN,
  FAILED_LOGIN,
} from '../actions/login';

const defaultState = {
  encoded: null,
  decoded: {},
};

const token = (state = defaultState, action) => {
  switch (action.type) {

    case VALID_LOGIN:
      return {
        ...state,
        encoded: action.jwt,
        decoded: JSON.parse(window.atob(action.jwt.split('.')[1])),
      }
      break;

    case FAILED_LOGIN:
      return {
        ...state,
        encoded: null,
        decoded: defaultState.decoded,
      }
      break;

    case LOGOUT:
      return {
        ...state,
        encoded: null,
        decoded: {},
      }
      break;

    default:
      return state;
  }
}

export default token;
