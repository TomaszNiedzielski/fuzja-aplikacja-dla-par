import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import colors from '../../../constans/colors';

const SavingHeader = props => {
    return (
        <View style={[styles.modalHeader, props.style]}>
            <TouchableWithoutFeedback
                onPress={props.cancelHandler}
            >
                <Text style={styles.cancelText}>cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={props.saveHandler}
            >
                <Text style={styles.saveText}>Save</Text>                            
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    modalHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    saveText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 20,
        marginTop: 10
    },
    cancelText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 20,
        marginTop: 10
    }
});

export default SavingHeader;