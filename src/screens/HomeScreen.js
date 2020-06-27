import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage, Image } from 'react-native';
import { apiUrl, apiImage } from '../../constans/apiUrl';
import { Ionicons } from '@expo/vector-icons';

import LogoutButton from '../components/auth/LogoutButton';
import desktop from '../../assets/desktop.png';

export default class HomeScreen extends React.Component {

    state = {
        userData: {},
        partnerData: {},
        desktopBackgroundName: null
    };

    render() {
        const { userName } = this.state.userData;
        const { partnerName } = this.state.partnerData;
        const { navigation } = this.props;
        const { desktopBackgroundName } = this.state;
        return (
            <View style={styles.container}>
                {desktopBackgroundName !== null ?
                <Image
                    style={styles.desktopBackground}
                    source={{ uri: apiImage + 'desktops/' + desktopBackgroundName }}
                /> : 
                <Image
                    style={styles.desktopBackground}
                    source={desktop}
                />
                }
                <View style={styles.usersNamesContainer}>
                    <Text style={styles.usersNames}>{userName} i {partnerName}</Text>
                </View>
            </View>

        );
    }

    componentDidMount() {
        this.restoreData();
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    isFocused() {
        this.props.navigation.addListener('focus', () => {
            this.loadDesktopBackground();
        });
    }

    restoreData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);

        this.setState({ userData: userData, partnerData: partnerData });

        this.loadDesktopBackground();
        this.isFocused();
    };

    loadDesktopBackground = async () => {
        let desktopBackgroundName;
        desktopBackgroundName = await AsyncStorage.getItem('desktopBackgroundName');
        desktopBackgroundName = JSON.parse(desktopBackgroundName);
        if (desktopBackgroundName === null) {
            fetch(apiUrl + 'get-desktop-background-name', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: this.state.userData.userToken
                })
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.desktop_background_name) {
                    desktopBackgroundName = responseJson.desktop_background_name;
                    this.setState({ desktopBackgroundName: desktopBackgroundName });
                    await AsyncStorage.setItem('desktopBackgroundName', JSON.stringify(desktopBackgroundName));
                }
            })
            .catch((error) => {
            });
        } else {
            this.setState({ desktopBackgroundName: desktopBackgroundName });
        }

    }

    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    desktopBackground: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    usersNamesContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    usersNames: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
});