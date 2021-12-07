import React from 'react';
import {ScrollView, View} from 'react-native';
import globalStyles from '../../Styles/globalStyles';

export default function Container({style, children}) {
  return (
    <ScrollView>
      <View style={{...globalStyles.wrapper, ...style}}>{children}</View>
    </ScrollView>
  );
}
