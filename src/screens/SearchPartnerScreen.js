import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput, TouchableNativeFeedback } from 'react-native';

import { useSelector } from 'react-redux'
import { apiUrl } from '../../constans/apiUrl';

import Pusher from 'pusher-js/react-native';

const SearchPartner = props => {

    const [email, setEmail] = useState();
    const searchHandler = () => {
        fetch(apiUrl+'create-relationship', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: props.route.params.userData.userToken,
                email: email
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson === 'ok') {
                alert('Waiting for comfirmation...');
            } else {
                alert('This person is not available for you!');
            }
            //RootNavigation.navigate('Loading');
        })
        .catch((error) => {
            throw(error);
        });
    }

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('4397a9033571317d5522', {
        cluster: 'eu',
        forceTLS: true
    });

    var channel = pusher.subscribe('relationships.'+props.route.params.userData.userId);
    channel.bind('RelationshipEvent', function(data) {
        alert(JSON.stringify(data));
    });

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="type your's partner e-mail..."
                style={styles.input}
                onChangeText={text => setEmail(text)}
            />
            <TouchableNativeFeedback
                onPress={searchHandler}
            >
                <Text>Search</Text>
            </TouchableNativeFeedback>                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 18
    }
});

export default SearchPartner;