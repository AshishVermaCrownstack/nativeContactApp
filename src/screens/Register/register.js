import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import RegisterComponent from '../../components/RegisterComponent';
import {LOGIN} from '../../constants/routeNames';
import registerUser, {
  clearAuthState,
} from '../../context/actions/auth/registerUser';
import {GlobalContext} from '../../context/GlobalProvider';

const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data || error]),
  );

  // useEffect(() => {
  //   if (data) {
  //     navigate(LOGIN);
  //   }
  // }, [data]);

  const onChange = (name, value) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name == 'password') {
        if (value.length < 7) {
          setErrors(prev => {
            return {...prev, [name]: 'Password must be 6 character long'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required'};
      });
    }
  };
  const onSubmit = () => {
    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: 'Please add username'};
      });
    }
    if (!form.first_name) {
      setErrors(prev => {
        return {...prev, first_name: 'Please add firstname'};
      });
    }
    if (!form.last_name) {
      setErrors(prev => {
        return {...prev, last_name: 'Please add lastName'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'Please add email'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please add password'};
      });
    }
    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => {
        return item.trim().length > 0;
      }) &&
      Object.values(errors).every(item => !item)
    ) {
      registerUser(form)(authDispatch)(resData => {
        navigate(LOGIN, {data: resData});
      });
    }
  };
  return (
    <RegisterComponent
      form={form}
      errors={errors}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      err={error}
    />
  );
};

export default Register;
