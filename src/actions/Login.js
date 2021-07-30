import fetch from 'cross-fetch'
import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    RECEIVE_ERROR_LOGIN,
    REQUEST_LOGOUT,
    REQUEST_ASSIGN_STORAGE_USER,
    REQUEST_USER,
	RECEIVE_USER,
    UPDATE_USER

} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { LOGIN_REQUEST, USER } from '../config/serveraction'
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from "react-native"

function requestForLogin(data) {
    return {
        type: REQUEST_LOGIN,
        payload: { data },
    }
}

function receiveLogin(data, jsonresp) {
    return {
        type: RECEIVE_LOGIN,
        payload: { data },
        user:  jsonresp 
    }
}
function receiveErrorLogin(data, jsonresp) {
    return {
        type: RECEIVE_ERROR_LOGIN,
        json:  jsonresp 
    }
}
function assign_storage_user(data) {
    return {
        type: REQUEST_ASSIGN_STORAGE_USER,
        user: data ,
    }
}
function logout() {
    return {
        type: REQUEST_LOGOUT,
    }
}

function login(data) {

    return dispatch => {
        dispatch(requestForLogin(data))
        return fetch(WEBSERVICE_URL + LOGIN_REQUEST, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
              //  console.log("JSON RESPONSE-")
              //  console.log(responseJson)
                if (responseJson.error == 0) {
                    dispatch(receiveLogin(data, responseJson.data))
                } else {
                    dispatch(receiveErrorLogin(data, responseJson.message))
                }
            })
            .catch((error) => {
              //  console.error(error);
            });
    }
}
function shouldLogin(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function fetchLoginIfNeeded(data) {
   
    return (dispatch, getState) => {
        if (shouldLogin(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(login(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

///////////////



function requestUser(data) {
    return {
      type: REQUEST_USER,
      payload: {data},
    }
  }

 
 
  function fetchUser(data) {
    return dispatch => {
          dispatch(requestUser(data))
          return fetch(WEBSERVICE_URL+USER+'?user_id='+data.user_id, {
              method: 'GET',
              headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
              }
              })
              .then(response => response.json())
              .then((responseJson) => {
               // console.log('responseJson')
              //  console.log(responseJson)
                  if (responseJson.error == 0) {
                    dispatch(assign_storage_user(responseJson.data))
                    //dispatch(receiveUser(responseJson.data))
                  }
              })
    }
  }

  function shouldFetchUser(state, subreddit) {
    if (state.isFetching) {
      return false
    } else {
      return true
    }
  }

  function fetchUserDataIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
      if (shouldFetchUser(getState(), data)) {
        // Dispatch a thunk from thunk!
        return dispatch(fetchUser(data))
      } else {
        // Let the calling code know there's nothing to wait for.
        return Promise.resolve()
      }
    }
}

///////////// Update user

function requestUpdateUser(data) {
    return {
      type: UPDATE_USER,
      payload: {data},
    }
  }

  function receiveUser(data,jsonresp) {
  //  console.log('jsonresp')
  //  console.log(jsonresp)
    return {
      type: RECEIVE_USER,
      payload: {data},
      user: jsonresp
    }
  }


  function updateUser(data) {
    return dispatch => {
        dispatch(requestUpdateUser(data))
        return fetch(WEBSERVICE_URL + USER, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => dispatch(receiveUser(data, json)))
    }
  }

  function shouldUpdateUser(state, subreddit) {
    if (state.isFetching) {
      return false
    } else {
      return true
    }
  }

   function updateUserIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
      if (shouldUpdateUser(getState(), data)) {
        // Dispatch a thunk from thunk!
        return dispatch(updateUser(data))
      } else {
        // Let the calling code know there's nothing to wait for.
        return Promise.resolve()
      }
    }
  }

  ///// Add user

export { fetchLoginIfNeeded, assign_storage_user, logout, updateUserIfNeeded, fetchUserDataIfNeeded }
