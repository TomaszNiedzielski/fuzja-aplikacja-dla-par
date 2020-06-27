import React from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage, Keyboard } from 'react-native';
import { apiUrl } from '../../constans/apiUrl';
import colors from '../../constans/colors';

const LoadingScreen = props => {
    const restoreToken = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        const partnerData = await AsyncStorage.getItem('partnerData');
        if (userData !== null) {
            if (!userData.partnerId || partnerData === null) {
                // check in DB if partner accepted
                fetch(apiUrl+'check-partner-data', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token: userData.userToken
                    }),
                })
                .then((response) => response.json())
                .then(async(responseJson) => {
                    if(responseJson.partner_data) {
                        // add PartnerId in asyncstorage
                        userData.partnerId = responseJson.partner_data.id;
                        await AsyncStorage.setItem('userData', JSON.stringify(userData));
                        //create partner object
                        await AsyncStorage.setItem('partnerData', JSON.stringify({
                            partnerId: responseJson.partner_data.id,
                            partnerName: responseJson.partner_data.name,
                            partnerEmail: responseJson.partner_data.email
                        }));
                        props.navigation.replace('NavigatorScreen'); // it's home
                    } else {
                        if(responseJson.userHasTypedPartnerEmail === 'true') {
                            props.navigation.replace('WaitingForPartner', {
                                'userData': userData
                            });
                        } else {
                            props.navigation.replace('SearchPartner', {
                                'userData': userData
                            });
                        }
                    }
                })
                .catch((error) => {
                    props.navigation.goBack();
                });
            } else {
                props.navigation.replace('NavigatorScreen');
            }
        } else {
            // There's no any user data
            props.navigation.replace('Auth');
        }
    };

    React.useEffect(() => {
        const restore = props.navigation.addListener('focus', () => {
            Keyboard.dismiss();
            restoreToken();
        });

        return restore;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LoadingScreen;