import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, AsyncStorage, YellowBox, Vibration, Platform, AppState, Keyboard, Dimensions, Alert } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar, Composer, MessageImage, Avatar, Time } from 'react-native-gifted-chat';
import { apiUrl } from '../../constans/apiUrl';
import Pusher from 'pusher-js/react-native';
import { Ionicons } from '@expo/vector-icons';

import NetInfo from "@react-native-community/netinfo";
import InternetConnection from '../components/alerts/InternetConnection';

import ChatHeader from '../components/chat/ChatHeader';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { Notifications } from 'expo';

import moment from "moment";
import 'moment/locale/pl';
import colors from '../../constans/colors';
import { LinearGradient } from 'expo-linear-gradient';
import 'dayjs/locale/pl';

export default class ChatScreen extends React.Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Possible Unhandled']); 

        this.loadUnreadMessages = this.loadUnreadMessages.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.isFocused = this.isFocused.bind(this);
        this.renderComposer = this.renderComposer.bind(this);
        this.pickImage = this.pickImage.bind(this);

        this.subscribePushNotifications = this.subscribePushNotifications.bind(this);
        this.listenIfPartnerIsActive = this.listenIfPartnerIsActive.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.checkAppState = this.checkAppState.bind(this);
    }

    state = {
        userData: {},
        partnerData: {},
        messages: [],
        messagesPagination: 0,
        loadingMessages: false,
        noMoreMessages: false,
        isConnected: null,
        sendImageResult: {},
        isLoading: true,
        expoPushToken: '',
        notification: {},
        partnerActivity: null,
        PartnerIsTyping: false,
        lastMessageTyping: null,
        scrollIsCloseToTop: false
    }

    render() {
        const { noMoreMessages, isConnected, messages, loadingMessages, isLoading, partnerActivity } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white'}}>
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: 'center' }}
                behavior={ Platform.OS === "ios" ? 'padding' : 'height' }
            >
                <ChatHeader
                    active={partnerActivity}
                    navigation={this.props.navigation}
                />
                <GiftedChat
                    messages={messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.userData.userId,
                    }}
                    listViewProps={{
                        scrollEventThrottle: 400,
                        onScroll: ({ nativeEvent }) => { if (this.isCloseToTop(nativeEvent)) {
                            this.setState({ scrollIsCloseToTop: true });
                            this.loadMessages();
                        }},
                        backgroundColor: '#fff',
                        marginBottom: 20
                    }}
                    renderSend={this.renderSend}
                    isLoadingEarlier={isLoading}
                    loadEarlier={isLoading}
                    renderBubble={this.renderBubble}
                    renderInputToolbar={this.renderInputToolbar}
                    renderComposer={this.renderComposer}
                    renderMessageImage={this.renderMessageImage}
                    renderTime={this.renderTime}
                    onLongPress={this.onLongPress}
                    renderFooter={this.renderFooter}
                    onInputTextChanged={this.onInputTextChanged}
                    locale={moment.locale('pl')}
                />
                {isConnected === false && <InternetConnection/>}
            </KeyboardAvoidingView>
            </View>
        );
    }

    renderFooter() {
        // check if message was seen
        const lastMessage = this.state.messages[0];
        if(!lastMessage) return null;
        let seen = false;
        if(lastMessage.user._id === this.state.userData.userId) { // if this message belong to user
            if(lastMessage.read === 1) {
                seen = true;
            }
        }

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {this.state.PartnerIsTyping && 
                    <Text style={{ marginLeft: 12, color: '#a1a1a1'}}>{this.state.partnerData.partnerName} pisze...</Text>}
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    {seen &&
                    <Text style={styles.seen}>wyświetlono</Text>}
                </View>
            </View>
        );
    
    }

    onInputTextChanged() {
        const { userToken } = this.state.userData;

        // get time of last typing
        const { lastMessageTyping } = this.state;
        const currentTime = new Date();
        if(lastMessageTyping === null) {
            this.setState({ lastMessageTyping: currentTime });
            return;
        }
        const diff = (currentTime - lastMessageTyping)/1000; // it's good because we need posibly fresh time
        if(diff > 9) {
            // set time of current typing
            this.setState({ lastMessageTyping: currentTime });
            fetch(apiUrl+'user-is-typing-message', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: userToken,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                
            })
            .catch((error) => {
                throw(error);
            });
        }
    }

    async componentDidMount() {
        this.restoreUserData();
        this.getPermissionAsync();

        this.registerForPushNotificationsAsync();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);

        //listen for app state
        this.checkAppState();

    }
    
    checkAppState() {
        this.handleAppStateChange = (state) => {
            if(state === 'active') {
                this.loadUnreadMessages();
            }
        }
        
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        this.partnerChannel.unbind();
        this.channel.unbind();
        this.pusher.unsubscribe(this.channel);
        this.pusher.disconnect();
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    restoreUserData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        //restore partner data
        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);

        this.setState({ userData: userData, partnerData: partnerData });

        this.loadMessages();
        this.subscribeToPusher();
        this.checkInternetConnection();
        this.isFocused();
        this.listenIfPartnerIsActive();
    };

    isFocused() {
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            this.loadUnreadMessages();
        });
    }

    checkInternetConnection = () => {
        const handleFirstConnectivityChange = (isConnected) => {
            this.setState({ isConnected: isConnected });
            if(isConnected && this.props.navigation.isFocused() && AppState.currentState === 'active') {
                if(this.state.messages.length === 0) {
                    this.loadMessages();
                } else {
                    this.loadUnreadMessages();
                }
                if(this.state.scrollIsCloseToTop === true) {
                    this.loadMessages();
                }
            }
        }
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);
    }

    isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToTop = 80;
        return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
    }

    loadMessages = () => {
        const { messagesPagination, loadingMessages, noMoreMessages } = this.state;
        const { userToken } = this.state.userData;

        if(!userToken) return;
        if(loadingMessages === true) return; // if messages are loading right now - stop function
        if(noMoreMessages === true) return;

        this.setState({ loadingMessages: true });
        fetch(apiUrl+'load-messages', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userToken,
                messagesPagination: messagesPagination
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            const concatenatedMessages = GiftedChat.prepend(this.state.messages, responseJson);
            // remove duplicates if exists
            const uniqueMessages = Array.from(new Set(concatenatedMessages.map(a => a._id)))
                .map(_id => {
                    return concatenatedMessages.find(a => a._id === _id)
                });

            this.setState({
                messages: uniqueMessages,
                messagesPagination: this.state.messagesPagination + 1,
                loadingMessages: false,
                noMoreMessages: responseJson.length === 0 ? true : false
            });

            if(responseJson.length === 0) {
                this.setState({ isLoading: false });
            }
            if(this.state.messages.length < 15 && this.state.messagesPagination === 1) {
                this.setState({ isLoading: false });
            }

            this.setState({ scrollIsCloseToTop: true });

        })
        .catch((error) => {
            this.setState({ loadingMessages: false });       
        });
    }

    loadUnreadMessages = () => {
        const { userToken } = this.state.userData;
        if(!userToken) return;
        fetch(apiUrl+'load-unread-messages', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_token: userToken
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.length === 0) return;

            const concatenatedMessages = GiftedChat.append(this.state.messages, responseJson);

            // remove duplicates if exists
            const uniqueMessages = Array.from(new Set(concatenatedMessages.map(a => a._id)))
                .map(_id => {
                    return concatenatedMessages.find(a => a._id === _id)
                });

            this.setState({ messages: uniqueMessages });
        })
        .catch((error) => {
            throw(error);
        });
    }

    sendMessage = message => {
        const { userToken, userId } = this.state.userData;
        fetch(apiUrl+'create-message', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userToken,
                userId: userId,
                message: message[0].text
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let messages = this.state.messages;
            const updateToSentMessages = messages.map(function(item) {
                if(item._id === message[0]._id) {
                    delete item.sent;
                }
                return item;                
            });
            this.setState({ messages: updateToSentMessages });
        })
        .catch((error) => {
            // remove message from array
            let messages = this.state.messages;
            const removeErrorMessage = messages.filter(function(item) {
                if(item._id !== message[0]._id) {
                    return item;
                }
            });
            this.setState({ messages: removeErrorMessage }); 
        });
    }

    onSend = (newMessage = []) => {
        let newMessageNotSent = newMessage;
        newMessageNotSent[0].sent = false;
        this.setState({ messages: GiftedChat.append(this.state.messages, newMessageNotSent) });
        this.sendMessage(newMessage);
    };

    markMessagesAsRead() {
        const { userToken } = this.state.userData;        
        fetch(apiUrl+'mark-messages-as-read', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userToken
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
        })
        .catch((error) => {
            throw(error);
        });
    }

    subscribeToPusher() {
        const { userId, userToken } = this.state.userData;
        
        this.pusher = new Pusher('4397a9033571317d5522', {
            authEndpoint: apiUrl+'broadcasting-auth',
            cluster: 'eu',
            forceTLS: true,
            auth: {
                headers: {
                    Authorization: 'Bearer '+userToken
                }
            }
        });

        this.channel = this.pusher.subscribe('presence-chat.'+userId);
        this.channel.bind('NewMessageEvent', function(data) {
            if(this.props.navigation.isFocused() && AppState.currentState === 'active') {
                this.setState({ messages: GiftedChat.append(this.state.messages, data), PartnerIsTyping: false });
                this.markMessagesAsRead();
            }
        }.bind(this));

        // show typing indication
        let timer;
        this.channel.bind('PartnerIsTypingMessage', function(data) {
            if(this.props.navigation.isFocused() && AppState.currentState === 'active') {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.setState({ PartnerIsTyping: false });
                }, 10000);

                this.setState({ PartnerIsTyping: true }); 
            }           
        }.bind(this));

        // listen if sent messages have been read
        this.channel.bind('MarkMessagesAsReadEvent', function(data) {
            const { messages } = this.state;
            if(messages.length === 0) return;
            let updatedObject = messages.shift(); // return first element and remove it
            
            delete updatedObject.sent;

            updatedObject.read = 1;
            messages.unshift(updatedObject);

            //this.setState({ messages: [] });

            this.setState({ messages: messages })  // tutaj są błedy i sie rozpierdala
        }.bind(this));
    }

    listenIfPartnerIsActive() {
        const { userToken, partnerId } = this.state.userData;

        this.pusher = new Pusher('4397a9033571317d5522', {
            authEndpoint: apiUrl+'broadcasting-auth',
            cluster: 'eu',
            forceTLS: true,
            auth: {
                headers: {
                    Authorization: 'Bearer '+userToken
                }
            }
        });

        this.partnerChannel = this.pusher.subscribe('presence-chat.'+partnerId);
        this.partnerChannel.bind('pusher:subscription_succeeded', function(members) {
            const isPartnerConnected = members.get(partnerId);
            if(isPartnerConnected) {
                this.setState({ partnerActivity: true });
            }
        }.bind(this));

        this.partnerChannel.bind('pusher:member_added', function(member) {
            if(member.id === partnerId) {
                this.setState({ partnerActivity: true });                
            }
        }.bind(this));

        this.partnerChannel.bind('pusher:member_removed', function(member) {
            this.setState({ partnerActivity: false });            
        }.bind(this));
    }

    renderSend(props) {
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <Send
                    {...props}
                    containerStyle={{
                        flex: 1, marginLeft: 10, justifyContent: 'center'
                    }}
                >
                    <View style={{  }}>
                        <Ionicons name="md-send" size={30} color={colors.primary} />                   
                    </View>
                </Send>
            </View>
        );
    }

    renderBubble(props) {
        const { currentMessage } = props;
        const { messages } = this.state;
        //const currentIndex = this.state.messages.findIndex(message => message._id === currentMessage._id);
        //const nextIndex = currentIndex-1;
        //let Date;

        /*if(messages[nextIndex]) {
            if(currentMessage.user._id !== messages[nextIndex].user._id) {
                if(currentMessage.user._id === this.state.userData.userId) {
                    Date = () => <View style={{ flex: 1, justifyContent: 'flex-end' }}><Text style={{ fontSize: 9, color: '#b2b2b2', textAlign: 'right', marginRight: 5 }}>{moment(props.currentMessage.createdAt).format('LT')}</Text></View>;
                } else {
                    Date = () => <View style={{ flex: 1, justifyContent: 'flex-end' }}><Text style={{ fontSize: 9, color: '#b2b2b2', textAlign: 'left', marginLeft: 5 }}>{moment(props.currentMessage.createdAt).format('LT')}</Text></View>;            
                }
            } else {
                Date = () => <View style={{ flex: 1, justifyContent: 'flex-end' }}></View>
            }
        } else {
            Date = () => <View style={{ flex: 1, justifyContent: 'flex-end' }}></View>
            
        }*/
        

        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/*currentMessage.user._id === this.state.userData.userId && <Date />*/}
                <View style={{ flexDirection: 'row' }}>
                    <Bubble {...props}
                        containerStyle={{
                            left: {
                                //backgroundColor: 'yellow',
                                flexDirection: 'row'
                            },
                            right: {
                                alignSelf: 'flex-end',
                                
                            }
                        }}
                        wrapperStyle={{
                            left: {
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: '#e3e3e3',
                                maxWidth: Dimensions.get('window').width*70/100,
                            },
                            right: {
                                backgroundColor: colors.primary,
                                maxWidth: Dimensions.get('window').width*70/100,
                                
                            }
                        }}
                        textStyle={{
                            left: {
                                color: "black",
                                fontSize: 15
                            },
                            right: {
                                color: "white",
                                fontSize: 15
                            }
                        }}
                    />
                    { currentMessage.sent !== undefined && <Ionicons name="md-send" size={17} color={colors.primary} style={{ paddingLeft: 5 }} /> }
                </View>
                {/*currentMessage.user._id !== this.state.userData.userId && <Date />*/}               
            </View>
        );
    }

    renderTime(props) {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    right: {
                        display: 'none'
                    },
                    left: {
                        display: 'none'
                    }
                }}
            />
        );
    }

    renderInputToolbar (props) {
        return (
            <View style={{ width: '100%', position: 'absolute', bottom: 7, marginTop: 4}}>
                <InputToolbar 
                    {...props}
                    containerStyle={{
                        marginHorizontal: 12,
                        borderTopWidth: 0,
                        backgroundColor: '#f2f2f2',
                        borderRadius: 30,
                        paddingHorizontal: 15,
                        paddingVertical: 3,
                    }}
                />
            </View>
        );
    }

    renderComposer(props) {
        return (
            <View style={{
                width: '87%',
                justifyContent: 'center'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Ionicons
                        name="ios-image"
                        size={30}
                        color={colors.primary}
                        style={styles.addImageIcon}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.pickImage();
                        }}
                    />
                    <Composer
                        {...props}
                        placeholderTextColor='gray'
                        placeholder='Napisz wiadomość...'
                        textInputStyle={{
                            backgroundColor: '#f2f2f2',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            color: 'black'
                        }}
                    />
                </View>
            </View>
        );
    }

    renderMessageImage(props) {
        return (
            <MessageImage
                {...props}

            />
        );
    }

    renderAvatar(props) {
        return (
            <Avatar 
                {...props}
                
            />
        );
    }

    //send image
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            //mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            //aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({
                sendImageResult: result
            });
            this.sendImage();
        }
    };

    // upload
    sendImage = async () => {
        const { sendImageResult, userData } = this.state;

        let formData = new FormData();
        let extension = sendImageResult.uri.split('.').pop();
        let imgDetails = {};
        if (extension === 'png') {
            imgDetails = {
                name: "chat.png",
                type: "image/png",
            }
        } else {
            imgDetails = {
                name: "chat.jpg",
                type: "image/jpeg",
            }
        }

        let photo = sendImageResult;
        formData.append("photo", {
            ...imgDetails,
            uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
        formData.append("api_token", userData.userToken);

        // add to messages list
        const randomId = /*await Random.getRandomBytesAsync(16);*/new Date().getMilliseconds();
        const newMessage = {
            _id: randomId,
            createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            from: this.state.userData.userId,
            image: photo.uri,
            read: 0,
            text: null,
            sent: false,
            user: {
                _id: userData.userId,
                name: userData.userName,
            },
        }
        this.setState({ sendImageResult: {}, messages: GiftedChat.append(this.state.messages, newMessage) });

        fetch(apiUrl + 'send-image', {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let messages = this.state.messages;
            const updateToSentMessages = messages.map(function(item) {
                if(item._id === randomId) {
                    delete item.sent;
                }
                return item;
            });
            this.setState({ messages: updateToSentMessages });
        })
        .catch((error) => {
            this.setState({
                sendImageResult: {}
            });

            // remove image from array
            let messages = this.state.messages;
            const removeErrorImage = messages.filter(function(item) {
                if(item._id !== randomId) {
                    return item;
                }
            });
            this.setState({ messages: removeErrorImage });            

            alert('Something went wrong.');
        });
    }

    // push notifications
    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync();
            this.subscribePushNotifications(token);
            this.setState({ expoPushToken: token });
        } else {
            //alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chat-messages', {
                name: 'chat-messages',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    subscribePushNotifications(expoToken) {
        fetch(apiUrl+'exponent/devices/subscribe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.state.userData.userToken,
                expo_token: expoToken
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
        })
        .catch((error) => {
            alert(error);
            throw(error);
        });
    }

    _handleNotification = async notification => {
        if(this.props.navigation.isFocused() && AppState.currentState === 'active') {
            Notifications.dismissNotificationAsync(notification.notificationId);
        } else {
            if(AppState.currentState !== 'active') {
                Vibration.vibrate();
            }
            this.setState({ notification: notification });
        }
    };

}

const styles = StyleSheet.create({
    seen: {
        alignSelf: 'flex-end',
        color: '#a1a1a1',
        marginRight: 12,
        fontSize: 13
    },
    addImageIcon: {
        //marginTop: 8,
        alignSelf: 'center',
        marginLeft: 7
    }
});