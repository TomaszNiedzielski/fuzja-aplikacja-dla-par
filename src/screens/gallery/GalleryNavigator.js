import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GalleryScreen from './GalleryScreen';
import ImagePreviewScreen from './ImagePreviewScreen';
import colors from '../../../constans/colors';

const Stack = createStackNavigator();

const GalleryNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Gallery"
                component={GalleryScreen}
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

export default GalleryNavigator;