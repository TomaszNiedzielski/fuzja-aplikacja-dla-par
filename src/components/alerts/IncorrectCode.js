import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncorrectCode = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Niepoprawny kod dostępu</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
});

export default IncorrectCode;