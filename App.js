import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Asset, Font, Image } from 'expo';
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
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    async loadRequirement() {
        await Font.loadAsync(fonts);

        const usrInfos = userInfos.get();

        if (usrInfos) {
            //console.log(usrInfos)
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
            <ActionSheetProvider>
              <Navigation />
            </ActionSheetProvider>
          </Provider>
        );
    }
}

export default App
