import fetch from 'cross-fetch'
import {
    REQUEST_SIGN_UP,
    RECEIVE_SIGN_UP,

} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { SIGNUP_REQUEST } from '../config/serveraction'
import { NavigationActions } from 'react-navigation';

function requestForSignup(data) {
    return {
        type: REQUEST_SIGN_UP,
        payload: { data },
    }
}

function receiveSignup(data, jsonresp) {
    return {
        type: RECEIVE_SIGN_UP,
        payload: { data },
        user: { jsonresp }
    }
}


function signup(data) {
    return dispatch => {
        dispatch(requestForSignup(data))
        return fetch(WEBSERVICE_URL + SIGNUP_REQUEST, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((responseJson) => {
                dispatch(receiveSignup(data, responseJson))
        })
        .catch((error) => {
           // console.error(error);
        });
    }
}
function shouldSignUp(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function fetchSignupIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.


    return (dispatch, getState) => {
        if (shouldSignUp(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(signup(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
export { fetchSignupIfNeeded }
