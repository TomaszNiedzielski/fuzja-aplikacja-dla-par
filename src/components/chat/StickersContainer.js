import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableNativeFeedback, Dimensions } from 'react-native';
import { apiImage } from '../../../constans/apiUrl';
import colors from '../../../constans/colors';

import { default as ImageScalable } from 'react-native-scalable-image';

export default class StickersContainer extends React.Component {

    state = {
        stickersCategory: null,
        stickers: [],
        selectedSticker: null
    }

    render() {
        const { stickers, selectedSticker, stickersCategory } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <ScrollView>
                    <View style={styles.board}>
                        {
                            stickers.map(sticker => {
                                const uri = apiImage+'stickers/'+stickersCategory+'/'+sticker+'.png';
                                return (
                                    <TouchableNativeFeedback
                                        key={sticker}
                                        onPress={() => {
                                            this.setState({ selectedSticker: sticker })
                                        }}
                                    >
                                        <View style={[ styles.stickerWrapper, selectedSticker === sticker && {backgroundColor: '#ededed'} ]}>
                                            <ImageScalable
                                                source={{uri: uri}}
                                                width={(Dimensions.get('window').width-30)/3}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </TouchableNativeFeedback>
                                )
                            })
                        }
                    </View>
                    </ScrollView>
                    {selectedSticker !== null &&
                    <View style={styles.buttonsWrapper}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                this.setState({ selectedSticker: null });
                            }}
                        >
                            <Text style={[styles.button, {backgroundColor: 'white', color: 'rgba(255,158,0,1)'}]}>Anuluj</Text>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPress={() => {
                                this.props.sendSticker(selectedSticker, stickersCategory);
                                this.setState({ selectedSticker: null });
                            }}
                        >
                            <Text style={[styles.button, {backgroundColor: 'rgba(255,158,0,1)'}]}>Wyślij</Text>
                        </TouchableNativeFeedback>
                    </View>}
                </View>
            </>
        );
    }

    componentDidMount() {
        const { category, numberOfStickers } = this.props;
        let array = [];
        for(let i=1; i<=numberOfStickers; i++) {
            array.push(i);
        }
        this.setState({ stickers: array, stickersCategory: category });
    }

}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '100%',
        //position: 'absolute',
        marginBottom: 50,
        borderTopWidth: 1,
        borderColor: '#ededed',
        zIndex: 1,
        //backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    stickerWrapper: {
        padding: 5,
        justifyContent: 'center'
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    button: {
        width: 150,
        backgroundColor: 'green',
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255,158,0,1)'
    }
});