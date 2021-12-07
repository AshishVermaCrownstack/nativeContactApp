import {
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default form => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.calling_code || '',
    first_name: form.first_name || '',
    last_name: form.last_name || '',
    phone_number: form.phone_number || '',
    contact_picture: form.contact_picture || null,
    is_favorite: form.is_favorite || false,
  };

  dispatch({type: CREATE_CONTACT_LOADING});
  axiosInstance
    .post('/contacts/', requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => {
      console.log('+++++++++++ ERR ++++++++++++++', err);
      dispatch({
        type: CREATE_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong'},
      });
    });
};
