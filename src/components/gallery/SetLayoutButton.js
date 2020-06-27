import React from 'react';
import { TouchableNativeFeedback, Image, View } from 'react-native';

import twoColumns from '../../../assets/twoColumns.png';
import oneColumn from '../../../assets/oneColumn.png';

export default class SetLayoutButton extends React.Component {

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPressHandler}
            >
                <View style={{ padding: 7 }}>
                    <Image
                        source={ this.props.layout === 'oneColumn' ? oneColumn : twoColumns }
                        style={{
                            width: 27,
                            height: 27
                        }}
                    />
                </View>
            </TouchableNativeFeedback>
        );
    }

}