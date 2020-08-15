import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import colors from '../../../constans/colors';
import { apiUrl } from '../../../constans/apiUrl';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import * as RootNavigation from '../../../navigation/RootNavigation';

export default class ChatHeader extends React.Component {

    constructor() {
        super();

        this.restoreUserData = this.restoreUserData.bind(this);
        this.restorePartnerName = this.restorePartnerName.bind(this);
        this.loadCouplesAvatars = this.loadCouplesAvatars.bind(this);
    }
    
    state = {
        partnerName: null,
        active: null,
        userData: {},
        partnerAvatar: null,
        userAvatar: null,
        loadingPartnerAvatar: null,
        loadingUserAvatar: null
    }

    render() {
        const { partnerName, partnerAvatar, userAvatar, loadingPartnerAvatar, loadingUserAvatar } = this.state;
        return (
            <LinearGradient
                colors={colors.gradient}
                style={styles.container}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={styles.wrapper}>
                    <View style={styles.partnerInfo}>
                        <View style={styles.avatarWrapper}>
                            {partnerAvatar ? 
                            <Image
                                source={{
                                    uri: partnerAvatar
                                }}
                                style={styles.avatar}
                                onLoadStart={(e) => this.setState({ loadingPartnerAvatar: true })}
                                onLoadEnd={() => this.setState({ loadingPartnerAvatar: false })}
                            /> :
                            <FontAwesome5 name="user-alt" size={20} color="white" />}

                            {this.props.active === true &&
                                <View style={{
                                    height: 14,
                                    width: 14,
                                    backgroundColor: 'green',
                                    position: 'absolute',
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 7,
                                    right: -5,
                                    bottom: -3
                                }}></View>
                            }

                            {loadingPartnerAvatar &&
                                <ActivityIndicator color='white' size={17} />
                            }
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.name}>{partnerName} </Text>
                            <Text style={styles.activity}>{this.props.active === true ? 'aktywny(a) teraz' : 'offline'}</Text>                    
                        </View>
                    </View>
                    <TouchableNativeFeedback
                        onPress={() => {
                            RootNavigation.navigate('ChangeAvatar');                            
                        }}
                    >
                        <View style={styles.avatarWrapper}>
                            {userAvatar ? 
                            <Image
                                source={{
                                    uri: userAvatar
                                }}
                                style={styles.avatar}
                                onLoadStart={(e) => this.setState({ loadingUserAvatar: true })} 
                                onLoadEnd={() => this.setState({ loadingUserAvatar: false })}                                                       
                            /> : 
                            <FontAwesome5 name="user-alt" size={20} color="white" />}
                            {loadingUserAvatar &&
                                <ActivityIndicator color='white' size={17} />
                            }           
                        </View>
                    </TouchableNativeFeedback>  
                </View>
            </LinearGradient>
        );
    }

    componentDidMount() {
        if(this.state.active !== this.props.active) {
            this.setState({ active: this.props.active });
        }
        this.restorePartnerName();
        this.restoreUserData();
    }

    restoreUserData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userData: userData });

        this.isFocused();
        this.loadCouplesAvatars();
    };

    restorePartnerName = async () => {
        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);
        this.setState({ partnerName: partnerData.partnerName });
    }

    isFocused() {
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            this.loadCouplesAvatars();
        });
    }

    async loadCouplesAvatars() {
        const userAvatar = await AsyncStorage.getItem('userAvatar');
        const partnerAvatar = await AsyncStorage.getItem('partnerAvatar');
        this.setState({ userAvatar: userAvatar, partnerAvatar: partnerAvatar });
        fetch(apiUrl + 'get-couples-avatar-names', {
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
        .then(async(responseJson) => {
            if(responseJson.userAvatar) {
                this.setState({ userAvatar: responseJson.userAvatar.avatarName });
                await AsyncStorage.setItem('userAvatar', responseJson.userAvatar.avatarName);
            }
            if(responseJson.partnerAvatar) {
                this.setState({ partnerAvatar: responseJson.partnerAvatar.avatarName });
                await AsyncStorage.setItem('partnerAvatar', responseJson.partnerAvatar.avatarName);                
            }
        })
        .catch((error) => {

        });
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: 'white',
        padding: 10
    },
    wrapper: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        marginLeft: 10
    },
    activity: {
        color: 'white',
        letterSpacing: 0.5,
        fontSize: 12,
        fontWeight: 'bold'
    },
    avatar: {
        flex: 1,
        borderRadius: 360,
        width: '100%',
        height: '100%'
    },
    partnerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        height: 40,
        width: 40,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 360,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});