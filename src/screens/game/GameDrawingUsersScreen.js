import React from 'react';
import { StyleSheet, Dimensions, View, Animated, Image, Easing, Text, AsyncStorage, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import bottle from '../../../assets/bottle.png';
import floor from '../../../assets/floor.png';
import pointingFinger from '../../../assets/pointingFinger.png';

export default class GameDrawingUsersScreen extends React.Component {

    constructor() {

        super()

        this.RotateValueHolder = new Animated.Value(0);

        this.state = {
            random: null,
            whoIsSelected: null,
            userName: null,
            partnerName: null,
            lastDrawing: [],
            rotateValue: '0deg',
            playFirstTime: null
        }

    }

    

    render() {
        const { random, userName, partnerName, rotateValue, playFirstTime } = this.state;
        
        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', rotateValue]
        });

        return (
            <ImageBackground
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                source={floor}
            >
                <Text style={this.styles.userName}>{partnerName}</Text>
                <View style={this.styles.bottleWrapper}>
                    {playFirstTime &&
                    <TouchableWithoutFeedback
                        onPress={() => this.StartImageRotateFunction()}
                    >
                        <Image
                            style={{
                                width: 120,
                                height: 150,
                                //alignSelf: 'center',
                                position: 'absolute',
                                zIndex: 1,
                                left: 30
                            }}
                            source={pointingFinger}
                        />
                    </TouchableWithoutFeedback>                    
                    }
                    <TouchableWithoutFeedback
                        onPress={() => this.StartImageRotateFunction()}
                    >
                    <Animated.Image
                        style={{
                            width: 150,
                            height: Dimensions.get('window').width*80/100,
                            transform: [{ rotate: RotateData }],
                            //marginVertical: 20,
                        }}
                        source={bottle}
                    />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={this.styles.userName}>{userName}</Text>                        
            </ImageBackground>
        );
        
    }

    componentDidMount() {
        this.isFocused();
        this.restoreData();
    }

    isFocused() {
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            this.setState({ random: '0deg' });
            const { lastDrawing } = this.state;

            let random = Math.floor(Math.random() * 16) + 6;
            random = random*180;
            let joined;
            if(random%360 === 0) {
                if(lastDrawing[lastDrawing.length-1] === 'partner' && lastDrawing[lastDrawing.length-2] === 'partner') {
                    random = random+180;
                    joined = lastDrawing.concat('user');
                    this.setState({ lastDrawing: joined });
                    this.setState({ whoIsSelected: 'user' }); 
                } else {
                    joined = lastDrawing.concat('partner');
                    this.setState({ lastDrawing: joined });
                    this.setState({ whoIsSelected: 'partner' });
                }
            } else {
                if(lastDrawing[lastDrawing.length-1] === 'user' && lastDrawing[lastDrawing.length-2] === 'user') {
                    random = random+180;
                    joined = lastDrawing.concat('partner');
                    this.setState({ lastDrawing: joined });
                    this.setState({ whoIsSelected: 'partner' }); 
                } else {
                    joined = lastDrawing.concat('user');
                    this.setState({ lastDrawing: joined });
                    this.setState({ whoIsSelected: 'user' });    
                }              
                        
            }

            random = random+'deg';
            this.setState({ random: random });
        });
    }

    restoreData = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);

        //restore partner data
        const partnerDataInJson = await AsyncStorage.getItem('partnerData');
        const partnerData = JSON.parse(partnerDataInJson);

        //check if play first time
        const playFirstTime = await AsyncStorage.getItem('playFirstTime');
        if(playFirstTime === null) { // and now he is not
            await AsyncStorage.setItem('playFirstTime', 'false');
        }
        //await AsyncStorage.removeItem('playFirstTime');
        this.setState({
            userName: userData.userName,
            partnerName: partnerData.partnerName,
            playFirstTime: playFirstTime ? false : true
        });
    };

    StartImageRotateFunction() {

        this.setState({ rotateValue: this.state.random, playFirstTime: false });

        this.RotateValueHolder.setValue(0)

        Animated.timing(
            this.RotateValueHolder,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start(() => {
            let selectedPerson;
            if(this.state.whoIsSelected === 'user') {
                selectedPerson = this.state.userName;
            } else {
                selectedPerson = this.state.partnerName;
            }

            this.props.navigation.navigate('GameSelectionScreen', {
                selectedPerson,
                'genderInfo': this.props.route.params.genderInfo,
                'level': this.props.route.params.level
            });
            
        })

    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        userName: {
            fontSize: 48,
            color: 'white',
            fontFamily: 'KaushanScript-Regular',
            textShadowColor: 'rgba(0, 0, 0, 1)',
            textShadowOffset: { width: -4, height: 2 },
            textShadowRadius: 10,
        },
        bottleWrapper: {
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }
        
    });

}