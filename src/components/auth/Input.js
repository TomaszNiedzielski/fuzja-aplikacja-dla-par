import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return (
        <TextInput
            style={ styles.input }        
            placeholder={ props.placeholder }
            onChangeText={ text => {props.onChangeTextHandler(text)} }
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        borderBottomWidth: 3,
        borderColor: 'white',
        padding: 17,
        fontSize: 22,
        marginVertical: 10,
        color: 'white'
    }
});

export default Input;