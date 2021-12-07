import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../Styles/globalStyles';
import colors from '../assets/theme/colors';

export default function Message({
  message,
  primary,
  secondary,
  danger,
  info,
  success,
  retry,
  retryFn,
  onDismiss,
}) {
  const [messDismiss, setMessDismiss] = useState(false);
  const getBgColor = () => {
    if (primary) {
      return colors.primary;
    }
    if (secondary) {
      return colors.secondary;
    }
    if (danger) {
      return colors.danger;
    }
    if (info) {
      return colors.info;
    }
    if (success) {
      return colors.success;
    }
  };

  return (
    <>
      {messDismiss ? null : (
        <TouchableOpacity
          style={{
            ...globalStyles.customButton,
            backgroundColor: getBgColor(),
          }}>
          <View
            style={{
              ...globalStyles.loaderSection,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: colors.white,
              }}>
              {message}
            </Text>
            {retry && typeof onDismiss !== 'function' && (
              <TouchableOpacity onPress={() => retryFn()}>
                <Text
                  style={{
                    color: colors.white,
                  }}>
                  Retry
                </Text>
              </TouchableOpacity>
            )}
            {typeof onDismiss === 'function' && (
              <TouchableOpacity
                onPress={() => {
                  setMessDismiss(true);
                  onDismiss();
                }}>
                <Text
                  style={{
                    color: colors.white,
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
