import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constans/colors';

const AddImageButton = props => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={props.onPressHandler}
            >
                <View style={{ borderRadius: 50, height: 57, width: 57, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                    <Ionicons name="ios-add-circle" size={70} color={colors.primary} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: '100%',
        alignItems: 'flex-end'
    }
});

export default AddImageButton;