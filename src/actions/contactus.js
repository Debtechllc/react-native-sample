import fetch from 'cross-fetch'
import {
	REQUEST_CONTACT_US,
	RECEIVE_CONTACT_US,
  } from './types';
	import { WEBSERVICE_URL} from './../config/config'
	import { CONTACT_US} from './../config/serveraction'
	function requestContactUs(data) {
	  return {
	    type: REQUEST_CONTACT_US,
	    payload: {data},
	  }
	}
	function receiveContactUs(data,jsonresp) {
	  return {
	    type: RECEIVE_CONTACT_US,
	    payload: {data},
			contact_us_content: {jsonresp}
	  }
	}
	function fetchContactUs(data) {
	//	console.log('data'+data)
	  return dispatch => {
	    dispatch(requestContactUs(data))
	    return fetch(WEBSERVICE_URL + CONTACT_US, {
				method: 'POST',
				headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "email": data.email,"message": data.message,"checking": "true" }),
		})
		.then((response) => response.json())
		.then((responseJson) => {
				 if (responseJson.error == 0) {
						dispatch(receiveContactUs(data, responseJson))
				 }
		})
		.catch((error) => {
				//console.error(error);
		});
	  }
	}
	function shouldFetchContactUs(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchContactUsIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchContactUs(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchContactUs(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchContactUsIfNeeded}
