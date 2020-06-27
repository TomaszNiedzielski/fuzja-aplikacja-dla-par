import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DefaultBackground = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Wasza galeria</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    text: {
        fontSize: 40,
        color: '#c2c2c2'
    }
});

export default DefaultBackground;