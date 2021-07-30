import {
	REQUEST_FORGOT_PASS,
	RECEIVE_FORGOT_PASS,
	REQUEST_CHANGE_PASSWORD,
    RECEIVE_CHANGE_PASSWORD,
	REQUEST_CHANGE_PASSWORD_CLEAR
  } from '../actions/types';

  const INITIAL_STATE = {
	result: {},
	isFetching: false,
  };


  const ForgotPassword_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_FORGOT_PASS:
	      return Object.assign({}, state, {
	        isFetching: true,
			result: {}
	      })
	    case RECEIVE_FORGOT_PASS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        result: action.data,
	      })
		case REQUEST_CHANGE_PASSWORD:
		return Object.assign({}, state, {
			isFetching: true,
			result: {}
		})
		case RECEIVE_CHANGE_PASSWORD:
		return Object.assign({}, state, {
			isFetching: false,
			result: action.data,
		})
		case REQUEST_CHANGE_PASSWORD_CLEAR:
			return Object.assign({}, state, {
				isFetching: false,
				result: {}
			})
	    default:
	      return state
  }
}
  export default ForgotPassword_Reducer;
