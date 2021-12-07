import {useNavigation} from '@react-navigation/core';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import ContactComponent from '../../components/ContactComponent';
import Container from '../../components/Container';
import Icon from '../../components/Icon';
import getContacts from '../../context/actions/contacts/getContacts';
import {GlobalContext} from '../../context/GlobalProvider';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../navigations/mainNavigation';
import {CONTACT_DETAIL} from '../../constants/routeNames';

const Contacts = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const contactRef = useRef([]);

  const {
    contactDispatch,
    contactState: {
      getContact: {data, loading},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getContacts()(contactDispatch);
  }, []);

  const getSortBy = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSortBy();

      return () => {};
    }, []),
  );

  useEffect(() => {
    const prevList = contactRef.current;

    contactRef.current = data;

    const newList = contactRef.current;

    if (newList.length - prevList.length === 1) {
      const newContact = newList.find(item => {
        return !prevList.map(i => i.id).includes(item.id);
      });

      navigate(CONTACT_DETAIL, {item: newContact});
    }
  }, [data.length]);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <Icon
            type="MaterialIcon"
            name="menu"
            size={24}
            style={{paddingRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ContactComponent
      data={data}
      loading={loading}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      sortBy={sortBy}
    />
  );
};

export default Contacts;
