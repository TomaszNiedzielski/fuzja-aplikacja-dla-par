import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigation/RootNavigation';

import LoadingScreen from './src/screens/LoadingScreen';
import AuthScreen from './src/screens/auth/AuthScreen';
import SearchPartnerScreen from './src/screens/auth/SearchPartnerScreen';
import WaitingForPartnerScreen from './src/screens/auth/WaitingForPartnerScreen';
import NavigatorScreen from './src/screens/NavigatorScreen';

import ChangeDesktopScreen from './src/screens/settings/ChangeDesktopScreen';
import ChangeAvatarScreen from './src/screens/settings/ChangeAvatarScreen';
import VideoScreen from './src/screens/settings/VideoScreen';

import AddImageScreen from './src/screens/gallery/AddImageScreen';
import EditDescriptionScreen from './src/screens/gallery/EditDescriptionScreen';
import ImagePreviewScreen from './src/screens/gallery/ImagePreviewScreen';

const Stack = createStackNavigator();


export default class App extends React.Component {
    
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
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}