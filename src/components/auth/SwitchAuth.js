import React from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';

const Button = props => {
    return (
        <TouchableWithoutFeedback
            onPress={ () => {
                props.onPressHandler(props.title)
            } }
        >
            <Text style={ [styles.title, (props.sign === props.title ? styles.underline : '')] }> { props.text } </Text>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: 'white',
    },
    underline: {
        borderBottomWidth: 4,
        borderBottomColor: 'white',
    }
});

export default Button;