import { CHANGE_PAGE, TOGGLE_DRAWER, TRIGGER_SNACKBAR } from '../actions';

const page = (state = {
	current: 'clock',
	drawerOpen: false,
  snackbar: {
    kind: null,
    message: '',
    time: null,
  },
}, action) => {
	switch (action.type) {

		case CHANGE_PAGE:
			return {
				...state,
				current: action.page,
			}
			break;

		case TOGGLE_DRAWER:
			return {
				...state,
				drawerOpen: !state.drawerOpen,
			}
			break;

		case TRIGGER_SNACKBAR:
			return {
				...state,
				snackbar: {
					kind: action.kind,
					message: action.message,
					time: Date.now(),
				},
			}
			break;

		default:
			return state
	}
}

export default page;
