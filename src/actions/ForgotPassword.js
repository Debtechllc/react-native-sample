import fetch from 'cross-fetch'
import {
    REQUEST_FORGOT_PASS,
    RECEIVE_FORGOT_PASS,
    REQUEST_CHANGE_PASSWORD,
    RECEIVE_CHANGE_PASSWORD,
    REQUEST_CHANGE_PASSWORD_CLEAR,


} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { FORGOTPASSWORD, CHANGE_PASSWORD, VERIFY_OTP, RESET_PASSWORD } from '../config/serveraction'

// Forgot password API call

function forgotPassword(data) {
    return dispatch => {
        dispatch(requestForFeedback(data))
        return fetch(WEBSERVICE_URL + FORGOTPASSWORD, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(receiveFeedback(data, responseJson))
            })
            .catch((error) => {
                //  console.error(error);
            });
    }
}

// checking if any webservice fetching or not
function shouldCallForgotPassword(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

// call if needed
function forgotPasswordIfNeeded(data) {

    return (dispatch, getState) => {
        if (shouldCallForgotPassword(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(forgotPassword(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

//// change password

function requestForChangePassword(data) {
    return {
        type: REQUEST_CHANGE_PASSWORD,
        payload: { data },
    }
}

// change password reducer event calling
function receiveChangePassword(data, jsonresp) {
    return {
        type: RECEIVE_CHANGE_PASSWORD,
        payload: { data },
        data: { jsonresp }
    }
}

// changePassword API call
function changePassword(data) {
    return dispatch => {
        dispatch(requestForChangePassword(data))
        return fetch(WEBSERVICE_URL + CHANGE_PASSWORD, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(receiveChangePassword(data, responseJson))
            })
            .catch((error) => {
                // console.error(error);
            });
    }
}

// checking if any webservice fetching or not
function shouldChangePassword(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function changePasswordIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.


    return (dispatch, getState) => {
        if (shouldChangePassword(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(changePassword(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
function clearData() {
    return {
        type: REQUEST_CHANGE_PASSWORD_CLEAR,
        payload: {},
    }
}

// verifyOtpIfNeeded


function verifyOtp(data) {
    return dispatch => {
        dispatch(requestForChangePassword(data))
        return fetch(WEBSERVICE_URL + VERIFY_OTP, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(receiveChangePassword(data, responseJson))
            })
            .catch((error) => {
                //  console.error(error);
            });
    }
}

function verifyOtpIfNeeded(data) {

    return (dispatch, getState) => {
        if (shouldChangePassword(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(verifyOtp(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

/// resetPasswordIfNeeded


function resetPassword(data) {
    return dispatch => {
        dispatch(requestForChangePassword(data))
        return fetch(WEBSERVICE_URL + RESET_PASSWORD, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(receiveChangePassword(data, responseJson))
            })
            .catch((error) => {
                // console.error(error);
            });
    }
}

function resetPasswordIfNeeded(data) {

    return (dispatch, getState) => {
        if (shouldChangePassword(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(resetPassword(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

export { forgotPasswordIfNeeded, changePasswordIfNeeded, clearData, verifyOtpIfNeeded, resetPasswordIfNeeded }
