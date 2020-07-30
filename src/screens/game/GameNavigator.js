import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GameStartScreen from './GameStartScreen';
import GameDrawingUsersScreen from './GameDrawingUsersScreen';
import GameSelectionScreen from './GameSelectionScreen';
import GameCardScreen from './GameCardScreen';

import colors from '../../../constans/colors';

const Stack = createStackNavigator();

const GameNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GameStartScreen"
                component={GameStartScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GameDrawingUsersScreen"
                component={GameDrawingUsersScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GameSelectionScreen"
                component={GameSelectionScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GameCardScreen"
                component={GameCardScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default GameNavigator;