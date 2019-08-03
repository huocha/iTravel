import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { Asset, Font, Image } from 'expo';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Fire from './Fire';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import { FeedScreen, NewPostScreen, SelectPhotoScreen } from './screens/Feed';
import * as Container from './containers';
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
    /*Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
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
    },*/
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
        if (usrInfos) {
            const infos =
        typeof usrInfos === 'string' ? JSON.parse(usrInfos) : usrInfos;
            // userInfos.set(infos);

            store.dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(usrInfos) });
            this.setState({ signedIn: true })
        }
        this.setState({ isReady: true });
    }

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
            <ActionSheetProvider>
              <Layout />
            </ActionSheetProvider>
          </Provider>
        );
    }
}

export default App
