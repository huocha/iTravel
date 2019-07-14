import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  text: { fontWeight: 'bold', fontSize: 16, fontFamily: FONTS.MEDIUM },
});

export default styles;
