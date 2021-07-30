import fetch from 'cross-fetch'
import {
	HOME_REQUEST_FEEDBACK,
	HOME_RECEIVE_FEEDBACK,
	RECEIVE_ERROR_HOME,
	REQUEST_ASSIGN_STORAGE_USER

} from './types';
import { WEBSERVICE_URL } from './../config/config'
import { FEEDBACK_SAVE_REQUEST } from './../config/serveraction'

function saveFeedbackRequest(data) {
	return {
		type: HOME_REQUEST_FEEDBACK,
		payload: { data },
	}
}

function receiveDataHome(data, jsonresp) {
	return {
		type: HOME_RECEIVE_FEEDBACK,
		payload: { data },
		data: { jsonresp }
	}
}
function receiveErrorHome(data, jsonresp) {
	return {
		type: RECEIVE_ERROR_HOME,
		json: jsonresp
	}
}


function saveFeedback(data) {

	return dispatch => {
		dispatch(saveFeedbackRequest(data))
		return fetch(WEBSERVICE_URL + FEEDBACK_SAVE_REQUEST, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.error == '0') {
					dispatch(assign_storage_user(responseJson.data))
				} else {
					dispatch(receiveErrorHome(data, responseJson.message))
				}
			})
			.catch((error) => {
				//  console.error(error);
			});
	}
}
function assign_storage_user(data) {
	return {
		type: REQUEST_ASSIGN_STORAGE_USER,
		user: data,
	}
}

function shouldSaveFeedbacks(state, subreddit) {
	if (state.isSaving) {
		return false
	} else {
		return true
	}
}

function saveFeedbackDataIfNeeded(data) {
	// Note that the function also receives getState()
	// which lets you choose what to dispatch next.

	// This is useful for avoiding a network request if
	// a cached value is already available.

	return (dispatch, getState) => {
		if (shouldSaveFeedbacks(getState(), data)) {
			// Dispatch a thunk from thunk!
			return dispatch(saveFeedback(data))
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
		}
	}
}



export { saveFeedbackDataIfNeeded }
