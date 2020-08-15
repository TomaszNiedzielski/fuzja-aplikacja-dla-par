import React from 'react';
import { View, StyleSheet, AsyncStorage, Image } from 'react-native';

import { apiUrl, apiImage } from '../../../constans/apiUrl';

import DefaultBackground from '../../components/gallery/DefaultBackground';
import AddImageButton from '../../components/gallery/AddImageButton';
import ImagesList from '../../components/gallery/ImagesList';

import SetLayoutButton from '../../components/gallery/SetLayoutButton';

export default class GalleryScreen extends React.Component {

    constructor() {
        super();

        this.loadImages = this.loadImages.bind(this);
        this.isFocused = this.isFocused.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.restoreImages = this.restoreImages.bind(this);

        this.state = {
            userToken: null,
            images: [],
            layout: 'oneColumn',
            refreshControl: false
        }
    }

    render() {
        const { images, userToken, layout, refreshControl } = this.state;
        return (
            <View style={styles.container}>
                {(images.length === 0
                ? <DefaultBackground />
                : <ImagesList
                    images={images}
                    navigation={this.props.navigation}
                    loadImages={this.loadImages}
                    userToken={userToken}
                    editDescription={this.editDescription}
                    layout={layout}
                    refreshControl={refreshControl}
                />)}

                <AddImageButton
                    onPressHandler={() => {this.props.navigation.navigate('AddImageScreen')}}
                />
            </View>
        );
    }

    componentDidMount() {
        this.restoreToken();
        this.restoreImages();
        this.props.navigation.setOptions({
            title: 'Galeria',
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        width: 70,
                        justifyContent: 'space-between',
                        marginRight: 30
                    }}
                >
                    <SetLayoutButton 
                        layout='twoColumns'
                        onPressHandler={() => {
                            this.setState({ layout: 'twoColumns' });
                        }}
                    />
                    <SetLayoutButton 
                        layout='oneColumn'
                        onPressHandler={() => {
                            this.setState({ layout: 'oneColumn' });
                        }}
                    />
                </View>
            )
        });

    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    isFocused() {
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            const { route } = this.props; // nie rób rektofaryzacji z tym u góru bo to musi byc tu
            if(typeof route.params !== 'undefined') {
                if(route.params.deleted) {
                    const filteredImages = this.state.images.filter(item => item.id !== route.params.deleted);
                    this.setState({ images: filteredImages });
                }
                if(route.params.added) {
                    this.setState({ images: route.params.added.concat(this.state.images) });
                    this.props.navigation.setParams({ added: null });
                }
            }
            //this.loadImages();
        });
    }

    restoreToken = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userToken: userData.userToken });
        this.isFocused();
        this.loadImages();
    };

    restoreImages = async () => {
        const imagesInJson = await AsyncStorage.getItem('galleryImages');
        const imagesData = JSON.parse(imagesInJson);
        if(!imagesData) return;
        this.setState({ images: imagesData });
    }

    loadImages() {
        this.setState({ refreshControl: true });
        //loading images
        const { userToken } = this.state;
        fetch(apiUrl + 'load-gallery', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userToken
            })
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
            if(responseJson.gallery_images.length > 0) {
                this.setState({ images: responseJson.gallery_images });
                //save in asyncstorage
                await AsyncStorage.setItem('galleryImages', JSON.stringify(responseJson.gallery_images));
            }
            this.setState({ refreshControl: false });
        })
        .catch((error) => {
            this.setState({ refreshControl: false });
            throw (error);
        });
    }

    //when adding image
    setDescription(description) {
        this.setState({ addingImageDescription: description })
    }

    //editDescription
    editDescription(description, imageId) {
        const itemIndex = this.state.images.findIndex(item => item.id === imageId);
        let images = this.state.images;
        images[itemIndex].description = description;
        fetch(apiUrl + 'update-description', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageId: imageId,
                description: description,
                api_token: this.state.userToken
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ images: images });            
        })
        .catch((error) => {
            alert('Something went wrong.');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});