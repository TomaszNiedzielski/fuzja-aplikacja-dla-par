import React from 'react';
import { View } from 'react-native';
import colors from '../../../constans/colors';

const RadioButton = props => {
    return (
        <View style={[{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
        }, props.style]}>
            {
                props.selected &&
                <View style={{
                    height: 8,
                    width: 8,
                    borderRadius: 4,
                    backgroundColor: 'white',
                }}/>
            }
        </View>
    );
}

export default RadioButton;