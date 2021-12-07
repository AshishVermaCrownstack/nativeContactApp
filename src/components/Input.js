import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {color} from 'react-native-reanimated';
import globalStyles from '../../Styles/globalStyles';
import colors from '../assets/theme/colors';

export default function Input({
  label,
  placeholder,
  icon,
  onChangeText,
  value,
  style,
  iconPosition,
  error,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };
  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }
    if (focused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };
  return (
    <View style={globalStyles.inputWrapper}>
      {label && <Text>{label}</Text>}
      <View
        style={{
          ...globalStyles.inputContainer,
          flexDirection: getFlexDirection(),
          borderColor: getBorderColor(),
        }}>
        {icon && icon}
        <TextInput
          style={{
            ...globalStyles.textInput,
            ...style,
          }}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
      {error && <Text style={globalStyles.error}>{error}</Text>}
    </View>
  );
}
