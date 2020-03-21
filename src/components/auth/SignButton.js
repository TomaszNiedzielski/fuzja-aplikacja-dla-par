import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignButton = props => {
    return (
        <TouchableOpacity
            style={ styles.button }
            onPress={props.onPressHandler}
        >
            <Text style={ styles.title }>
                { props.title }
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '80%',
        padding: 16,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 50,
        marginVertical: 25,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
});

export default SignButton;