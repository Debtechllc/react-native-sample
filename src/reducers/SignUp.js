import {
	REQUEST_SIGN_UP,
	RECEIVE_SIGN_UP,
  } from '../actions/types';
	import Navigator from '../Navigator';
	import { NavigationActions } from 'react-navigation';

  const INITIAL_STATE = {
    user: {},
    user_id: null,
	isFetching: false,
  };


  const SignUp = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_SIGN_UP:
	      return Object.assign({}, state, {
					isFetching: true,
					user: null,
	      })
			case RECEIVE_SIGN_UP:
				
	    return Object.assign({}, state, {
	        isFetching: false,
            user: action.user,
			user_id: action.user_id,
		})
	    default:
	      return state
  }
}
  export default SignUp;
