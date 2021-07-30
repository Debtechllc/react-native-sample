import fetch from 'cross-fetch'
import {
	REQUEST_ABOUT_US,
	RECEIVE_ABOUT_US,
} from './types';
import { WEBSERVICE_URL } from './../config/config'
import { CMS_LIST } from './../config/serveraction'
function requestAboutUs(data) {
	return {
		type: REQUEST_ABOUT_US,
		payload: { data },
	}
}
function receiveAboutUs(data, jsonresp) {
	return {
		type: RECEIVE_ABOUT_US,
		payload: { data },
		about_us_content: { jsonresp }
	}
}
function fetchAboutUs(data) {
	return dispatch => {
		dispatch(requestAboutUs(data))
		return fetch(WEBSERVICE_URL + CMS_LIST, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ "checking": "true" }),
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.error == 0) {
					dispatch(receiveAboutUs(data, responseJson))
				}
			})
			.catch((error) => {
				//	console.error(error);
			});
	}
}
function shouldFetchAboutUs(state, subreddit) {
	if (state.isFetching) {
		return false
	} else {
		return true
	}
}

function fetchAboutUsIfNeeded(data) {
	// Note that the function also receives getState()
	// which lets you choose what to dispatch next.

	// This is useful for avoiding a network request if
	// a cached value is already available.

	return (dispatch, getState) => {
		if (shouldFetchAboutUs(getState(), data)) {
			// Dispatch a thunk from thunk!
			return dispatch(fetchAboutUs(data))
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
		}
	}
}
export { fetchAboutUsIfNeeded }
