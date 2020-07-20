/*import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Animated } from "react-native";

import { Ionicons } from '@expo/vector-icons';


export default class App extends Component {
    
    constructor() {
        super();

        this.rotate = this.rotate.bind(this);
    }

    state = {
       rotate: 50
    }

    render() {
        const { rotate } = this.state;
        console.log("render: ", rotate);
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.spinner, {transform: [{ rotate: this.state.rotate+'deg'}]}]} />
                <Button
                    title="rotate"
                    onPress={() => this.rotate()}    
                />
            </View>
        );
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    rotate() {
        console.log(this.state.rotate);
        this.setState({ rotate: this.state.rotate+10 });
    }

    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        height: 100,
        width: 100,
        backgroundColor: 'red'
    }
});
*/

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