import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { Asset, Font, Image } from 'expo';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import Login from './screens/Login';
import { fonts } from './utils/loadRequirements';

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
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
    },
    User: {
      screen: Login,
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

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const StackNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: 'iTravel' },
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
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
            userInfos.set(infos);
        }
        this.setState({ isReady: true });
    }

    render() {
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
        return <StackNavigator />;
    }
}
