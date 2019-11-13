import {
	REQUEST_RECORDS,
	RECEIVE_RECORDS,
	FETCH_WEEKLY,
	FETCHING_WEEKLY,
	FETCHED_WEEKLY,
	DELETE_RECORD,
	UPDATE_RECORD,
	ADD_RECORD,
	CLOCK_IN,
	CLOCK_OUT,
} from '../actions';

const log = (
	state = {
		isFetching: false,
		isValid: false,
		lastChecked: 0,
		lastRecord: {},
		records: [],
	},
	action
) => {
	switch (action.type) {
    case REQUEST_RECORDS:
      return {
        ...state,
        isFetching: true,
      }
      break;

    case RECEIVE_RECORDS:
      return{
        ...state,
        isFetching: false,
				isValid: true,
				lastChecked: Date.now(),
        records: action.records,
				lastRecord: action.lastRecord,
      }
      break;

    case FETCHING_WEEKLY:
      return {
        ...state,
        isFetching: true,
      }
      break;

    case FETCHED_WEEKLY:
      return {
        ...state,
        isFetching: false,
				weekly: action.weekly,
      }
      break;

		case ADD_RECORD:
		case UPDATE_RECORD:
		case DELETE_RECORD:
			return {
				...state,
				isValid: false,
			}
			break;

		case CLOCK_IN:
			return {
				...state,
				isValid: false,
			}
			break;

		case CLOCK_OUT:
			return {
				...state,
				isValid: false,
			}
			break;

		default:
			return state
	}
}

export default log;
