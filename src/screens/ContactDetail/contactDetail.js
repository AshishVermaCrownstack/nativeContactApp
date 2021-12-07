import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/theme/colors';
import ContactDetailsComponent from '../../components/ContactDetailsComponent';
import Icon from '../../components/Icon';
import {CONTACT_LIST} from '../../constants/routeNames';
import deleteContact from '../../context/actions/contacts/deleteContact';
import editContact from '../../context/actions/contacts/editContact';
import {GlobalContext} from '../../context/GlobalProvider';
import uploadImage from '../../helpers/uploadImage';

const ContactDetail = () => {
  const {
    params: {item = {}},
  } = useRoute();

  console.log('ITEM.', item);

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSucced, setUploadSucced] = useState(false);

  const {navigate, setOptions} = useNavigation();

  const {
    contactDispatch,
    contactState: {
      deleteContact: {loading},
    },
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const onFileSelected = img => {
    closeSheet();
    setImageUrl(img);

    updateImag();
  };

  const updateImag = () => {
    setIsUploading(true);
    uploadImage(imageUrl)(url => {
      const {first_name, last_name, phone_number, country_code, is_favorite} =
        item;

      console.log('URL', url);

      editContact(
        {
          first_name,
          last_name,
          phone_number,
          country_code,
          is_favorite,
          contact_picture: url,
        },
        item.id,
      )(contactDispatch)(item => {
        setIsUploading(false);
        setUploadSucced(true);
      });
    })(err => {
      console.log('Error in contactDetail image uploading.', err);
      setIsUploading(false);
    });
  };

  useEffect(() => {
    setOptions({
      title: item.first_name + ' ' + item.last_name,
      headerRight: () => {
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Icon
                name={item.is_favorite ? 'star' : 'star-border'}
                type="MaterialIcon"
                size={21}
                color={colors.grey}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Delete Contact!',
                  'Do you want to delete this contact',
                  [
                    {text: 'Cancel', onPress: () => {}},
                    {
                      text: 'Ok',
                      onPress: () => {
                        deleteContact(item.id)(contactDispatch)(() => {
                          navigate(CONTACT_LIST);
                        });
                      },
                    },
                  ],
                );
              }}
              style={{paddingLeft: 10}}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Icon
                  name="delete"
                  type="MaterialIcon"
                  size={21}
                  color={colors.grey}
                />
              )}
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [item, loading]);

  return (
    <ContactDetailsComponent
      item={item}
      sheetRef={sheetRef}
      openSheet={openSheet}
      closeSheet={closeSheet}
      onFileSelected={onFileSelected}
      imageUrl={imageUrl}
      isUploading={isUploading}
      uploadSucced={uploadSucced}
    />
  );
};

export default ContactDetail;
