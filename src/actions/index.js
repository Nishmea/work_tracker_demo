import axios from 'axios';
import querystring from 'querystring';

import {mapObject} from './utility';

export const CHANGE_TASK = 'CHANGE_TASK';
export const changeTask = (newTask) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TASK,
      newTask,
    })
  }
}

export const CHANGE_PROJECT = 'CHANGE_PROJECT';
export const changeProject = (newProject) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_PROJECT,
      newProject,
    })
  }
}

export const EDIT_RECORD = 'EDIT_RECORD';
export const editRecord = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_RECORD,
      payload,
    })
  }
}

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_USER,
    })
    axios({
      method: 'get',
      url: 'api/user',
      headers: {
        'Authenticate': getState().token.encoded,
      },
    }).then((res) => {
      dispatch({
        type: RECEIVE_USER,
        data: res.data,
      })
    }).catch((err) => {
      console.warn(err.message)
    })
  }
}

export const CLOCK_IN = 'CLOCK_IN';
export const clockIn = () => {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: 'api/clockinout',
      //url: '../../php/clockinout.php',
      data: {
        time: Date.now(),
        status: 'IN',
        task: getState().clock.task,
        project: getState().clock.project,
      },
      headers: {
        'Authenticate': getState().token.encoded,
      },
      dataType: 'json',
    }).then((res) => {
      if (res.data === 'OK') {
        dispatch({
          type: CLOCK_IN,
          time: Date.now(),
        })
      } else {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: res.data,
          time: Date.now(),
        })
      }
    }).catch((err) => {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: err,
        })
    })
  }
}

export const CLOCK_OUT = 'CLOCK_OUT';
export const clockOut = () => {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: 'api/clockinout',
      //url: '../../php/clockinout.php',
      data: {
        time: Date.now(),
        status: 'OUT',
        task: getState().clock.task,
        project: getState().clock.project,
      },
      headers: {
        'Authenticate': getState().token.encoded,
      },
      dataType: 'json',
    }).then((res) => {
      if (res.data === 'OK') {
        dispatch({
          type: CLOCK_OUT,
          time: Date.now(),
        })
      } else {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: res.data,
          time: Date.now(),
        })
      }
    }).catch((err) => {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: err,
          time: Date.now(),
        })
    })
  }
}

export const REQUEST_RECORDS = 'REQUEST_RECORDS';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
export const fetchRecords = (date) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_RECORDS,
    })
    axios({
      method: 'get',
      url: 'api/records',
      params: {
        date: date,
      },
      headers: {
        'Authenticate': getState().token.encoded,
      },
    }).then((res) => {
      dispatch({
        type: RECEIVE_RECORDS,
        lastRecord: res.data.lastRecord,
        records: res.data.records,
      })
    })
  }
}

export const FETCH_WEEKLY = 'FETCH_WEEKLY';
export const FETCHING_WEEKLY = 'FETCHING_WEEKLY';
export const FETCHED_WEEKLY = 'FETCHED_WEEKLY';
export const fetchWeekly = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FETCHING_WEEKLY,
    });
    axios({
      method: 'post',
      url: '../../php/weekly.php',
      data: querystring.stringify(payload),
      dataType: 'json',
    }).then((response) => {
      dispatch({
        type: FETCHED_WEEKLY,
        weekly: response.data,
      })
    })
  }
}

export const DELETE_RECORD = 'DELETE_RECORD';
export const deleteRecord = (id) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '../../php/delete.php',
      data: querystring.stringify({id: id}),
      dataType: 'json',
    }).then((response) => {
      if (response.data === 'OK') {
        dispatch({
          type: DELETE_RECORD,
        })
      } else {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: 'DELETE RECORD FAIL',
          time: Date.now(),
        })
      }
    }).catch((err) => {
      console.warn(err.message)
    })
  }
}

export const ADD_RECORD = 'ADD_RECORD';
export const addRecord = (payload) => {
  return (dispatch, getState) => {

    axios({
      method: 'post',
      url: 'api/records/add',
      data: payload,
      headers: {
        'Authenticate': getState().token.encoded,
      },
    }).then((res) => {

      if (res.data === 'OK') {
        dispatch({
          type: ADD_RECORD,
        })
      } else {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: 'ADD RECORD FAIL',
          time: Date.now(),
        })
      }
    }).catch((err) => {
      console.warn(err.message)
    })
  }
}

export const UPDATE_RECORD = 'UPDATE_RECORD';
export const updateRecord = () => {
  return (dispatch, getState) => {
    let newRecord = {...getState().edit.editRecord};
    newRecord['time'] = newRecord.time.valueOf();
    axios({
      method: 'post',
      url: 'api/records/update',
      data: newRecord,
      //url: '../../php/update.php',
      //data: querystring.stringify(newRecord),
      headers: {
        'Authenticate': getState().token.encoded,
      },
    }).then((res) => {
      if (res.data === 'OK') {
        dispatch({
          type: UPDATE_RECORD,
        })
      } else {
        dispatch({
          type: TRIGGER_SNACKBAR,
          kind: 'e',
          message: 'UPDATE RECORD FAIL',
          time: Date.now(),
        })
      }
    }).catch((err) => {
      console.warn(err.message)
    })
  }
}

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    page,
  }
}

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = () => {
  return {
    type: TOGGLE_DRAWER,
  }
}

export const TRIGGER_SNACKBAR = 'TRIGGER_SNACKBAR';
export const triggerSnackbar = (kind, message) => {
  return (dispatch) => {
    dispatch({
      type: TRIGGER_SNACKBAR,
      kind,
      message,
		  time: Date.now(),
    })
  }
}

export const SET_CLOCK = 'SET_CLOCK';
export const setClock = (clock_id, unix_time) => {
  return {
    type: SET_CLOCK,
    clock_id,
    unix_time,
  }
}
