import React from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from './Input';
import Container from './Container';
import CustomButton from './CustomButton';
import CountryPicker from 'react-native-country-picker-modal';
import DEFAULT_IMAGE_URI from '../constants/general';
import colors from '../assets/theme/colors';
import ImagePicker from './ImagePicker';

export default function CreateContactComponent({
  form,
  onChange,
  onSubmit,
  setForm,
  loading,
  error,
  sheetRef,
  closeSheet,
  openSheet,
  onFileSelected,
  imageFile,
}) {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Container>
        <Image
          width={150}
          height={150}
          source={
            {
              uri: imageFile?.path || imageFile || DEFAULT_IMAGE_URI,
            } // || require('../assets/images/contactDefaultImg.png')
          }
          style={styles.imageView}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseImage}>Choose Image</Text>
        </TouchableOpacity>
        <Input
          value={form.first_name || ''}
          label="First Name"
          placeholder="Enter First name"
          onChangeText={val => onChange('first_name', val)}
          error={error?.first_name?.[0]}
        />
        <Input
          value={form.last_name || ''}
          label="Last Name"
          placeholder="Enter Last name"
          onChangeText={val => onChange('last_name', val)}
          error={error?.last_name?.[0]}
        />
        <Input
          icon={
            <CountryPicker
              withFilters
              withFlag
              countryCode={form.country_code || undefined}
              withCountryNameButton={false}
              withCallingCode
              withCallingCodeButton
              withEmoji
              onSelect={val => {
                const callingCode = val.callingCode[0];
                const cca = val.cca2;
                setForm({
                  ...form,
                  calling_code: callingCode,
                  country_code: cca,
                });
              }}
            />
          }
          iconPosition="left"
          style={{paddingLeft: 5}}
          label="Phone Number"
          error={error?.phone_number?.[0] || error?.country_code?.[0]}
          placeholder="Phone Number"
          onChangeText={val => onChange('phone_number', val)}
          value={form.phone_number || ''}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 17}}>Add to favourite</Text>
          <Switch
            trackColor={{false: 'blue', true: colors.primary}}
            thumbColor="#ffffff"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setForm({...form, is_favorite: !form.is_favorite});
            }}
            value={form.is_favorite || false}
          />
        </View>
        <CustomButton
          loading={loading}
          primary
          title="Submit"
          onPress={onSubmit}
          disabled={loading}
        />
      </Container>
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
  chooseImage: {
    color: colors.primary,
    alignSelf: 'center',
  },
});
