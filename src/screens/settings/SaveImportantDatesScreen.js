import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import DateInput from '../../components/settings/DateInput';
import colors from '../../../constans/colors';

import SaveButton from '../../components/header/SaveButton';
import { Ionicons } from '@expo/vector-icons';

import { apiUrl } from '../../../constans/apiUrl';

export default class SaveImportantDatesScreen extends React.Component {

    constructor() {
        super();

        this.updateState = this.updateState.bind(this);
        this.saveDateInputs = this.saveDateInputs.bind(this);
        this.getDatesJsonFromServer = this.getDatesJsonFromServer.bind(this);
    }

    state = {
        dates: [],
        userData: null
    }

    render() {
        const { dates } = this.state;
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.container}>
                            {dates.length > 0 &&
                                dates.map(date => {
                                    return(
                                        <DateInput
                                            key={date.id}
                                            id={date.id}
                                            title={date.title}
                                            editableTitle={date.editableTitle}
                                            date={date.date}
                                            showOnDesktop={date.showOnDesktop}
                                            updateState={this.updateState}
                                        />
                                    )
                                })
                            }
                            {dates.length > 0 &&
                                <View style={styles.addMoreWrapper}>
                                    <Ionicons name="ios-add-circle-outline" size={36} color="gray"
                                        onPress={() => {
                                            const date = {
                                                id: dates.length+1,
                                                showOnDesktop: false,
                                                title: null,
                                                date: null,
                                                editableTitle: true
                                            };

                                            let newDates = dates;
                                            newDates.push(date);
                                            this.setState({ dates: newDates });
                                        }} 
                                    />
                                </View>
                            }
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>                
        );
    }

    async componentDidMount() {
        this.restoreUserData();
        this.props.navigation.setOptions({
            title: 'Ważne daty',
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },
            headerTintColor: 'white',
            headerRight: () => (
                <SaveButton saveHandler={this.saveDateInputs} color="white" />
            )
        });
        let dates = await AsyncStorage.getItem('dates');
        if(dates) {
            dates = JSON.parse(dates);
            this.setState({ dates: dates });
        } else {
            this.setState({
                dates: [
                    {
                        id: 1,
                        showOnDesktop: false,
                        title: 'Rozpoczęcie związku',
                        date: null,
                        editableTitle: false
                    },
                    {
                        id: 2,                
                        showOnDesktop: false,
                        title: 'Moje urodziny',
                        date: null,
                        editableTitle: false
                    },
                    {
                        id: 3,
                        showOnDesktop: false,
                        title: 'Urodziny partnera',
                        date: null,
                        editableTitle: false
                    },
                    {
                        id: 4,
                        showOnDesktop: false,
                        title: null,
                        date: null,
                        editableTitle: true
                    },
                    {
                        id: 5,
                        showOnDesktop: false,
                        title: null,
                        date: null,
                        editableTitle: true
                    }
        
                ]
            });

            this.getDatesJsonFromServer();
        }
    }

    async restoreUserData() {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        this.setState({ userData: userData });
    }

    updateState(inputId, attribute, value) {
        let { dates } = this.state;
        dates[inputId-1][attribute] = value; 
        this.setState({ dates: dates });
    }

    async saveDateInputs() {
        await AsyncStorage.setItem('dates', JSON.stringify(this.state.dates));
        this.sendDatesJsonToServer(this.state.dates);
        this.props.navigation.goBack();
    }

    sendDatesJsonToServer(dates) {
        const jsonDates = JSON.stringify(dates);
        fetch(apiUrl + 'save-dates-json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.state.userData.userToken,
                datesInJson: jsonDates
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
        })
        .catch((error) => {
        });
    }

    getDatesJsonFromServer() {
        fetch(apiUrl + 'get-dates-json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.state.userData.userToken
            })
        })
        .then((response) => response.json())
        .then(async (responseJson) => {
            if(responseJson[0].dates.length) {
                const dates = JSON.parse(responseJson[0].dates);
                this.setState({ dates: [] });
                this.setState({ dates: dates });
                await AsyncStorage.setItem('dates', JSON.stringify(dates));
            }
        })
        .catch((error) => {
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    addMoreWrapper: {
        width: '100%',
        alignItems: 'center',
        height: 50
    }
});