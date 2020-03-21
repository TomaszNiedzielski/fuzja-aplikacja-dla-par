import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigation/RootNavigation';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';

import LoadingScreen from './src/screens/LoadingScreen';
import AuthScreen from './src/screens/AuthScreen';
import SearchPartnerScreen from './src/screens/SearchPartnerScreen';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
    auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
    return (
        <Provider store={ store }>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchPartner" component={SearchPartnerScreen} options={{ headerShown: false }} />                    
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
