import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {GlobalContext} from '../../context/GlobalProvider';
import logoutUser from '../../context/actions/auth/logoutUser';

export default function Logout() {
  const {authDispatch} = useContext(GlobalContext);

  useEffect(() => {
    logoutUser()(authDispatch);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
