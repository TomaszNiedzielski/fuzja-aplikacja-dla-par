import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import fuzja_icon from '../../../assets/fuzja_icon.png';

export default class AppName extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={fuzja_icon} />
                <Text style={styles.title}>fuzja</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    title: {
        fontSize: 55,
        fontFamily: 'KaushanScript-Regular',
        color: 'white',
        marginLeft: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        elevation: 10
    }
});
