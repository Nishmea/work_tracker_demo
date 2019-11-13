import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../actions';

const defaultState = {
  isFetching: false,
  isValid: false,
  lastChecked: 0,
  data: {},
};

const user = (state = defaultState, action) => {
  switch (action.type) {

    case REQUEST_USER:
      return {
        ...state,
        isFetching: true,
      }
      break;

    case RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        isValid: true,
        lastChecked: action.lastChecked,
        data: action.data,
      }
      break;


    default:
      return {
        ...state,
      };
  }
}

export default user;
