import React from 'react';
import { TouchableNativeFeedback, Text, StyleSheet, View } from 'react-native';
import colors from '../../../constans/colors';
import { Entypo } from '@expo/vector-icons';
const SaveButton = props => {
    return(
        <TouchableNativeFeedback
            onPress={props.saveHandler}
        >
            <View style={{padding: 7}}>
                <Entypo name="check" size={24} color={props.color ? props.color : 'black'} style={{ marginRight: 10 }} />
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    saveText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 10
    }
});

export default SaveButton;