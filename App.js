import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  Text
} from 'react-native';
import { Asset, Font, Image, Notifications, Permissions } from 'expo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { createAppContainer } from 'react-navigation';
import { fonts } from './utils/loadRequirements';
import reducers from './reducers';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createRootNavigator from './navigation';
import * as userActions from './actions/userActions';
import { userInfos } from './utils/storage';
import { registerForPushNotificationsAsync } from './utils/registerForPushNotificationsAsync'
import CustomNotification from './components/Notification/CustomNotification';
import NotificationPopup from 'react-native-push-notification-popup';
import moment from 'moment';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            signedIn: false,
        };
    }

    componentWillMount() {
        this.loadRequirement();

        this._notificationSubscription = Notifications.addListener(
          this._handleNotification
        );
    }

    _handleNotification = notification => {
      console.log("_handleNotification")
      console.log({ notification })
      const { navigation } = this.props;
      //PushNotificationService.handleNotification(notification, navigation);
      const { username, message, avatar } = notification.data;
      console.log(navigation)
      this.popup.show({
        onPress: function() {console.log('Pressed')},
        //appIconSource: require('./assets/icon.jpg'),
        appTitle: 'Some App',
        timeText: moment(),
        title: username,
        body: { message, image: avatar },
        slideOutTime: 10000
      });

    };

    async componentDidMount() {
        StatusBar.setHidden(true);
        // await this.enablePushNotifications();
        const token = await registerForPushNotificationsAsync();
        console.log({ token })
        this._notificationSubscription = Notifications.addListener(
          this._handleNotification
        );
    }

    async loadRequirement() {
        await Font.loadAsync(fonts);

        const usrInfos = await AsyncStorage.getItem('userInfos');

        if (usrInfos) {
            store.dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(usrInfos) });
            this.setState({ signedIn: true })
        }
        this.setState({ isReady: true });
    }

    render() {
        const { signedIn, isReady } = this.state;
        const RootStack = createRootNavigator(signedIn)
        let Navigation = createAppContainer(RootStack);
        if (!this.state.isReady) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator
                    size="large"
                    color="#132968"
                    style={{ alignSelf: 'center' }}
                    animating
                />
            </View>
          );
        }
        return (
          <Provider store={store}>
            <NotificationPopup
              ref={ref => this.popup = ref}
              renderPopupContent={(props) => <CustomNotification {...props}/>}
            />
            <ActionSheetProvider>
              <Navigation />
            </ActionSheetProvider>
          </Provider>
        );
    }
}

export default App
