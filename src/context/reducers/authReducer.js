import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_AUTH_STATE,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from '../../constants/actionTypes';

const authReducer = (initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_LOADING:
    case REGISTER_LOADING:
      return {...initialState, loading: true};

    case REGISTER_SUCCESS:
      return {...initialState, loading: false, data: payload};

    case LOGIN_SUCCESS:
      return {...initialState, loading: false, data: payload, isLoggedIn: true};

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {...initialState, loading: false, error: payload};

    case LOGOUT_USER:
      return {
        ...initialState,
        loading: false,
        isLoggedIn: false,
        data: null,
      };

    case CLEAR_AUTH_STATE:
      return {...initialState, loading: false, data: null, error: null};

    default:
      return initialState;
  }
};

export default authReducer;
