import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


export default class MessageHeart extends Component {
    
    constructor() {
        super();

        this.run = this.run.bind(this);
        this.showHeart = this.showHeart.bind(this);
        this.hideHeart = this.hideHeart.bind(this);
    }

    state = {
       size: 0
    }

    render() {
        const { size } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.heartWrapper}>
                    <Ionicons name="ios-heart" size={size} color="red" style={styles.heart}/>
                    {size > 300 &&
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>Dzięki, że jesteś!</Text>
                            <Text/><Text/><Text/>                            
                        </View>
                    }
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.run(); 
    }

    componentWillUnmount() {
        this.setState({ size: 1 });
        clearInterval(this.intervalID)
    }

    run() {
        this.setState({ size: 1 });
        this.intervalID = setInterval(this.showHeart, 10);
    }

    showHeart() {
        if(this.state.size > 300) {
            clearInterval(this.intervalID);
        }
        this.setState({ size: this.state.size+50 });
    }

    hideHeart() {
        this.setState({ size: 1 });
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heartWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        position: 'absolute',
        padding: 30,
        borderRadius: 10,
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontSize: 25,
        fontWeight: 'bold',
    }
});