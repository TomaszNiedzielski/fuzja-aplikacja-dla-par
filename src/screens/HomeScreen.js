import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage, Image, Modal } from 'react-native';
import { apiUrl, apiImage } from '../../constans/apiUrl';
import { Ionicons } from '@expo/vector-icons';

import LogoutButton from '../components/auth/LogoutButton';
import desktop from '../../assets/desktop.png';

import moment from "moment";
import 'moment/locale/pl';

import colors from '../../constans/colors';

import Widget from '../components/home/Widget';
import MessageHeart from '../components/home/MessageHeart';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import * as RootNavigation from '../../navigation/RootNavigation';

import NewAppVersionInfo from '../components/alerts/NewAppVersionInfo';

export default class HomeScreen extends React.Component {

    constructor() {
        super();

        this.hideMessageHeart = this.hideMessageHeart.bind(this);
    }

    state = {
        userData: {},
        partnerData: {},
        desktopBackgroundName: null,
        messageHeart: false,
        dates: [],
        newVersionInfoModal: false
    };

    render() {
        const { userName } = this.state.userData;
        const { partnerName } = this.state.partnerData;
        const { navigation } = this.props;
        const { desktopBackgroundName, messageHeart, dates, newVersionInfoModal } = this.state;

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
                    <Text style={[styles.homeText, styles.usersNames]}>{userName} </Text>
                    <TouchableNativeFeedback
                        onPress={() => {
                            this.setState({ messageHeart: true });
                            setTimeout(this.hideMessageHeart, 2000);
                        }}
                    >
                        <View style={{padding: 3}}>
                            <Ionicons name="ios-heart" size={23} color="red" style={styles.heart}/>
                        </View>
                    </TouchableNativeFeedback>
                    <Text style={[styles.homeText, styles.usersNames]}> {partnerName}</Text>
                </View>
                {
                    dates !== [] &&
                        dates.map(date => {
                            if(date.id === 1 && date.showOnDesktop === true) {
                                return (
                                    <View key={date.id}>
                                        <Text style={[styles.homeText, styles.dateText]}>{moment(dates[0].date, "DD-MM-YYYY").fromNow(true) } razem</Text>
                                    </View>
                                );
                            }
                        })
                }
                
                <View style={{ position: 'absolute', bottom: 20, flexDirection: 'row', width: '100%', marginTop: 20, flexWrap: 'wrap' }}>
                    {
                        dates !== [] &&
                        dates.map(date => {
                            if(date.id === 1) return;
                            if(date.showOnDesktop === true && date.date !== null) {
                                return (
                                    <Widget
                                        key={date.id}
                                        id={date.id}
                                        date={date.date}
                                        title={date.title}
                                    />
                                )
                            }
                        })
                    }
                    
                </View>

                {messageHeart && <MessageHeart />}

                {newVersionInfoModal &&
                <NewAppVersionInfo />}

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
            this.restoreInfo();
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
        this.checkIfAppIsStillFree();   
        this.checkIfNewVersionIsAvailable();     
        this.restoreInfo();        
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

    async restoreInfo() {
        let dates = await AsyncStorage.getItem('dates');
        if(dates) {
            dates = JSON.parse(dates);
            this.setState({ dates: dates });
        } else {
            fetch(apiUrl + 'get-dates-json', {
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
                if(responseJson[0].dates.length) {
                    const dates = JSON.parse(responseJson[0].dates);
                    this.setState({ dates: dates });
                    await AsyncStorage.setItem('dates', JSON.stringify(dates));
                }
            })
            .catch((error) => {
    
            });
        }
        
    }

    hideMessageHeart() {
        this.setState({ messageHeart: false });
    }


    checkIfAppIsStillFree() {
        
        fetch(apiUrl + 'check-status-of-payments', {
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
        .then((responseJson) => {
            if (responseJson.status == 'pay') {
                RootNavigation.navigate('PaymentScreen');
            }
        })
        .catch((error) => {});
    }

    checkIfNewVersionIsAvailable() {
        fetch(apiUrl + 'check-if-new-version-is-available', {
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
        .then((responseJson) => {
            if(responseJson.info) {
                this.setState({ newVersionInfoModal: true });
            }
        })
        .catch((error) => {});
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    desktopBackground: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    usersNamesContainer: {
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'row'
    },
    homeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    usersNames: {
        fontSize: 24
    },
    dateText: {
        fontSize: 15,
        color: 'white',
        marginTop: 5,
        alignSelf: 'center'
    },
    heart: {
        alignSelf: 'center',
    }
});