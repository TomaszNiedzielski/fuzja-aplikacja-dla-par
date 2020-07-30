import React from 'react';
import { View } from 'react-native';
import colors from '../../../constans/colors';

const RadioButton = props => {
    return (
        <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
        }, props.style]}>
            {
                props.selected &&
                <View style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: 'white',
                }}/>
            }
        </View>
    );
}

export default RadioButton;