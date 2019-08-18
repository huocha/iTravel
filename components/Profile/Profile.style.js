import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const numColumns = 3;
const size = (Dimensions.get('window').width - 30)/numColumns;

const styles = StyleSheet.create({
  textRegular: {
    fontFamily: FONTS.REGULAR,
  },
  textBold: {
    fontFamily: FONTS.BOLD,
  },
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  coverBio: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  coverContainer: {
    marginBottom: 55,
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (1/2),
    width: Dimensions.get('window').width,
  },
  coverMetaContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: '#FFF',
    fontFamily: FONTS.BOLD,
    fontSize: 24,
  },
  coverTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coverTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  mansonryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: 'absolute',
  },
  sceneContainer: {
    marginTop: 10,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  tabBar: {
    backgroundColor: 'transparent',
    marginLeft: 130,
    marginRight: 15,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: 'relative',
    zIndex: 10,
  },
  tabRow: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  tabLabelNumber: {
    color: COLORS.MAIN_BLUE_COLOR,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 2,
  },
  tabLabelText: {
    color: COLORS.MAIN_BLUE_COLOR,
    fontSize: 9,
    textAlign: 'left',
  },
  dialogTouch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  dialogText: {
    color: COLORS.MAIN_BLUE_COLOR,
    fontFamily: FONTS.MEDIUM,
    fontSize: 18
  },
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  }
})

export default styles;
