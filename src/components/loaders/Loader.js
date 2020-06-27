import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';

const Loader = props => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size={15} color='#adadad' /> 
            <Text style={{ color: '#adadad', fontSize: 15, marginLeft: 10 }}>ładowanie...</Text>                       
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        width: '80%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: Dimensions.get('window').height/2-80,
        borderRadius: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    }
});

export default Loader;