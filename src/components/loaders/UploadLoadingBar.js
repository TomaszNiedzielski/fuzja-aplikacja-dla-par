import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class UploadLoadingBar extends React.Component {

    state = {
        progress: 0
    }
    
    render() {
        const { progress } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.barWrapper}>
                    <View style={[styles.bar, {width: progress+'%'}]}></View>
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
            </View>
        );
    }

    componentDidUpdate() {
        if(this.state.progress !== this.props.progress) {
            this.setState({ progress: this.props.progress });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 90,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        top: '45%'
    },
    barWrapper: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '95%',
        height: 25,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    bar: {
        height: '100%',
        backgroundColor: '#00a2ed'
    },
    progressText: {
        color: 'white',
        marginTop: 10
    }
});