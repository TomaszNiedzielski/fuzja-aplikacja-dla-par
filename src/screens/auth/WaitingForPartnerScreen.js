import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, YellowBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../constans/colors';

import Pusher from 'pusher-js/react-native';

export default class WaitingForPartnerScreen extends React.Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.listenIfPartnerTypedEmail = this.listenIfPartnerTypedEmail.bind(this);
    }

    state = {
        userData: {}
    }

    render() {
        return (
            <LinearGradient
                colors={colors.gradient}
                style={styles.container}
            >
                <View style={{ elevation: 10, borderRadius: 20, padding: 30 }}>
                    <Text style={styles.info}>
                        Zaczekaj, aż twój partner wprowadzi Twój e-mail.
                        Wtedy zostaniesz przekierowany(a) do Twojego pulpitu. 
                        Jeżeli tak się nie stanie, spróbuj otworzyć aplikację ponownie.
                    </Text>
                    <Text style={{ marginTop: 20, color: '#e8e8e8', fontSize: 16  }} onPress={() => {this.props.navigation.navigate('SearchPartner')}}>Jeżeli wpisany e-mail jest niepoprawny kliknij tutaj, żeby wrócić.</Text>
                </View>
            </LinearGradient>
        );
    }

    componentDidMount() {
        this.restoreToken();
    }

    restoreToken = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userData: userData });
        
        this.listenIfPartnerTypedEmail();        
    }

    updateUserData = async partnerId => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        
        userData.partnerId = partnerId; // add partner id property
        await AsyncStorage.setItem('userData', JSON.stringify(userData)); //save updated object

        this.props.navigation.replace('Loading');
    }

    listenIfPartnerTypedEmail() {
        const { userData } = this.state;

        var pusher = new Pusher('4397a9033571317d5522', {
            cluster: 'eu',
            forceTLS: true
        });

        var channel = pusher.subscribe('relationships.'+userData.userId);
        channel.bind('RelationshipEvent', function(data) {
            const partnerId = data.partnerId;
            this.updateUserData(partnerId);
        }.bind(this));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    info: {
        fontSize: 18,
        textAlign: 'justify',
        color: '#e8e8e8'
    }
});