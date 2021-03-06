import React from 'react';
import { AntDesign, Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../utils/constants';

export const Icon = ({ type, name, size }) => {
  const styles = { marginRight: 8 };
  const SIZE = 26;
  switch (type) {
    case 'MaterialCommunityIcons':
      return (<MaterialCommunityIcons style={styles} name={name} size={size || SIZE} color={COLORS.RED_COLOR} />)
      break;
    case 'Ionicons':
      return (<Ionicons style={styles} name={name} size={size || SIZE} color={COLORS.RED_COLOR} />)
      break;
    case 'Feather':
      return (<Feather style={styles} name={name} size={size || SIZE} color={COLORS.RED_COLOR} />)
      break;
    case 'MaterialIcons':
      return (<MaterialIcons style={styles} name={name} size={size || SIZE} color={COLORS.RED_COLOR} />)
      break;
    case 'AntDesign':
      return (<AntDesign style={styles} name={name} size={size || SIZE} color={COLORS.RED_COLOR} />)
      break;
    default:
      return null
      break;
  }
};

export const tabBarIcon = name => ({ tintColor }) => (
  <AntDesign
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);
