import React from 'react';
import { View, StyleSheet, Text, AsyncStorage, BackHandler, Dimensions } from 'react-native';

import AccessCodeKeyboard from '../components/settings/AccessCodeKeyboard';
import IncorrectCode from '../components/alerts/IncorrectCode';

export default class AccessCodeScreen extends React.Component {

    constructor() {
        super();

        this.checkSavedAccessCode = this.checkSavedAccessCode.bind(this);
        this.checkIfAccessSuccess = this.checkIfAccessSuccess.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    state = {
        savedAccessCode: '',
        code: '',
        IncorrectCodeAlertShow: false
    }

    render() {
        const { code, IncorrectCodeAlertShow } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeKey}>{code[0] ? '*' : ''}</Text>
                    <Text style={styles.codeKey}>{code[1] ? '*' : ''}</Text>
                    <Text style={styles.codeKey}>{code[2] ? '*' : ''}</Text>
                    <Text style={styles.codeKey}>{code[3] ? '*' : ''}</Text>                    
                </View>
                <AccessCodeKeyboard
                    pressedKey={(key) => {
                        if(code.length < 4) {
                            this.setState({ code: code+key });
                        }
                    }}
                    delete={() => {
                        this.setState({ code: code.substring(0, code.length - 1) });
                    }}
                />
                {IncorrectCodeAlertShow && <IncorrectCode />}
            </View>
        );
    }

    componentDidMount() {
        this.checkSavedAccessCode();
        this.props.navigation.setOptions({
            title: "Wpisz kod dostępu",
            headerLeft: null
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);        
    }

    handleBackButton(){
        BackHandler.exitApp();
        return true;
    }

    componentDidUpdate() {
        const { code } = this.state;        
        if(code.length === 4) {
            this.checkIfAccessSuccess();
        }
    }

    checkIfAccessSuccess() {
        const { savedAccessCode, code } = this.state;
        if(savedAccessCode === code) {
            this.props.navigation.goBack();
        } else {
            //code is wrong
            this.setState({ code: '', IncorrectCodeAlertShow: true });
            setTimeout(function(){
                this.setState({ IncorrectCodeAlertShow: false });                
            }.bind(this), 2000);
        }
    }

    checkSavedAccessCode = async () => {
        const accessCode = await AsyncStorage.getItem('accessCode');
        if(accessCode) {
            this.setState({ savedAccessCode: accessCode });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100
    },
    codeKey: {
        fontSize: 30,
        borderBottomWidth: 3,
        width: 50,
        margin: 10,
        textAlign: 'center'
    }
});