import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SettingComponent from '../../components/SettingComponent';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [email, setEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const settingSortBy = (key, value) => {
    AsyncStorage.setItem(key, value);
  };

  const settingsOption = [
    {title: 'My Info', subtitle: 'Setup your profile', onPress: () => {}},
    {title: 'Accounts', onPress: () => {}},
    {
      title: 'Default account for new contacts',
      subtitle: email,
      onPress: () => {},
    },
    {
      title: 'Contacts to display',
      subtitle: 'All contacts',
      onPress: () => {},
    },
    {
      title: 'Sort by',
      subtitle: sortBy,
      onPress: () => {
        setModalVisible(true);
      },
    },
    {title: 'Name format', subtitle: 'First name first', onPress: () => {}},
    {title: 'Import', onPress: () => {}},
    {title: 'Export', onPress: () => {}},
    {title: 'Blocked numbers', onPress: () => {}},
    {title: 'About RNContacts', onPress: () => {}},
  ];

  const prefOptions = [
    {
      name: 'First Name',
      selected: sortBy === 'First name',
      onPress: () => {
        settingSortBy('sortBy', 'First name');
        setSortBy('First name');
        setModalVisible(false);
      },
    },
    {
      name: 'Last Name',
      selected: sortBy === 'Last name',
      onPress: () => {
        settingSortBy('sortBy', 'Last name');
        setSortBy('Last name');
        setModalVisible(false);
      },
    },
  ];

  const getSettings = async () => {
    const user = await AsyncStorage.getItem('user');
    setEmail(JSON.parse(user).email);

    const sortPref = await AsyncStorage.getItem('sortBy');
    setSortBy(sortPref);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingComponent
      settingsOption={settingsOption}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      prefOptions={prefOptions}
    />
  );
};

export default Settings;
