import React from 'react';
import { TouchableNativeFeedback, Text, AsyncStorage, StyleSheet } from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';

const LogoutButton = props => {
    const logout = async () => {
        await AsyncStorage.clear();
        RootNavigation.replace('Loading');
    }

    return (
        <TouchableNativeFeedback
            onPress={logout}
        >
            <Text style={[styles.text, props.style]}>Wyloguj się</Text>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: 'gray',
        fontWeight: 'bold'
    }
});

export default LogoutButton;