import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import LogoutButton from '../../components/auth/LogoutButton';
import colors from '../../../constans/colors';

export default class SettingsScreen extends React.Component {

    state = {
        userName: null,
        userEmail: null,
        partnerName: null,
        partnerEmail: null
    }

    render() {
        const { userName, userEmail, partnerName, partnerEmail } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Aplikacja</Text>
                    <Text style={styles.itemText}>nazwa: fuzja</Text>
                    <Text style={styles.itemText}>wersja: 1.0.0</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Użytkownik</Text>
                    <Text style={styles.itemText}>imię: {userName}</Text>
                    <Text style={styles.itemText}>e-mail: {userEmail}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeAvatar')}>
                        <Text style={styles.itemText}>zmień zdjęcie profilowe</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Partner</Text>
                    <Text style={styles.itemText}>imię: {partnerName}</Text>
                    <Text style={styles.itemText}>e-mail: {partnerEmail}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Pulpit</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('ChangeDesktop');
                        }}
                    >
                        <Text style={styles.itemText}>zmień tło pulpitu</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                    <LogoutButton
                        style={{fontSize: 13, color: 'black', fontWeight: 'normal'}}
                    />
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.restoreData();

        this.props.navigation.setOptions({
            title: 'Ustawienia'
        });
    }

    restoreData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);
        
        this.setState({
            userName: userData.userName,
            userEmail: userData.userEmail,
            partnerName: partnerData.partnerName,
            partnerEmail: partnerData.partnerEmail
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8
    },
    itemContainer: {
        marginVertical: 7
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 3,
        color: colors.primary
    },
    itemText: {
        fontSize: 13,
        marginVertical: 5
    }
});