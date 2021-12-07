import {
  GET_CONTACT_FAIL,
  GET_CONTACT_LOADING,
  GET_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({type: GET_CONTACT_LOADING});
  axiosInstance
    .get('/contacts/')
    .then(res => {
      dispatch({type: GET_CONTACT_SUCCESS, payload: res.data});
    })
    .catch(err => {
      dispatch({
        type: GET_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong'},
      });
    });
};
