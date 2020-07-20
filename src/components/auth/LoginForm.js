import React, { useState } from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import Input from './Input';
import SignButton from './SignButton';
import { apiUrl } from '../../../constans/apiUrl';

const LoginForm = props => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loadingButton, setLoadingButton] = useState(false);

    const login = () => {
        if(!email || !password) {
            Alert.alert(
                'Error',
                'Wypełnij wszystkie pola.'
            );
            return;
        }
        setLoadingButton(true); // make button loading
        fetch(apiUrl+'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
            setLoadingButton(false);
            if(responseJson.error === 'invalid_credentials') {
                Alert.alert(
                    'Error',
                    'E-mail lub hasło są nie poprawne.',
                )
                return;
            }
            const userData = {
                userId: responseJson.user.id,
                userName: responseJson.user.name,
                userEmail: responseJson.user.email,
                partnerId: responseJson.user.partner_id,
                userToken: responseJson.token
            };

            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            props.changeLocation.replace('Loading'); // replace doesnt work with RootNavigation
        })
        .catch((error) => {
            setLoadingButton(false);    
            Alert.alert(
                'Error',
                'Sprawdź czy masz połączenie z internetem',
            )      
            throw(error);
        });
    }
    
    return (
        <View style={ styles.container }>
            <Input
                placeholder="e-mail"
                onChangeTextHandler={setEmail}
                autoCompleteType="email"
                keyboardType="email-address"
                autoCapitalize="none"                
            />
            <Input
                placeholder="hasło"
                onChangeTextHandler={setPassword}
                secureTextEntry={true}
            />
            <SignButton 
                title="zaloguj się"
                loadingButton={loadingButton}
                setLoadingButtonHandler={setLoadingButton}
                onPressHandler={login}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});

export default LoginForm;