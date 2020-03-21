import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

import Button from '../components/auth/SwitchAuth';


const AuthScreen = props => {
    const [sign, setSign] = useState('sign in');

    return (
        <LinearGradient
            colors={['#FF0099', '#470027']}
            style={ styles.container }
        >
            <TouchableWithoutFeedback
                    onPress={ Keyboard.dismiss }
            >
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'center' }}
                    behavior={ Platform.OS === "ios" ? 'padding' : 'height' }
                    keyboardVerticalOffset={30}
                >
                    <View style={ styles.switchWrapper }>
                        <Button 
                            title="sign in"
                            onPressHandler={setSign}
                            sign={sign}
                        />
                        <Button
                            title="sign up"
                            onPressHandler={setSign}
                            sign={sign}                            
                        />
                    </View>
                    {(sign === 'sign in' ? <LoginForm /> : <RegisterForm />)}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    switchWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export default AuthScreen;