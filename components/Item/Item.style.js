import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';
const profileImageSize = 36;
const padding = 12;

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontFamily: FONTS.MEDIUM,
    color: 'white'
  },
  textBlue: {
    fontWeight: '600',
    fontFamily: FONTS.MEDIUM,
    color: COLORS.MAIN_BLUE_COLOR
  },
  subtitle: {
    fontWeight: '400',
    opacity: 0.6,
    fontFamily: FONTS.REGULAR
  },
  subtitleWhite: {
    fontWeight: '400',
    opacity: 0.8,
    fontFamily: FONTS.REGULAR,
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padding: {
    padding,
  },
  avatar: {
    aspectRatio: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding,
  },
  viewBackground: {
    backgroundColor: 'rgba(250, 107, 107, 0.4)',
    padding: 15,
  }
});

export default styles;
