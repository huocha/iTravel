import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar, AsyncStorage, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Asset, Font, Image } from 'expo';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Fire from './Fire';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import tabBarIcon from './utils/tabBarIcon';
import Drawer from 'react-native-drawer';
// Import the screens
import { FeedScreen, NewPostScreen, SelectPhotoScreen } from './screens/Feed';
import * as Container from './containers';
import ControlPanel from './components/Drawer/ControlPanelComponent';
import { fonts } from './utils/loadRequirements';
import reducers from './reducers';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import * as userActions from './actions/userActions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: Container.Feed,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle'),
      },
    },
    User: {
      screen: Container.Profile,
      navigationOptions: {
        tabBarIcon: tabBarIcon('person'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

const AppStack = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: 'iTravel' },
    },
    EditProfile: {
      screen: Container.EditProfile,
      navigationOptions: {
        // header:
        // title: null
      }
    }
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

const AuthStack = createSwitchNavigator(
  {
    Login: Container.Login,
    Register: Container.Register
  }
);

const createRootNavigator = (signedIn = false) => {
   return createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: signedIn ? "App" : "Auth",
    }
  );
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            signedIn: false,
            drawerOpen: false,
            drawerDisabled: false,
        };
    }

    componentWillMount() {
        this.loadRequirement();
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    async loadRequirement() {
        await Font.loadAsync(fonts);

        const usrInfos = await AsyncStorage.getItem('userInfos');
        // await AsyncStorage.removeItem('userInfos');
        if (usrInfos) {
            //console.log(usrInfos)
            store.dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(usrInfos) });
            this.setState({ signedIn: true })
        }
        this.setState({ isReady: true });
    }

    closeDrawer = () => {
      console.log('close')
      this._drawer.close()
    };

    openDrawer = () => {
      this._drawer.open()
    };
    render() {
        const { signedIn, isReady } = this.state;
        const Layout = createRootNavigator(signedIn)

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
            <Drawer
              ref={(ref) => this._drawer = ref}
              type="static"
              side="right"
              content={
                <ControlPanel closeDrawer={this.closeDrawer} />
              }
              open={this.state.drawerOpen}
              acceptDoubleTap
              styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
              onOpen={() => {
                console.log('onopen')
                this.setState({drawerOpen: true})
              }}
              onClose={() => {
                console.log('onclose')
                this.setState({drawerOpen: false})
              }}
              openDrawerOffset={(viewport) => {
                const { width } = viewport;
                return width * 0.6
              }}
              captureGestures={false}
              disabled={this.state.drawerDisabled}
            >
              <ActionSheetProvider>
                <Layout />
              </ActionSheetProvider>
            </Drawer>
          </Provider>
        );
    }
}

export default App
