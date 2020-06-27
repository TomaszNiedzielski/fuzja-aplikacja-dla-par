import * as React from 'react';
import { Image, View, AsyncStorage, Platform } from 'react-native';

import imageAddingManagement from '../../../constans/ImageAddingManagement';

import SaveButton from '../../components/header/SaveButton';
import Loader from '../../components/loaders/Loader';

export default class ChangeDesktopScreen extends React.Component {
    state = {
        image: null,
        result: {},
        userToken: null,
        loaderVisible: false,
    };

    render() {
        let { image, loaderVisible } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />}
                </View>
                {loaderVisible === true && <Loader />}
            </View>
        );
    }

    componentDidMount() {
        imageAddingManagement.getPermissionAsync();
        imageAddingManagement.pickImage([3, 5], this.whenPickedImageSuccessfully, this.whenPickingImageFailed);

        this.restoreToken();
        this.props.navigation.setOptions({
            title: "Zmień tło pulpitu",
            headerRight: () => (
                <SaveButton
                    saveHandler={() => imageAddingManagement.uploadImage('desktop', this.state.result, this.state.userToken, 'set-desktop-background', this.beforeUpload, this.afterUpload, this.catchError)}
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

    afterUpload = async (addedImages) => {
        await AsyncStorage.setItem('desktopBackgroundName', JSON.stringify(addedImages.desktop_background_name));
        this.props.navigation.navigate("Home", {
            added: addedImages
        });
    }

    catchError = () => {
        this.setState({ loaderVisible: false });
        alert('Something went wrong.');
    }
    
}

