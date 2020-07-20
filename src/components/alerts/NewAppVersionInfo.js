import React from 'react';
import { Modal, View, Text, StyleSheet,TouchableNativeFeedback, Linking } from 'react-native';
import colors from '../../../constans/colors';
export default class NewAppVersionInfo extends React.Component {

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}></View>
                <View style={styles.wrapper}>
                    <Text style={styles.text}>
                        Dostępna jest nowa wersja aplikacji. Ta z której korzystasz, nie będzie dłużej wspierana 
                        i pewne jej funkcje mogą nie działać poprawnie.
                    </Text>
                    <TouchableNativeFeedback
                        onPress={async () => {
                            await Linking.openURL('https://play.google.com/store/apps/details?id=com.fuzja.fuzja');
                        }}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Zaaktualizuj aplikację</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        width: '80%',
        height: 300,
        backgroundColor: 'white',
        borderRadius: 20
    },
    header: {

    },
    text: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: colors.primary,
        padding: 20,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 30,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    }
    
});