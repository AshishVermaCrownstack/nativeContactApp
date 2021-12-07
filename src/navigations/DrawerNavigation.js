import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeNavigation from './HomeNavigation';
import {HOME_NAVIGATION} from '../constants/routeNames';
import colors from '../assets/theme/colors';

import SideMenu from '../components/SideMenu';
import {GlobalContext} from '../context/GlobalProvider';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const {authDispatch} = useContext(GlobalContext);
  return (
    <Drawer.Navigator
      drawerContent={({navigation}) => (
        <SideMenu navigation={navigation} authDispatch={authDispatch} />
      )}
      screenOptions={{
        drawerType: 'front',
        drawerItemStyle: {backgroundColor: colors.primary},
        drawerLabelStyle: {color: '#fff'},
        headerShown: false,
      }}>
      <Drawer.Screen name={HOME_NAVIGATION} component={HomeNavigation} />
    </Drawer.Navigator>
  );
}
