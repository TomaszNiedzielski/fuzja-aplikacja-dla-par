import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import logoWithNameTransparent from '../../../assets/logoWithNameTransparent.png';

export default class AppName extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logoWithNameTransparent} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30
    },
    logo: {
        width: 260,
        height: 90
    }
});
