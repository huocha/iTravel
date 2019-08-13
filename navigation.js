import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  ScrollView,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import { FeedScreen, NewPostScreen, SelectPhotoScreen } from './screens/Feed';
import * as Container from './containers';

const User = createStackNavigator(
  {
    Profile: {
      screen: Container.Profile,
    }
  },
  {
    navigationOptions: {
      tabBarIcon: tabBarIcon('person')
    },
  }
);

const Search = createStackNavigator(
  {
    UserList: {
      screen: Container.UserSearchList,
    }
  },
  {
    navigationOptions: {
      tabBarIcon: tabBarIcon('search')
    },
  }
)

const Feed = createStackNavigator(
  {
    Feed: {
      screen: Container.Feed
    }
  },
  {
    navigationOptions: {
      // Add a cool Material Icon for this screen
      tabBarIcon: tabBarIcon('home'),
    },
  }
)

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    //Feed: Feed,
    Search: Search,
    User: User,
  },
  {
    headerMode: 'none',
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createStackNavigator(
  {
    Tabs: { screen: navigator, navigationOptions: { header: null }},
    EditProfile: {
      screen: Container.EditProfile,
    },
    Chat: {
      screen: Container.Chat
    },
  },
  {
    //headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

const AuthStack = createSwitchNavigator(
  {
    Login: Container.Login,
    Register: Container.Register
  }
);

const createRootNavigator = (signedIn = false) => {
   return createSwitchNavigator(
    {
      App: App,
      Auth: AuthStack,
    },
    {
      initialRouteName: signedIn ? "App" : "Auth",
    }
  );
}

export default createRootNavigator;
