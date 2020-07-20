import React from 'react';
import { View, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const Key = props => {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                props.onPressHandler(props.value)
            }}
        >
        <View style={styles.key}>
            <Text style={styles.keyText}>{props.value}</Text>
        </View>
        </TouchableNativeFeedback>
    );
}

export default class AccessCodeKeyboard extends React.Component {

    render() {
        const keys = [1,2,3,4,5,6,7,8,9,0];
        return(
            <View>
                <View style={styles.container}>
                    {
                        keys.map(key => {
                            return <Key key={key} value={key} onPressHandler={this.props.pressedKey} />
                        })
                    }

                    <TouchableNativeFeedback
                        onPress={this.props.delete}
                    >
                        <View style={[styles.key, styles.backspace]}>
                            <Ionicons name="md-backspace" size={40} color="black" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        marginBottom: 50
    },
    key: {
        width: '33%',
        alignItems: 'center',
        padding: 10
    },
    keyText: {
        fontSize: 40
    },
    backspace: {
        alignSelf: 'center',
    }
});