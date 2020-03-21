import React from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';


const LoadingScreen = props => {
    const restoreToken = async () => {
        try {
            const userDataInJson = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(userDataInJson);
            
            if (userData !== null) {
                if (!userData.partnerId) {
                    props.navigation.navigate('SearchPartner', {
                        'userData': userData
                    });
                } else {
                    props.navigation.navigate('Home');                    
                }
            } else {
                // There's no any user data
                console.log("there's no user data");
                props.navigation.navigate('Auth');
            }
        } catch (error) {
          // Error retrieving data
        }
    };

    React.useEffect(() => {
        const restore = props.navigation.addListener('focus', () => {
            restoreToken();
        });

        return restore;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
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