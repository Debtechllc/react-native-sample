
  import {
	HOME_REQUEST_FEEDBACK,
	HOME_RECEIVE_FEEDBACK,
	RECEIVE_ERROR_HOME
  } from '../actions/types';

  const INITIAL_STATE = {
	user: {},
	isSaving: false,
	isFetching: false
  };


  const Home = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case HOME_REQUEST_FEEDBACK:
	      return Object.assign({}, state, {
	        isSaving: true,
	      })
	    case HOME_RECEIVE_FEEDBACK:
	      return Object.assign({}, state, {
	        isSaving: false,
	        user: action.data,
	      })
		case RECEIVE_ERROR_HOME:
			return Object.assign({}, state, {
				isSaving: false,
				error: 1,
				message: action.json
			})
		
	    default:
	      return state
  }
}
  export default Home;
