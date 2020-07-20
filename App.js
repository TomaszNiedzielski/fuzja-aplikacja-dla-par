import React from 'react';
import { StatusBar, AppState, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigation/RootNavigation';

import * as RootNavigation from './navigation/RootNavigation';

import LoadingScreen from './src/screens/LoadingScreen';
import AuthScreen from './src/screens/auth/AuthScreen';
import SearchPartnerScreen from './src/screens/auth/SearchPartnerScreen';
import WaitingForPartnerScreen from './src/screens/auth/WaitingForPartnerScreen';
import NavigatorScreen from './src/screens/NavigatorScreen';

import ChangeDesktopScreen from './src/screens/settings/ChangeDesktopScreen';
import ChangeAvatarScreen from './src/screens/settings/ChangeAvatarScreen';
import VideoScreen from './src/screens/settings/VideoScreen';
import ChangeAccessCodeScreen from './src/screens/settings/ChangeAccessCodeScreen';
import SaveImportantDatesScreen from './src/screens/settings/SaveImportantDatesScreen';

import AccessCodeScreen from './src/screens/AccessCodeScreen';
import PaymentScreen from './src/screens/PaymentScreen';

import AddImageScreen from './src/screens/gallery/AddImageScreen';
import EditDescriptionScreen from './src/screens/gallery/EditDescriptionScreen';
import ImagePreviewScreen from './src/screens/gallery/ImagePreviewScreen';


const Stack = createStackNavigator();


export default class App extends React.Component {
    
    constructor() {
        super();
        this.checkIfIssetAccessCode = this.checkIfIssetAccessCode.bind(this);
    }

    state = {
        accessCode: false
    }

    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchPartner" component={SearchPartnerScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="WaitingForPartner" component={WaitingForPartnerScreen} options={{ headerShown: false }} />                    
                    <Stack.Screen name="NavigatorScreen" component={NavigatorScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ChangeDesktop" component={ChangeDesktopScreen} />
                    <Stack.Screen name="ChangeAvatar" component={ChangeAvatarScreen} />
                    <Stack.Screen name="AddImageScreen" component={AddImageScreen} />
                    <Stack.Screen name="EditDescriptionScreen" component={EditDescriptionScreen} />
                    <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ChangeAccessCodeScreen" component={ChangeAccessCodeScreen} />
                    <Stack.Screen name="AccessCodeScreen" component={AccessCodeScreen} />
                    <Stack.Screen name="SaveImportantDatesScreen" component={SaveImportantDatesScreen} />
                    <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />                    
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    componentDidMount() {
        this.checkAppState();
    }

    checkAppState() {
        const { accessCode } = this.state;
        this.handleAppStateChange = (state) => {
            if(state === 'active') {
                this.checkIfIssetAccessCode();
                //RootNavigation.navigate('AccessCodeScreen');
            }
        }
        
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    checkIfIssetAccessCode = async () => {
        const accessCode = await AsyncStorage.getItem('accessCode');
        if(accessCode) {
            this.setState({ accessCode: true });
            RootNavigation.navigate('AccessCodeScreen');
        }
    }


}