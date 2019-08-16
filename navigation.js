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
import { tabBarIcon } from './components/Icon/Icon';
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
      tabBarIcon: tabBarIcon('user')
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
      tabBarIcon: tabBarIcon('search1')
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

const Photo = createStackNavigator(
  {
    Photo: {
      screen: SelectPhotoScreen
    }
  },
  {
    navigationOptions: {
      tabBarIcon: tabBarIcon('pluscircleo'),
    },
  }
)
// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    Feed: Feed,
    Search: Search,
    // All the same stuff but for the Photo screen
    Photo: Photo,
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
    ListChat: {
      screen: Container.ListChat
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
