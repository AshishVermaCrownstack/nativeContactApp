import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {LOGIN, REGISTER} from '../constants/routeNames';
import Login from '../screens/Login/login';
import Register from '../screens/Register/register';

const AuthStack = createNativeStackNavigator();
export default function AuthNavigation() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
}
