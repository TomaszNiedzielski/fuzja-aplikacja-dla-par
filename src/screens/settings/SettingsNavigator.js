import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';
import colors from '../../../constans/colors';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white',
                    }
                }}
            />
        </Stack.Navigator>
    );
}

export default SettingsNavigator;