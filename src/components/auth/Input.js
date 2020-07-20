import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return (
        <TextInput
            style={ styles.input }        
            onChangeText={ text => {props.onChangeTextHandler(text)} }
            //autoCapitalize="none"
            placeholderTextColor="white"
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 3,
        borderColor: 'white',
        padding: 17,
        fontSize: 20,
        marginVertical: 10,
        color: 'white'
    }
});

export default Input;