import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import LoginComponent from '../../components/LoginComponent';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/GlobalProvider';

const Login = () => {
  const [form, setForm] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);
  const {params} = useRoute();

  useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      setForm({...form, username: params.data.username});
    }
  }, [params]);

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  const onChange = (name, value) => {
    setJustSignedUp(false);
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    if (form.username && form.password) {
      loginUser(form)(authDispatch);
    }
  };
  return (
    <LoginComponent
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      err={error}
      loading={loading}
      justSignedUp={justSignedUp}
    />
  );
};

export default Login;
