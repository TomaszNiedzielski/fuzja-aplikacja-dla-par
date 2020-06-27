import { Button, Image, View, AsyncStorage, Modal, Dimensions, Platform } from 'react-native';
import React from 'react';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { apiUrl } from './apiUrl';
import colors from './colors';

class ImageAddingManagement extends React.Component {

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    pickImage = async (aspectRatio, whenPickedImageSuccessfully, whenPickingImageFailed) => {
        let result;
        if(aspectRatio.length === 0) {
            result = await ImagePicker.launchImageLibraryAsync({
                //mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                //mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: aspectRatio,
                quality: 1
            });
        }
    
        if (!result.cancelled) {
            whenPickedImageSuccessfully(result);
        } else {
            whenPickingImageFailed();
        }
    };

    // upload
    uploadImage = async (name, result, userToken, endpoint, beforeUpload, afterUpload, catchError) => {
        beforeUpload();
        let formData = new FormData();
        let extension = result.uri.split('.').pop();
        let imgDetails = {};
        if (extension === 'png') {
            imgDetails = {
                name: name + '.png',
                type: "image/png",
            }
        } else {
            imgDetails = {
                name: name + '.jpg',
                type: "image/jpeg",
            }
        }

        let image = result;
        formData.append("photo", {
            ...imgDetails,
            uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
        });
        formData.append("api_token", userToken);

        fetch(apiUrl + endpoint, {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            afterUpload(responseJson);
        })
        .catch((error) => {
            catchError();
        });
    }
}

const imageAddingManagement = new ImageAddingManagement();
export default imageAddingManagement;