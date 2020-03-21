import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from './Input';
import SignButton from './SignButton';
import * as authActions from '../../../store/actions/auth';

const RegisterForm = props => {
    const [name, setName] = useState();    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    
    
    const dispatch = useDispatch();
    const signupHandler = () => {
        dispatch(authActions.signup(name, email, password));
    };

    return (
        <View style={ styles.container }>
            <Input
                placeholder="name"
                onChangeTextHandler={setName}
            />
            <Input
                placeholder="e-mail"
                onChangeTextHandler={setEmail}                
            />
            <Input
                placeholder="password"
                onChangeTextHandler={setPassword}                
            />
            <SignButton 
                title="sign up"
                onPressHandler={signupHandler}
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