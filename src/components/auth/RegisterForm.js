import React, { useState } from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import Input from './Input';
import SignButton from './SignButton';
import { apiUrl } from '../../../constans/apiUrl';

const RegisterForm = props => {
    const [name, setName] = useState();    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loadingButton, setLoadingButton] = useState(false);

    const signup = () => {
        if(!name || !email || !password) {
            Alert.alert(
                'Error',
                'Wypełnij wszystkie pola.'
            );
            return;
        }
        setLoadingButton(true);
        fetch(apiUrl+'register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password
            }),
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
            setLoadingButton(false);
            if(!responseJson.user) {
                let error;
                if(responseJson.email) {
                    //error = responseJson.email[0];
                    error = 'Twój adres e-mail jest nie poprawny lub został zajęty.'
                } else if(responseJson.password) {
                    //error = responseJson.password[0];
                    error = 'Twoje hasło powinno mieć minimum 6 znaków.'
                }
                Alert.alert(
                    'Error',
                    error
                );
                return;
            }
            const userData = {
                userId: responseJson.user.id,
                userName: responseJson.user.name,
                userEmail: responseJson.user.email,
                userToken: responseJson.token
            };

            //save to storage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            props.changeLocation.replace('Loading');
        })
        .catch((error) => {
            setLoadingButton(false);    
            Alert.alert(
                'Error',
                'Sprawdź czy masz połączenie z internetem.',
            );
            throw(error);
        });
        
    }
    
    return (
        <View style={ styles.container }>
            <Input
                placeholder="imię"
                onChangeTextHandler={setName}
            />
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
                autoCapitalize="none"                
            />
            <SignButton
                title="zarejestruj się"
                loadingButton={loadingButton}
                setLoadingButtonHandler={setLoadingButton}
                onPressHandler={signup}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});

export default RegisterForm;