import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../utils/constants';

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    display: 'flex',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 40,
    borderWidth: 3,
    height: 80,
    width: 80,
  },
  inforView: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER_BOTTOM
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: 30,
  },
  inputLabel: {
    flex: 0.3,
    //backgroundColor: 'blue',
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 0.7,
    //backgroundColor: 'yellow',
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
  }
})

export default styles
