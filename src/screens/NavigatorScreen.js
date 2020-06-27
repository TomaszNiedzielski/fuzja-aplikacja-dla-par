import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeScreen from './HomeScreen';
import GalleryNavigator from './gallery/GalleryNavigator';
import ChatScreen from './ChatScreen';
import SettingsNavigator from './settings/SettingsNavigator';
import colors from '../../constans/colors';


const Tab = createBottomTabNavigator();

const NavigatorScreen = () => {
    const color = colors.primary; //icon color
    const size = 30; // icon size
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: true,
                activeTintColor: '#470027',
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                    ),
                    title: 'Chat'
                }}
            />
            <Tab.Screen
                name="GalleryNavigator"
                component={GalleryNavigator}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="image" color={color} size={size} />
                    ),
                    title: 'Galeria'
                }}
            />
            <Tab.Screen
                name="SettingsNavigator"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="settings" color={color} size={size} />
                    ),
                    title: 'Ustawienia'
                }}
            />
        </Tab.Navigator>
    );
}

export default NavigatorScreen;