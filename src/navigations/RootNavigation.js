import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';
import {GlobalContext} from '../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import {navigationRef} from './mainNavigation';

export default function RootNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);
  const [authLoaded, setAuthLoaded] = useState(isLoggedIn);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('ERROR in getting user', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {authLoaded ? (
        <NavigationContainer ref={navigationRef}>
          {isAuthenticated ? <DrawerNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}
