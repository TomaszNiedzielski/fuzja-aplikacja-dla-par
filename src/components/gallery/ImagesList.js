import React from 'react';
import { 
    View,
    FlatList,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    Dimensions,
    RefreshControl,
    Text
} from 'react-native';
import { apiImage } from '../../../constans/apiUrl';
import { default as ImageScalable } from 'react-native-scalable-image';

export default class ImagesList extends React.Component {
    
    state = {
        images: this.props.images,
        userToken: this.props.userToken,
        refreshing: false,
    }

    render() {
        const { images, refreshing, userToken } = this.state;
        const { layout } = this.props;

        if(layout === 'oneColumn') {
            return (
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });
                                    this.props.loadImages();
                                }}
                            />
                        }
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state.images}
                        renderItem={({item}) =>
                            <View style={styles.bigImageWrapper}>
                                <TouchableNativeFeedback
                                    onPress={() => {
                                        this.props.navigation.navigate('ImagePreview', {
                                            image: item,
                                            editDescription: this.props.editDescription
                                        });
                                    }}
                                >
                                    <ImageScalable
                                        source={{
                                            uri: apiImage+'gallery/'+item.image_name
                                        }}
                                        width={Dimensions.get('window').width-20}
                                        resizeMode="contain"
                                    />
                                </TouchableNativeFeedback>
                            </View>
                        }
                    />
                </View>
            );
        } else {
            return (
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });                                    
                                    this.props.loadImages();
                                }}
                            />
                        }
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state.images}
                        numColumns={2}
                        key={2}
                        renderItem={({item}) =>
                            <View style={styles.imageWrapper}>
                                <TouchableNativeFeedback
                                    onPress={() => {
                                        this.props.navigation.navigate('ImagePreview', {
                                            image: item,
                                            editDescription: this.props.editDescription
                                        });
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: apiImage+'gallery/'+item.image_name
                                        }}
                                        style={styles.image}
                                    />
                                </TouchableNativeFeedback>
                            </View>
                        }
                    />
                </View>
            );
        }
    }

    componentDidUpdate() {
        if(this.props.images !== this.state.images) {
            this.setState({
                images: this.props.images
            });
        }

        if(this.props.refreshControl !== this.state.refreshing) {
            this.setState({
                refreshing: this.props.refreshControl
            });
        }

    }

}

const styles = StyleSheet.create({
    imageWrapper: {
        backgroundColor: '#e3e3e3',
        margin: 1
    },
    image: {
        width: (Dimensions.get('window').width-4)/2,
        height: (Dimensions.get('window').width-4)/2,
    },
    bigImageWrapper: {
        backgroundColor: '#e3e3e3',
        width: Dimensions.get('window').width-20,
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 5,
        overflow: 'hidden'
    }
});

