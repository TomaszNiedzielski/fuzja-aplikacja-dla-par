import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class InternetConnection extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Brak połączenia z internetem!</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '80%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
    text: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center'
    }
});