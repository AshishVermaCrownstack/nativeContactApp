import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../../Styles/globalStyles';
import colors from '../assets/theme/colors';
import {CONTACT_DETAIL, CREATE_CONTACT} from '../constants/routeNames';
import {ContactModelContext} from '../screens/Contacts/contacts';
import AppModal from './AppModal';
import Container from './Container';
import CustomButton from './CustomButton';
import Icon from './Icon';
import Message from './Message';

export default function ContactComponent({
  data,
  loading,
  modalVisible,
  setModalVisible,
  sortBy,
}) {
  const ListEmptyComponent = () => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Message info message="No contacts to show" />
      </TouchableOpacity>
    );
  };

  const {navigate} = useNavigation();

  const renderItem = ({item}) => {
    const {contact_picture, first_name, last_name, phone_number, country_code} =
      item;

    return (
      <TouchableOpacity
        onPress={() => {
          navigate(CONTACT_DETAIL, {item});
        }}>
        <View style={styles.itemContainer}>
          {contact_picture ? (
            <Image
              source={{uri: contact_picture}}
              style={{width: 45, height: 45, borderRadius: 100}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: colors.grey,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Text style={{...styles.name, color: colors.white}}>
                {first_name[0]}
              </Text>
              <Text style={{...styles.name, color: colors.white}}>
                {last_name[0]}
              </Text>
            </View>
          )}

          <View style={{marginLeft: 20}}>
            <Text style={styles.name}>
              {first_name} {last_name}
            </Text>
            <Text style={styles.phoneNumber}>
              {country_code} {phone_number}
            </Text>
          </View>
          <Icon
            style={{marginLeft: 'auto'}}
            type="AntDesign"
            name="right"
            size={18}
            color={colors.grey}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Profile!"
        bodyContent={<Text>Hello</Text>}
        // footerContent={<></>}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={
              sortBy
                ? data.sort((a, b) => {
                    if (sortBy === 'First name') {
                      if (b.first_name > a.first_name) {
                        return -1;
                      } else {
                        return 1;
                      }
                    }
                    if (sortBy === 'Last name') {
                      if (b.last_name > a.last_name) {
                        return -1;
                      } else {
                        return 1;
                      }
                    }
                  })
                : data
            }
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={item => String(item.id)}
            ItemSeparatorComponent={() => {
              return (
                <View style={{height: 0.5, backgroundColor: colors.grey}} />
              );
            }}
            renderItem={renderItem}
            ListFooterComponent={<View style={{height: 150}} />}
          />
          <TouchableOpacity
            style={styles.floatingActionButton}
            onPress={() => navigate(CREATE_CONTACT)}>
            <Icon name="plus" color={colors.white} size={21} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
  },
  phoneNumber: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 5,
  },
  floatingActionButton: {
    width: 55,
    height: 55,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    bottom: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
