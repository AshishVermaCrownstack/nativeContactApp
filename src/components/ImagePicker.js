import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../assets/theme/colors';
import Icon from './Icon';
import ImagePickerCroper from 'react-native-image-crop-picker';

const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      text: 'Take from Camera',
      icon: <Icon name="camera" size={21} color={colors.grey} />,
      onPress: () => {
        ImagePickerCroper.openCamera({
          height: 300,
          width: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(img => {
            onFileSelected(img);
          })
          .catch(err => {});
      },
    },
    {
      text: 'Choose from Gallery',
      icon: <Icon name="image" size={21} color={colors.grey} />,
      onPress: () => {
        ImagePickerCroper.openPicker({
          height: 300,
          width: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(img => {
            onFileSelected(img);
          })
          .catch(err => {});
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={200}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({text, icon, onPress}) => (
          <TouchableOpacity
            key={text}
            style={styles.optionsItem}
            onPress={onPress}>
            {icon}
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default ImagePicker;

const styles = StyleSheet.create({
  optionsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  optionsWrapper: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 17,
    paddingLeft: 17,
  },
});
