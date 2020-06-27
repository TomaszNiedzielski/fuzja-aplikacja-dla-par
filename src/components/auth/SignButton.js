import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../../constans/colors';

const SignButton = props => {
    return (
        <TouchableOpacity
            style={ styles.button }
            onPress={props.onPressHandler}
        >
            { (props.loadingButton === false 
                ? <Text style={ styles.title }>{props.title}</Text>
                : <ActivityIndicator 
                    color={colors.primary}
                />) 
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 60,
        padding: 16,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 50,
        marginVertical: 25,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#f22135',
        fontWeight: 'bold',
    }
});

export default SignButton;