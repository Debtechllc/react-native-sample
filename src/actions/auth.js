import {
  AUTH_SUCCESS,
  AUTH_FAIL,
} from './types.js';
import { AsyncStorage } from "react-native"

// Get logedin user details
function getUser() {
  AsyncStorage.getItem('User', (err, result) => {
    // console.log(result);
  });
}

export { getUser }