import React from 'react';
import { View, StyleSheet, Text, Dimensions, AsyncStorage } from 'react-native';

import AccessCodeKeyboard from '../../components/settings/AccessCodeKeyboard';
import SaveButton from '../../components/header/SaveButton';

import { apiUrl } from '../../../constans/apiUrl';
import colors from '../../../constans/colors';

export default class ChangeAccessCodeScreen extends React.Component {

    constructor() {
        super();

        this.saveAccessCodeInApi = this.saveAccessCodeInApi.bind(this);
        this.restoreData = this.restoreData.bind(this);
    }

    state = {
        code: '',
        userToken: null
    }

    render() {
        const { code } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeKey}>{code[0]}</Text>
                    <Text style={styles.codeKey}>{code[1]}</Text>
                    <Text style={styles.codeKey}>{code[2]}</Text>
                    <Text style={styles.codeKey}>{code[3]}</Text>                    
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
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: "Ustaw kod dostępu",
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },
            headerTintColor: 'white',
            headerRight: () => (
                <SaveButton
                    saveHandler={async() => {
                        if(this.state.code.length === 4) {
                            await AsyncStorage.setItem('accessCode', this.state.code);
                            this.saveAccessCodeInApi();
                            this.props.navigation.goBack();                            
                        }
                    }}
                    color="white"
                />
            )
        });

        this.restoreData();

    }

    restoreData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        this.setState({ userToken: userData.userToken });
    }

    saveAccessCodeInApi = async () => {
        const { code, userToken } = this.state;

        fetch(apiUrl + 'save-access-code', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userToken,
                access_code: code
            })
        })
        .then((response) => response.json())
        .then(async (responseJson) => {
        })
        .catch((error) => {

        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
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