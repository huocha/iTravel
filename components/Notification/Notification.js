import React, { Component } from 'react';
import { Text, Dimensions, View, TouchableHighlight } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { COLORS, FONTS } from '../../utils/constants';
import styles from './Notification.style.js';

export default class Notification extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.global.notifier.open === this.props.global.notifier.open) {
            return;
        }

        if (this.props.global.notifier.open) {
            setTimeout(() => { this.props.globalActions.close(); }, 5000);
        }
    }

    types = {
        INFO: COLORS.MAIN_GREEN_COLOR,
        ERROR: COLORS.RED_PRICE_COLOR,
    };

    icons = {
        INFO: 'emoji-happy',
        ERROR: 'emoji-sad',
    };

    render() {
        return (
            <Animatable.View
                animation={this.props.global.notifier.open ? 'slideInDown' : 'slideOutUp'}
                easing="ease-in-out-back"
                style={[
                    styles.container,
                    {
                        backgroundColor: this.types[this.props.global.notifier.type],
                        display: this.props.global.notifier.open ? 'flex' : 'none',
                    },
                ]}
            >
                <TouchableHighlight onPress={() => this.props.globalActions.close()}>
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        <Entypo
                            size={26}
                            name={this.icons[this.props.global.notifier.type]}
                            color="white"
                        />
                        <Text style={styles.description}>
                            {this.props.global.notifier.text}
                        </Text>
                    </View>
                </TouchableHighlight>
            </Animatable.View>
        );
    }
}

NotifierComponent.propTypes = {
    global: PropTypes.shape({
        notifier: PropTypes.shape({
            type: PropTypes.string,
            open: PropTypes.bool,
            text: PropTypes.string,
        }),
    }).isRequired,
    globalActions: PropTypes.shape({
        close: PropTypes.func,
    }).isRequired,
};
