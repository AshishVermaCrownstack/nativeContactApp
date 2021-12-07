import {useNavigation} from '@react-navigation/core';
import React, {useRef, useState} from 'react';

import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../assets/theme/colors';
import {CREATE_CONTACT} from '../constants/routeNames';
import CustomButton from './CustomButton';
import Icon from './Icon';
import DEFAULT_IMAGE_URI from '../constants/general';
import ImagePicker from './ImagePicker';
export default function ContactDetailsComponent({
  item,
  sheetRef,
  openSheet,
  closeSheet,
  onFileSelected,
  imageUrl,
  isUploading,
  uploadSucced,
}) {
  const {
    first_name,
    last_name,
    phone_number,
    contact_picture,
    country_code,
    is_favorite,
  } = item;

  const [imgloading, setImgLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {navigate} = useNavigation();

  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      <View style={styles.container}>
        {imgloading && <Text style={styles.loadingText}>Loading img...</Text>}
        {(contact_picture || uploadSucced) && (
          <Image
            onLoadStart={() => {
              setImgLoading(true);
            }}
            onLoadEnd={() => {
              setImgLoading(false);
            }}
            onError={() => {
              setImgLoading(false);
              setHasError(true);
            }}
            style={styles.detailImg}
            source={{uri: contact_picture}}
          />
        )}
        {!contact_picture && !uploadSucced && (
          <View style={{alignItems: 'center', padding: 20}}>
            <Image
              style={styles.defaultImg}
              source={
                imageUrl
                  ? {uri: imageUrl?.path}
                  : require('../assets/images/contactDefaultImg.png')
              }
            />
            <TouchableOpacity onPress={openSheet}>
              <Text style={{color: colors.primary}}>
                {isUploading ? 'updating...' : 'Add Image'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.names}>{first_name + ' ' + last_name}</Text>
        </View>
        <View style={styles.hrLine} />
        <View style={styles.topCallOptions}>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="Ionicons"
              name="call-outline"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="MaterialCommunityIcons"
              name="message-text"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="MaterialCommunityIcons"
              name="video"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middleCallOptions}>
          <Icon
            type="Ionicons"
            name="call-outline"
            color={colors.grey}
            size={27}
          />
          <View style={styles.phoneMobile}>
            <Text>{phone_number}</Text>
            <Text>Mobile</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type="MaterialCommunityIcons"
              name="video"
              color={colors.primary}
              size={27}
            />
            <Icon
              type="MaterialCommunityIcons"
              name="message-text"
              color={colors.primary}
              size={27}
              style={{marginLeft: 10}}
            />
          </View>
        </View>
        <CustomButton
          style={{width: 200, alignSelf: 'flex-end', marginRight: 20}}
          primary
          title="Edit Contact"
          onPress={() => {
            navigate(CREATE_CONTACT, {item});
          }}
        />
      </View>

      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  detailImg: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },

  defaultImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  loadingText: {
    textAlign: 'center',
    padding: 50,
  },

  names: {fontSize: 23},

  content: {padding: 20},

  hrLine: {
    height: 1,
    backgroundColor: colors.grey,
  },

  topCallOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  topCallOption: {
    alignItems: 'center',
  },

  middleText: {
    fontSize: 14,
    color: colors.primary,
    paddingVertical: 5,
  },

  middleCallOptions: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  phoneMobile: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
