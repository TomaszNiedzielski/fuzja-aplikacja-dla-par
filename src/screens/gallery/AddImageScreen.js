import * as React from 'react';
import { Image, View, AsyncStorage, Dimensions, StyleSheet, TextInput } from 'react-native';

import SaveButton from '../../components/header/SaveButton';
import imageAddingManagement from '../../../constans/ImageAddingManagement';
import Loader from '../../components/loaders/Loader';

export default class AddImageScreen extends React.Component {

    constructor() {
        super();
        this.restoreToken = this.restoreToken.bind(this);
        this.whenPickedImageSuccessfully = this.whenPickedImageSuccessfully.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.afterUpload = this.afterUpload.bind(this);
    }

    state = {
        image: null,
        result: {},
        userToken: null,
        loaderVisible: false,
    };

    render() {
        const { image, result, loaderVisible, uploadProgress } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {image && <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width, height: result.height/(result.width/Dimensions.get('window').width) }} />}
                </View>
                {loaderVisible === true && <Loader />}
            </View>
        );
    }

    componentDidMount() {
        imageAddingManagement.getPermissionAsync();
        imageAddingManagement.pickImage([], this.whenPickedImageSuccessfully, this.whenPickingImageFailed);

        this.restoreToken();
        this.props.navigation.setOptions({
            title: "Dodawanie zdjęcia",
            headerRight: () => (
                <SaveButton
                    saveHandler={() => imageAddingManagement.uploadImage('gallery', this.state.result, this.state.userToken, 'add-image-to-gallery', this.beforeUpload, this.afterUpload, this.catchError)}
                />
            )
        });
    }

    restoreToken = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userToken: userData.userToken });
    };

    whenPickedImageSuccessfully = (result) => {
        this.setState({ image: result.uri, result: result });
    }

    whenPickingImageFailed = () => {
        this.props.navigation.goBack();
    }

    beforeUpload = () => {
        this.setState({ loaderVisible: true });
    }

    afterUpload = (addedImages) => {
        this.props.navigation.navigate("Gallery", {
            added: addedImages.gallery_images
        });
    }

    catchError = () => {
        this.setState({ loaderVisible: false });
        alert('Something went wrong.');
    }

}

const styles = StyleSheet.create({
    description: {
        padding: 20
    },
    descriptionInput: {
        fontSize: 15
    }
});