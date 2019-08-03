import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const styles = {
    container: {
        borderWidth: 0,
        width: Dimensions.get('window').width,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 999999,
        elevation: 10,
        shadowColor: '#828282',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        margin: 0,
        padding: 0,
    },
    description: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        fontFamily: FONTS.MEDIUM,
        color: 'white',
    },
};
