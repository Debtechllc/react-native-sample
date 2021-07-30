import {
	REQUEST_LOGIN,
	RECEIVE_LOGIN,
	REQUEST_ASSIGN_STORAGE_USER,
	RECEIVE_ERROR_LOGIN,
	REQUEST_LOGOUT,
	REQUEST_USER,
	RECEIVE_USER,
	UPDATE_USER
} from '../actions/types';
import Navigator from '../Navigator';
import { NavigationActions } from 'react-navigation';

const INITIAL_STATE = {
	user: {},
	user_id: 0,
	isFetching: false,
	error: 0,
	message: null
};


const Login_Reducer = (state = INITIAL_STATE, action) => {
//	console.log('action')
 //   console.log(action)
	switch (action.type) {

		case REQUEST_LOGIN:
			return Object.assign({}, state, {
				isFetching: true,
				user: null,
				user_id: null,
				
			})
		case RECEIVE_LOGIN:

			return Object.assign({}, state, {
				isFetching: false,
				user: action.user,
				user_id: action.user.id,
				error: 0,
				message:''
			})
		case RECEIVE_ERROR_LOGIN:

			return Object.assign({}, state, {
				isFetching: false,
				user: null,
				user_id: null,
				error: 1,
				message: action.json
			})
		case REQUEST_ASSIGN_STORAGE_USER:

			return Object.assign({}, state, {
				isFetching: false,
				user: action.user,
				user_id: action.user.id,
				error: 0,
				message:''
			})
		case REQUEST_LOGOUT:
			return Object.assign({}, state, {
				isFetching: false,
				user: null,
				user_id: null,
				error: 0,
				message:''
			})
		case REQUEST_USER:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case RECEIVE_USER:
			return Object.assign({}, state, {
				isFetching: false,
				user: action.user.data,
				user_id: action.user.data.id,
				error: 0,
				message:''
			})
		case UPDATE_USER:
			return Object.assign({}, state, {
				isFetching: true,
			})
		default:
			return state
	}
}
export default Login_Reducer;
