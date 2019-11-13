import {
	EDIT_RECORD,
 } from '../actions';

const defaultState = {
	editRecord: {
		time_id: null,
		entry_id: null,
		status: null,
		task: null,
		project: null,
		time: null,
	},
}

const edit = (state = defaultState, action) => {
	switch (action.type) {

		case EDIT_RECORD:
			return {
				...state,
				editRecord: {
					...defaultState.editRecord,
					...state.editRecord,
					...action.payload,
				},
			}
			break;

		default:
			return state
	}
}

export default edit;
