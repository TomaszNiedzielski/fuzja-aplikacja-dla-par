import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Switch, ScrollView } from 'react-native';
import LogoutButton from '../../components/auth/LogoutButton';
import colors from '../../../constans/colors';

import { apiUrl } from '../../../constans/apiUrl';

export default class SettingsScreen extends React.Component {

    constructor() {
        super();
        this.toggleAccessCodeSwitch = this.toggleAccessCodeSwitch.bind(this);
        this.isFocused = this.isFocused.bind(this);
    }

    state = {
        userName: null,
        userEmail: null,
        userToken: null,
        partnerName: null,
        partnerEmail: null,
        accessCodeSwitch: null
    }

    render() {
        const { userName, userEmail, partnerName, partnerEmail, accessCodeSwitch } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Aplikacja</Text>
                        <Text style={styles.itemText}>nazwa: fuzja</Text>
                        <Text style={styles.itemText}>wersja: 1.0.3</Text>
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
                        <Text style={styles.itemTitle}>Związek</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('SaveImportantDatesScreen');
                            }}
                        >
                            <Text style={styles.itemText}>ważne daty</Text>
                        </TouchableOpacity>                    
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
                        <Text style={styles.itemTitle}>Bezpieczeństwo</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.itemText}>Ustaw kod dostępu</Text>
                            <Switch
                                onValueChange={this.toggleAccessCodeSwitch}
                                value={accessCodeSwitch}
                                trackColor={{ false: "#d1d1d1", true: "#ebbc91" }}
                                thumbColor={accessCodeSwitch ? colors.primary : "#f4f3f4"}
                            />
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <LogoutButton
                            style={{fontSize: 13, color: 'black', fontWeight: 'normal'}}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        this.restoreData();

        this.props.navigation.setOptions({
            title: 'Ustawienia'
        });

        this.isFocused();
    }

    restoreData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);
        
        const accessCode = await AsyncStorage.getItem('accessCode');

        this.setState({
            userName: userData.userName,
            userEmail: userData.userEmail,
            userToken: userData.userToken,
            partnerName: partnerData.partnerName,
            partnerEmail: partnerData.partnerEmail,
            accessCodeSwitch: accessCode ? true : false
        });
    }

    toggleAccessCodeSwitch = async () => {
        const { accessCodeSwitch } = this.state;
        this.setState({ accessCodeSwitch: accessCodeSwitch === true ? false : true });
        if(this.state.accessCodeSwitch === false) {
            this.props.navigation.navigate('ChangeAccessCodeScreen');
        } else {
            AsyncStorage.removeItem('accessCode');
            this.removeAccessCodeFromApi();
        }
    }

    removeAccessCodeFromApi = async () => {
        const { userToken } = this.state;

        fetch(apiUrl + 'remove-access-code', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: userToken
            })
        })
        .then((response) => response.json())
        .then(async (responseJson) => {
        })
        .catch((error) => {

        });
    }

    isFocused() {
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            this.restoreData();
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: 'white'
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