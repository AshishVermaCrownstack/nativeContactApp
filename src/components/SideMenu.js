import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../components/Container';
import globalStyles from '../../Styles/globalStyles';
import {SETTINGS} from '../constants/routeNames';
import logoutUser from '../context/actions/auth/logoutUser';
import Icon from './Icon';

export default function SideMenu({navigation, authDispatch}) {
  const handleLogout = () => {
    navigation.toggleDrawer();
    return Alert.alert('LOGOUT!', 'Are you sure you want to logout?', [
      {text: 'cancel', onPress: () => {}},
      {text: 'ok', onPress: () => logoutUser()(authDispatch)},
    ]);
  };
  const menuItems = [
    {
      icon: <Icon type="MaterialIcon" name="settings" size={20} />,
      label: 'Settings',
      onPress: () => navigation.navigate(SETTINGS),
    },
    {
      icon: <Icon type="MaterialIcon" name="logout" size={20} />,
      label: 'Logout',
      onPress: handleLogout,
    },
  ];

  return (
    <SafeAreaView>
      <Container>
        <Image
          height={70}
          width={70}
          source={require('../assets/images/logo.png')}
          style={globalStyles.logoImg}
        />
        <View style={{paddingLeft: 60}}>
          {menuItems.map(({icon, label, onPress}) => (
            <TouchableOpacity onPress={onPress} key={label} style={styles.item}>
              {icon}
              <Text style={styles.itemText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 17,
    paddingVertical: 7,
    paddingLeft: 20,
  },
});
