import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from './Input';
import SignButton from './SignButton';
import * as authActions from '../../../store/actions/auth';

const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();
    const loginHandler = () => {
        dispatch(authActions.login(email, password));
    };

    return (
        <View style={ styles.container }>
            <Input
                placeholder="e-mail"
                onChangeTextHandler={setEmail}                
            />
            <Input
                placeholder="password"
                onChangeTextHandler={setPassword}                
            />
            <SignButton 
                title="sign in"
                onPressHandler={loginHandler}
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