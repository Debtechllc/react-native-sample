import { combineReducers } from 'redux';

import Auth from './auth';
import Language from './language';
import Navigator from './navigation';
import Home from './Home';
import Login_Reducer from './Login_Reducer';
import SignUp from './SignUp';
import ForgotPassword_Reducer from './ForgotPassword_Reducer';


export default combineReducers({
	Auth,
	Language,
	Navigator,
	Home,
	Login_Reducer,
	SignUp,
	ForgotPassword_Reducer
});
