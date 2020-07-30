import React from 'react';
import { View, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';
import RadioButton from './RadioButton';

export default class GenderSettings extends React.Component {


    render() {
        const { gender } = this.props;
        return(
            <View style={styles.genderSettingsWrapper}>
                <View style={styles.genderSettings}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <TouchableNativeFeedback
                        onPress={() => {
                            this.props.setGender('male')
                        }}
                    >
                        <View style={styles.row}>
                            <RadioButton selected={gender === 'male' ? true : false} />
                            <Text style={styles.gender}>Mężczyzna</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => {
                            this.props.setGender('female')
                        }}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <RadioButton selected={gender === 'female' ? true : false} />
                            <Text style={styles.gender}>Kobieta</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    genderSettingsWrapper: {
        width: '100%',
    },
    genderSettings: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
        alignItems: 'center'        
    },
    row: {
        flexDirection: 'row',
    },
    gender: {
        color: 'white',
        marginLeft: 7,
        fontSize: 15
    },
    name: {
        color: 'white',
        fontWeight: 'bold'
    }
});