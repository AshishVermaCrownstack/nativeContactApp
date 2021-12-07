import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../../Styles/globalStyles';
import colors from '../assets/theme/colors';

export default function CustomButton({
  title,
  primary,
  secondary,
  danger,
  disabled,
  onPress,
  loading,
  style,
}) {
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (primary) {
      return colors.primary;
    }
    if (secondary) {
      return colors.secondary;
    }
    if (danger) {
      return colors.danger;
    }
  };
  return (
    <TouchableOpacity
      style={{
        ...globalStyles.customButton,
        backgroundColor: getBgColor(),
        ...style,
      }}
      onPress={onPress}
      props>
      <View style={globalStyles.loaderSection}>
        {loading && <ActivityIndicator color={colors.white} />}
        {title && (
          <Text
            style={{
              textTransform: 'uppercase',
              color: disabled ? 'black' : 'white',
              paddingLeft: loading ? 5 : 0,
            }}>
            {loading ? 'Please wait ...' : title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
