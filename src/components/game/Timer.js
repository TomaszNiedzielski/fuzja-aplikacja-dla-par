import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default class Timer extends React.Component {

    constructor() {
        super();

        this.countDown = this.countDown.bind(this);
        this.makeSounds = this.makeSounds.bind(this);
    }

    state = {
        remeberMinutes: null,
        remeberSeconds: null,
        minutes: null,
        seconds: null,
        working: false
    }

    render() {
        const { minutes, seconds, working } = this.state;
        const { style } = this.props;
        return(
            <View style={styles.container}>
                <View style={[styles.stoper, {borderColor: style.color}]}>
                    {working ?
                        <Entypo name="controller-stop" size={style.fontSize} color={style.color} onPress={() => this.countDown()} />
                        :
                        <Entypo name="controller-play" size={style.fontSize} color={style.color} onPress={() => this.countDown()} />
                    }
                </View>
                <View style={styles.time}>
                    {minutes < 10 &&
                        <Text style={[styles.text, style]}>0</Text>
                    }
                    <Text style={[styles.text, style]}>{minutes ? minutes : 0}</Text>

                    <Text style={[styles.text, style]}>:</Text>

                    {seconds < 10 &&
                        <Text style={[styles.text, style]}>0</Text>
                    }                    
                    <Text style={[styles.text, style]}>{seconds}</Text>
                </View>
            </View>
        )
    }

    async countDown() {
        this.setState({ working: !this.state.working });
        if(this.state.working === true) {
            clearInterval(this.count);
            this.setState({
                seconds: this.state.remeberSeconds,
                minutes: this.state.remeberMinutes
            });
            return;
        }

        if(this.state.seconds === 0) {
            if(this.state.minutes === 0) {
                return;
            }
            this.makeSounds('start');
            this.setState({ seconds: 59, minutes: this.state.minutes-1 });
        } else {
            this.makeSounds('start');
            this.setState({ seconds: this.state.seconds-1 });            
        }

        this.count = setInterval(() => {
            const { seconds, minutes } = this.state;
            
            if(seconds === 0) {
                if(minutes === 0) {
                    this.makeSounds('stop');                    
                    clearInterval(this.count);
                    return;
                } else {
                    this.setState({
                        minutes: this.state.minutes-1,
                        seconds: 59
                    });
                }
            }
            this.setState({ seconds: this.state.seconds-1 });
        }, 1000);
    }

    async makeSounds(soundType) {
        const startTimerSound = new Audio.Sound();
        const stopTimerSound = new Audio.Sound();
        if(soundType === 'start') {
            await startTimerSound.loadAsync(require( '../../../assets/sounds/timer_start.mp3' ));
            startTimerSound.playAsync();
        } else {
            await stopTimerSound.loadAsync(require( '../../../assets/sounds/timer_stop.mp3' ));
            stopTimerSound.playAsync();
        }
    }

    componentDidMount() {
        this.setState({
            remeberMinutes: this.props.minutes,
            remeberSeconds: this.props.seconds,
            minutes: this.props.minutes,
            seconds: this.props.seconds,
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        flexDirection: 'row'
    },
    text: {
        
    },
    stoper: {
        marginRight: 7,
        borderWidth: 2,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});