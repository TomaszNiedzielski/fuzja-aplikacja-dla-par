import * as React from 'react';
import { Image, View, AsyncStorage, Dimensions, StyleSheet } from 'react-native';

import imageAddingManagement from '../../../constans/ImageAddingManagement';

import SaveButton from '../../components/header/SaveButton';
import Loader from '../../components/loaders/Loader';

export default class ChangeAvatarScreen extends React.Component {
    state = {
        image: null,
        result: {},
        userToken: null,
        loaderVisible: false,
    };

    render() {
        let { image, loaderVisible, uploadProgress } = this.state;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>
                {loaderVisible === true && <Loader />}
            </View>
        );
    }

    componentDidMount() {
        imageAddingManagement.getPermissionAsync();
        imageAddingManagement.pickImage([1, 1], this.whenPickedImageSuccessfully, this.whenPickingImageFailed);

        this.restoreToken();
        this.props.navigation.setOptions({
            title: "Zmień zdjęcie profilowe",
            headerRight: () => (
                <SaveButton
                    saveHandler={() => imageAddingManagement.uploadImage('avatar', this.state.result, this.state.userToken, 'set-avatar-image', this.beforeUpload, this.afterUpload, this.catchError)}
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
        this.props.navigation.navigate("Chat", {
            added: addedImages.avatar
        });
    }

    catchError = () => {
        this.setState({ loaderVisible: false });
        alert('Something went wrong.');
    }
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width - 10,
        height: Dimensions.get('window').width - 10,
        borderRadius: 360
    }
});