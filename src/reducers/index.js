import {combineReducers} from 'redux';
import {responsiveStateReducer} from 'redux-responsive';

/*Reducers*/
import page from './page';
import log from './log';
import clock from './clock';
import edit from './edit';
import session from './session';
import token from './token';
import user from './user';

const rootReducer = combineReducers({
	screen: responsiveStateReducer,
	session,
	token,
	user,
	page,
	log,
	clock,
	edit,
});

export default rootReducer
