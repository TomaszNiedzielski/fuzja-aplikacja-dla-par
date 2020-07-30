import React, { Component } from "react";
import { StyleSheet, View, Animated, Image, Easing } from 'react-native';

import RotateView from 'react-native-rotate-view';

import { Ionicons } from '@expo/vector-icons';
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import SelectPicker from '../../components/game/SelectPicker';

export default class App extends Component {

    
    render() {

        return (
            <View style={styles.container}>

                <SelectPicker
                    options={['soft', 'hot', 'spicey']}
                />

            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    spinnerWrapper: {
        height: 300,
        width: 300,
        backgroundColor: 'green',
        borderRadius: 300,
        //transform: [{ rotate: '45deg' }]
    },
    
});


/*
import React from 'react';
import { StyleSheet, View, Animated, Image, Easing } from 'react-native';

export default class App extends React.Component {
    constructor() {
        super();
        this.RotateValueHolder = new Animated.Value(0);
    }

    componentDidMount() {
        this.StartImageRotateFunction();
    }

    StartImageRotateFunction() {
        this.RotateValueHolder.setValue(0);

        Animated.timing(this.RotateValueHolder, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
        }).start(() => this.StartImageRotateFunction());
    }
    render() {
        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return (
            <View style={styles.container}>
                <Animated.Image
                    style={{
                        width: 200,
                        height: 200,
                        transform: [{ rotate: RotateData }],
                    }}
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
    },
});

*/

