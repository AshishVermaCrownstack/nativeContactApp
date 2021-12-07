import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {
  CONTACT_DETAIL,
  CONTACT_LIST,
  CREATE_CONTACT,
  LOGOUT,
  SETTINGS,
} from '../constants/routeNames';
import Contacts from '../screens/Contacts/contacts';
import ContactDetail from '../screens/ContactDetail/contactDetail';
import CreateContact from '../screens/CreateContact/createContacts';
import Settings from '../screens/Settings/settings';
import Logout from '../screens/Logout/logout';

const HomeStack = createNativeStackNavigator();
export default function HomeNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={CONTACT_LIST} component={Contacts} />
      <HomeStack.Screen name={CONTACT_DETAIL} component={ContactDetail} />
      <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact} />
      <HomeStack.Screen name={SETTINGS} component={Settings} />
      <HomeStack.Screen name={LOGOUT} component={Logout} />
    </HomeStack.Navigator>
  );
}
