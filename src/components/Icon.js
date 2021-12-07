import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const getIcon = type => {
  switch (type) {
    case 'MaterialIcon':
      return MaterialIcon;

    case 'EvilIcons':
      return EvilIcons;

    case 'AntDesign':
      return AntDesign;

    case 'Ionicons':
      return Ionicons;

    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;

    default:
      return FontAwesomeIcon;
  }
};

export default function Icon({type, ...props}) {
  const FontIcon = getIcon(type);
  return <FontIcon {...props} />;
}
