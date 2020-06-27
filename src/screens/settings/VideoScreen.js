import React from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { apiUrl } from '../../../constans/apiUrl';
//import { Video } from 'expo-av';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//import axios from 'axios';

export default class VideoScreen extends React.Component {

    state = {
        result: {},
        image: null,
        userToken: null,
        progress: 0
    }

    render() {
        const { progress } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
                <View style={{ height: 40, width: '100%', backgroundColor: 'white' }}>
                    <Text>{progress}%</Text>
                </View>
            </View>
        );
    }

    async componentDidMount() {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userToken: userData.userToken });

        this.getPermissionAsync();
        this.pickImage();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    pickImage = async () => {
        let result;
       
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });
        
    
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri, result: result });
            this.uploadImage('video', this.state.result, this.state.userToken, 'upload-video', this.beforeUpload, this.afterUpload, this.catchError);
        }
    };

    beforeUpload = () => {
        console.log('making upload');
    }

    afterUpload = () => {
        console.log('after upload');        
    }

    catchError = () => {
        console.log('catch error');
    }

    // upload
    uploadImage = async (name, result, userToken, endpoint, beforeUpload, afterUpload, catchError) => {
        console.log('upload');
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
                name: name + '.mp4',
                type: "video/mp4",
            }
        }

        let image = result;
        formData.append("photo", {
            ...imgDetails,
            uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
        });
        formData.append("api_token", userToken);
        console.log('upload1a')
        console.log(apiUrl + endpoint);

        /*axios.post(apiUrl + endpoint, formData, {
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", progressEvent);
                this.setState({ progress: Math.round( (progressEvent.loaded * 100) / totalLength ) });
            }
        })
        .then(function() {

        })*/

        /*fetch(apiUrl + endpoint, {
            method: 'POST',
            body: formData
        })
        .then((response) => response.text())
        .then((responseJson) => {
            afterUpload(responseJson);
        })
        .catch((error) => {
            catchError();
            console.log(error);
        });*/
    }


}

/*<Video
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                    style={{ flex:1 }}
                    useNativeControls={true}
                    orientation='landscape'
                    onReadyForDisplay={params => {
                        params.naturalSize.orientation = 'landscape';
                        console.log('params---->', params.naturalSize.orientation);
                    }}
                />*/