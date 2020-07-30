import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../../constans/colors';
import GenderSettings from '../../components/game/GenderSettings';
import SelectPicker from '../../components/game/SelectPicker';
import { Level } from 'chalk';

export default class GameStartScreen extends React.Component {

    constructor() {
        super();

        this.play = this.play.bind(this);
        this.restoreLevel = this.restoreLevel.bind(this);
    }

    state = {
        userName: null,
        userGender: null,
        partnerName: null,
        partnerGender: null,
        showInfo: false,
        level: null
    }

    render() {
        const { userName, userGender, partnerName, partnerGender, showInfo, level } = this.state;
        return (
            <LinearGradient
                colors={['rgba(247,106,63,1) 100%', 'rgba(252,95,52,1) 90%', 'rgba(248,40,45,1) 5%', '90deg, rgba(242,33,53,1) 0%']}
                style={ styles.container }
            >
                <Text style={[styles.title, { fontFamily: 'KaushanScript-Regular' }]}>Prawda czy Wyzwanie?</Text>
                <View style={{ marginTop: 30 }}/>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Wybierz płeć</Text>
                <GenderSettings
                    name={userName}
                    gender={userGender}
                    setGender={(gender) => this.setState({ userGender: gender })}
                />
                <GenderSettings
                    name={partnerName}
                    gender={partnerGender}
                    setGender={(gender) => this.setState({ partnerGender: gender })}
                />
                {showInfo &&
                    <Text style={styles.info}>Potrzebujemy informacji o płci, żeby lepiej dobierać pytania.</Text>                    
                }
                {level &&
                <SelectPicker 
                    options={['normalne', 'gorące']}
                    selectedOption={level}
                    label='poziom trudności - '
                    inputStyle={{
                        borderColor: 'white',
                        borderWidth: 2,
                        width: '90%',
                        marginTop: 10
                    }}
                    selectedStyle={{
                        color: 'white',
                        fontSize: 16
                    }}
                    onChangeOption={level => {
                        this.setState({ level: level });
                        this.saveLevel(level);
                    }}
                />
                }
                <TouchableNativeFeedback
                    onPress={() => {
                        this.play();
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Zagraj</Text>
                    </View>
                </TouchableNativeFeedback>
            </LinearGradient>
        );
    }

    async componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Gra'
        });

        this.restoreData();
        this.restoreLevel();
    }

    restoreData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        //restore partner data
        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);

        this.setState({
            userName: userData.userName,
            userGender: userData.userGender,
            partnerName: partnerData.partnerName,
            partnerGender: partnerData.partnerGender,
            userData: userData,
            partnerData: partnerData
        });
    };

    async play() {
        let { userData, partnerData, userGender, partnerGender, userName, partnerName } = this.state;
        if(!userGender || !partnerGender) {
            this.setState({ showInfo: true });
            return;
        }
        userData.userGender = userGender;
        partnerData.partnerGender = partnerGender;

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('partnerData', JSON.stringify(partnerData));        

        let genderInfo = {};
        genderInfo[userName] = userGender;
        genderInfo[partnerName] = partnerGender;

        const { level } = this.state;
        
        this.props.navigation.navigate('GameDrawingUsersScreen', {genderInfo, level});
    }

    async saveLevel(level) {
        await AsyncStorage.setItem('gameLevel', level);
    }

    async restoreLevel() {
        const level = await AsyncStorage.getItem('gameLevel');

        this.setState({ level: level ? level : 'normalne' });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    title: {
        marginTop: 20,
        fontSize: 52,
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'rgba(161, 28, 19, 1)',
        textShadowOffset: { width: -4, height: 2 },
        textShadowRadius: 10,
    },
    button: {
        padding: 8,
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 50,
        width: '90%',
        position: 'absolute',
        bottom: 40,
    },
    buttonText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(161, 28, 19, 1)',
        textShadowOffset: { width: -4, height: 2 },
        textShadowRadius: 10,
    },
    info: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});