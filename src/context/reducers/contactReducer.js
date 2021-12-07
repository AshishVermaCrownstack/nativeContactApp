import {
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
  EDIT_CONTACT_FAIL,
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_SUCCESS,
  GET_CONTACT_FAIL,
  GET_CONTACT_LOADING,
  GET_CONTACT_SUCCESS,
} from '../../constants/actionTypes';

const contactReducer = (initialState, {type, payload}) => {
  switch (type) {
    case EDIT_CONTACT_LOADING:
      return {
        ...initialState,
        createContact: {
          ...initialState.createContact,
          loading: true,
          error: null,
        },
      };

    case EDIT_CONTACT_SUCCESS:
      return {
        ...initialState,
        createContact: {
          ...initialState.createContact,
          loading: false,
          data: payload,
          error: null,
        },

        getContact: {
          ...initialState.getContact,
          loading: false,
          data: initialState.getContact.data.map(item => {
            if (item.id === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };

    case EDIT_CONTACT_FAIL:
      return {
        ...initialState,
        createContact: {
          ...initialState.createContact,
          loading: false,
          error: payload,
        },
      };

    case DELETE_CONTACT_LOADING:
      return {
        ...initialState,
        deleteContact: {
          ...initialState.deleteContact,
          loading: true,
          error: null,
        },
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...initialState,
        deleteContact: {
          ...initialState.deleteContact,
          loading: false,
          data: payload,
          error: null,
        },

        getContact: {
          ...initialState.getContact,
          loading: false,
          data: initialState.getContact.data.filter(
            item => item.id !== payload,
          ),
          error: null,
        },
      };

    case DELETE_CONTACT_FAIL:
      return {
        ...initialState,
        deleteContact: {
          ...initialState.deleteContact,
          loading: false,
          error: payload,
        },
      };

    case CREATE_CONTACT_LOADING:
      return {
        ...initialState,
        createContact: {
          ...initialState.createContact,
          loading: true,
          error: null,
        },
      };

    case CREATE_CONTACT_SUCCESS:
      return {
        ...initialState,
        createContact: {
          ...initialState.createContact,
          loading: false,
          data: payload,
          error: null,
        },
        getContact: {
          ...initialState,
          loading: false,
          data: [payload, ...initialState.getContact.data],
          error: null,
        },
      };

    case CREATE_CONTACT_FAIL:
      return {
        ...initialState,
        createContact: {
          ...initialState.createContact,
          loading: false,
          error: payload,
        },
      };

    case GET_CONTACT_LOADING:
      return {
        ...initialState,
        getContact: {
          ...initialState.getContact,
          loading: true,
          error: null,
        },
      };

    case GET_CONTACT_SUCCESS:
      return {
        ...initialState,
        getContact: {
          ...initialState.getContact,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_CONTACT_FAIL:
      return {
        ...initialState,
        getContact: {
          ...initialState.getContact,
          loading: false,
          error: payload,
        },
      };

    default:
      return initialState;
  }
};

export default contactReducer;
