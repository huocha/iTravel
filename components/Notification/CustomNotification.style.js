import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const { width: deviceWidth } = Dimensions.get('window');

function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812)
          || (dimen.height === 896 || dimen.width === 896))
  );
}

const HORIZONTAL_MARGIN = 8; // left/right margin to screen edge

const CONTAINER_MARGIN_TOP = (
  Platform.OS === 'ios'
    ? isIphoneX() ? 34 : 10
    : StatusBar.currentHeight + 10
);  // Just to add a bit more padding


const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  headerTimeContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTime: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    lineHeight: 14,
    color: COLORS.LIGHT_GREY,
    marginTop: 5,
  },
  popupContentContainer: {
    flex: 1,
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',  // TEMP
    borderRadius: 12,
    minHeight: 86,
    // === Shadows ===
    // Android
    elevation: 2,
    // iOS
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  contentContainer: {
    flex: 0.8,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  contentTitleContainer: {
  },
  contentTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
  },
  contentTextContainer: {
  },
  contentText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    lineHeight: 14,
    color: COLORS.LIGHT_GREY,
    marginTop: 5,
  },
});

export default styles
