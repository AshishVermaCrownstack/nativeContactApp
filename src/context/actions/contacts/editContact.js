import {
  EDIT_CONTACT_FAIL,
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default (form, id) => dispatch => onSuccess => {
  console.log('INSIDE EDITCONTACT');
  console.log('FORM.', form);

  const requestPayload = {
    country_code: form.country_code || '',
    first_name: form.first_name || '',
    last_name: form.last_name || '',
    phone_number: form.phone_number || '',
    contact_picture: form.contact_picture || null,
    is_favorite: form.is_favorite || false,
  };

  dispatch({type: EDIT_CONTACT_LOADING});
  axiosInstance
    .put(`/contacts/${id}`, requestPayload)
    .then(res => {
      console.log(
        '======================= RES ======================',
        res.data,
      );
      dispatch({
        type: EDIT_CONTACT_SUCCESS,
        payload: res.data,
      });
      onSuccess(res.data);
    })
    .catch(err => {
      console.log('======================= ERR ======================', err);
      dispatch({
        type: EDIT_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong'},
      });
    });
};
