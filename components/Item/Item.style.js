import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';
const profileImageSize = 36;
const padding = 12;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
  },
  textBlue: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.MAIN_BLUE_COLOR
  },
  subtitle: {
    fontFamily: FONTS.REGULAR
  },
  subtitleWhite: {
    opacity: 0.8,
    fontFamily: FONTS.REGULAR,
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
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  imageBackground: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
  }
});

export default styles;
