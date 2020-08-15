import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
    TouchableNativeFeedback,
    Alert,
    YellowBox,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Platform,
    ScrollView
} from 'react-native';

import { apiUrl } from '../../../constans/apiUrl';
import { LinearGradient } from 'expo-linear-gradient';

import LogoutButton from '../../components/auth/LogoutButton';

import colors from '../../../constans/colors';

export default class SearchPartnerScreen extends React.Component {
    constructor() {
        super();
        this.searchHandler = this.searchHandler.bind(this);
    }

    state = {
        email: null,
        userData: null,
        requestProcessing: false
    };

    
    render() {
        const { email, requestProcessing } = this.state;
        return (
            <LinearGradient
                colors={colors.gradient}
                style={ styles.container }
            >
                <TouchableWithoutFeedback
                    onPress={ Keyboard.dismiss }
                >
                    <KeyboardAvoidingView
                        behavior={ Platform.OS === "ios" ? 'padding' : 'height' }
                        keyboardVerticalOffset={30}
                        style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
                    >
                        <View style={{ width: '80%' }}>
                            <ScrollView
                                contentContainerStyle={styles.scroll}
                                keyboardShouldPersistTaps='handled'
                            >
                                <View style={{marginTop: 40}} />
                                <Text style={[styles.title, {fontSize: 22, fontWeight: 'bold'}]}>Ostatni krok 2/2</Text>
                                <Text style={styles.title}>Poczekaj, aż twój partner założy konto w aplikacji. Następnie wymieńcie się podanymi przy rejestracji adresami e-mail, żeby się połączyć.</Text>
                                <TextInput
                                    placeholder="e-mail twojego partnera..."
                                    placeholderTextColor="white"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ email: text })}
                                    keyboardType="email-address"                                    
                                />

                                {email !== null && email.length > 0 && 
                                <TouchableNativeFeedback
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        this.searchHandler();
                                    }}
                                >
                                    <View style={styles.button}>
                                        {requestProcessing === false 
                                            ? <Text style={styles.buttonText}>połącz z partnerem</Text>
                                            : <ActivityIndicator color="white" />}
                                    </View>
                                </TouchableNativeFeedback>}
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
                <View style={styles.bottomBar}>
                    <LogoutButton style={{ color: 'white' }}/>
                </View>
            </LinearGradient>
        );
    };

    componentDidMount() {
        this.restoreToken();
    }

    restoreToken = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userData: userData });
    }

    searchHandler() {
        const { email, userData } = this.state;
        if(email === null) return;
        this.setState({ requestProcessing: true });
        fetch(apiUrl+'create-relationship', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userData.userToken,
                email: email
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            Keyboard.dismiss;            
            this.setState({ requestProcessing: false });            
            //alert(responseJson);
            if(responseJson.partner) {
                //We got connection with partner
                this.updateUserData(responseJson.partner.id);
            } else if(responseJson.status === 'waiting') {
                this.props.navigation.navigate('WaitingForPartner');
            } else {
                Alert.alert(
                    'Error',
                    responseJson.email[0]
                );
            }
        })
        .catch((error) => {
            throw(error);
        });
    }

    updateUserData = async partnerId => {
        try {
            const userDataInJson = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(userDataInJson);
            
            userData.partnerId = partnerId; // add partner id property
            await AsyncStorage.setItem('userData', JSON.stringify(userData)); //save updated object

            this.props.navigation.replace('Loading');
        } catch (error) {
            alert("Coś się zjebało.");
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        maxWidth: '100%',
        textAlign: 'center',
        marginTop: 30,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        padding: 8,
        color: 'white',
    },
    button: {
        width: '100%',
        height: 60,
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 50,
        marginVertical: 25,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    bottomBar: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        alignItems: 'flex-end'
    },
    title: {
        color: 'white',
        fontSize: 18,
    }
});