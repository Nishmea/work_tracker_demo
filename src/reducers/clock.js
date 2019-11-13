import {
	CLOCK_IN,
	CLOCK_OUT,
	RECEIVE_RECORDS,
	SET_CLOCK,
	CHANGE_TASK,
	CHANGE_PROJECT,
} from '../actions';

const clock = (state = {
	status: 'OUT',
	clock_id: null,
	unix_time: null,
	task: '',
	project: '',
}, action) => {
	switch (action.type) {

		case CHANGE_TASK:
			return {
				...state,
				task: action.newTask,
			}
			break;

		case CHANGE_PROJECT:
			return {
				...state,
				project: action.newProject,
			}
			break;

		case RECEIVE_RECORDS:
			return {
				...state,
				status: action.lastRecord.status,
				project: action.lastRecord.project,
				task: action.lastRecord.task,
			}
			break;

		/*
		case CLOCK_IN:
			return {
				...state,
				status: 'IN',
				time: action.time,
        payload: action.payload,
			}
			break;

		case CLOCK_OUT:
			return {
				...state,
				status: 'OUT',
				time: action.time,
        payload: action.payload,
			}
			break;
		*/
		
		case SET_CLOCK:
			return {
				...state,
				clock_id: action.clock_id,
				unix_time: action.unix_time,
			}
			break;

		default:
			return state
	}
}

export default clock;
