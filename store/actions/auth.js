import { AsyncStorage } from 'react-native';
import { apiUrl } from "../../constans/apiUrl";
import * as RootNavigation from '../../navigation/RootNavigation';

export const  SIGN_UP = 'SIGN_UP';
export const  LOG_IN = 'LOG_IN';


export const signup = (name, email, password) => {
    return dispatch => {
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
        .then((responseJson) => {
            console.log(responseJson);

            const userData = {
                userId: responseJson.user.id,
                userName: responseJson.user.name,                
                userToken: responseJson.token
            };

            dispatch({ type: SIGN_UP, userData }); //save to redux
            //save to storage
            const saveUserData = async () => {
                try {
                    await AsyncStorage.setItem('userData', JSON.stringify({
                        userId: responseJson.user.id,
                        userName: responseJson.user.name,                        
                        userToken: responseJson.token
                    }));
                    console.log('zapisałem');
                } catch (error) {
                    // Error saving data
                }
            };
            saveUserData();
            RootNavigation.navigate('Loading');
        })
        .catch((error) => {
            throw(error);
        });
    }
}

export const login = (email, password) => {
    return dispatch => {
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
        .then((responseJson) => {
            console.log(responseJson);

            const userData = {
                userId: responseJson.user.id,
                userName: responseJson.user.name,
                userToken: responseJson.token
            };

            dispatch({ type: SIGN_UP, userData }); // here shoul be login but it works anyway
            //save to storage
            const saveUserData = async () => {
                try {
                    await AsyncStorage.setItem('userData', JSON.stringify({
                        userId: responseJson.user.id,
                        userName: responseJson.user.name,                        
                        userToken: responseJson.token
                    }));
                    console.log('zapisałem');
                } catch (error) {
                    // Error saving data
                }
            };
            saveUserData();
            RootNavigation.navigate('Loading');
        })
        .catch((error) => {
            throw(error);
        });
    }
}
