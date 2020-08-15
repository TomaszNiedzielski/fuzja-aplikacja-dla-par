import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import { default as ImageScalable } from 'react-native-scalable-image';
import { apiImage } from '../../../constans/apiUrl';

export default class StickersSelectCategoryBar extends React.Component {

    state = {
        categories: [
            {
                name: 'bears'
            },
            {
                name: 'couple_one'
            },
            {
                name: 'couple_two'
            },
            {
                name: 'yellow_girl'
            }
        ]
    }

    render() {
        const { categories } = this.state;
        return(
            <View style={styles.container}>
                {
                    categories.map(category => {
                        return(
                            <TouchableNativeFeedback
                                key={category.name}
                                onPress={() => {
                                    this.props.onPressHandler(category.name);
                                }}
                            >
                                <View style={styles.stickerWrapper}>
                                    <ImageScalable
                                        source={{
                                            uri: apiImage+'stickers/'+category.name+'/'+1+'.png'
                                        }}
                                        width={40}
                                    />
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        borderColor: '#ededed',
        zIndex: 1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    stickerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});