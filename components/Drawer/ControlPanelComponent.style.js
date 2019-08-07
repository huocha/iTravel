import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  controlText: {
    color: COLORS.RED_COLOR,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})

export default styles;
