import axios from 'axios';

export const LOGIN = 'LOGIN';
export const VALID_LOGIN = 'VALID_LOGIN';
export const FAILED_LOGIN = 'FAILED_LOGIN';
export const login = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: LOGIN,
      })
      axios({
        method: 'post',
        url: 'api/login',
        data: payload,
      }).then((res) => {
        switch (res.status) {
          case 200:
          case 302:
            dispatch({
              type: VALID_LOGIN,
              jwt: res.headers.authenticate,
            })
            resolve();
            break;

          default:
            dispatch({
              type: FAILED_LOGIN,
              message: 'Incorrect ID or Password',
            })
            reject();
        }
      }).catch((err) => {
        dispatch({
          type: FAILED_LOGIN,
          message: 'Incorrect ID or Password',
        })
        reject();
      })
    })
  }
}

export const SESSION_WARNING = 'SESSION_WARNING';
export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const validateLogin = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: VALIDATE_LOGIN,
      })
      axios({
        method: 'get',
        url: 'api/validate',
        validateStatus: function (status) {
          return status < 500;
        },
      }).then((res) => {
        switch (res.status) {

          case 200:
            dispatch({
              type: VALID_LOGIN,
              jwt: res.headers.authenticate,
            })
            resolve();
          break;

          case 403:
            dispatch({
              type: FAILED_LOGIN,
              message: '',
            })
            reject();
          break;

          default:
            dispatch({
              type: FAILED_LOGIN,
              message: 'Please Login to Proceed',
            })
            reject();
        }
      }).catch((err) => {
        console.warn(err.message);
        reject();
      })
    });
  }
}

export const LOGOUT = 'LOGOUT';
export const logout = () => {
  return (dispatch, getState) => {
    axios({
      method: 'get',
      url: 'api/logout',
    }).then((res) => {
      dispatch({
        type: LOGOUT,
      })
    })
  }
}
