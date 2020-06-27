import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import AppName from '../../components/auth/AppName';

import Button from '../../components/auth/SwitchAuth';

import colors from '../../../constans/colors';

const AuthScreen = props => {
    const [sign, setSign] = useState('sign in');

    return (
        <LinearGradient
            colors={['rgba(247,106,63,1) 100%', 'rgba(252,95,52,1) 90%', 'rgba(248,40,45,1) 5%', '90deg, rgba(242,33,53,1) 0%']}
            style={ styles.container }
        >
            <TouchableWithoutFeedback
                onPress={ Keyboard.dismiss }
            >
                <KeyboardAvoidingView
                    style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    behavior={ Platform.OS === "ios" ? 'padding' : 'height' }
                    keyboardVerticalOffset={0}
                >
                    <View style={{ /*marginTop: 30,*/ width: '90%' }}>
                        <ScrollView
                            keyboardShouldPersistTaps='handled'
                            showsVerticalScrollIndicator={false}
                        >
                            <AppName />
                            <View style={ styles.switchWrapper }>
                                <View style={{ flexDirection: 'row', width: 220, justifyContent: 'space-between' }}>
                                    <Button
                                        title="sign in"
                                        text="logowanie"
                                        onPressHandler={setSign}
                                        sign={sign}
                                    />
                                    <Button
                                        title="sign up"
                                        text="rejestracja"
                                        onPressHandler={setSign}
                                        sign={sign}                            
                                    />
                                </View>
                            </View>
                            {(sign === 'sign in' 
                            ? <LoginForm 
                                changeLocation={props.navigation}
                            /> 
                            : <RegisterForm 
                                changeLocation={props.navigation}
                            />)}
                        </ScrollView>
                    </View>
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