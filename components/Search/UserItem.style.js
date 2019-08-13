import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const styles = StyleSheet.create({
  textRegular: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_GREY
  },
  textBold: {
    fontFamily: FONTS.MEDIUM,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
})

export default styles;
