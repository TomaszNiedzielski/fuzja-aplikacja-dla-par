import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../constans/colors';

export default class GameSelectionScreen extends React.Component {

    render() {
        const { selectedPerson } = this.props.route.params;
        return (
            <LinearGradient
                colors={colors.gradient}
                style={ this.styles.container }
            >
                <Text style={this.styles.userName}>Wybiera, { selectedPerson }</Text>
                <View style={this.styles.selectButtonsContainer}>
                    <TouchableNativeFeedback
                        onPress={() => {
                            this.props.navigation.navigate('GameCardScreen', {
                                category: 'truth',
                                selectedPerson: selectedPerson,
                                genderInfo: this.props.route.params.genderInfo,
                                level: this.props.route.params.level
                            });
                        }}
                    >
                        <Text style={[this.styles.selectButton, this.styles.titleItem]}>Prawda</Text>
                    </TouchableNativeFeedback>

                    <Text style={[this.styles.titleItem]}>czy</Text>

                    <TouchableNativeFeedback
                        onPress={() => {
                            this.props.navigation.navigate('GameCardScreen', {
                                category: 'dare',
                                selectedPerson: selectedPerson,
                                genderInfo: this.props.route.params.genderInfo,
                                level: this.props.route.params.level                                
                            });
                        }}
                    >
                        <Text style={[this.styles.selectButton, this.styles.titleItem]}>Wyzwanie</Text>
                    </TouchableNativeFeedback>
                </View>
            </LinearGradient>
        );
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        userName: {
            fontSize: 30,
            color: 'white',
            fontFamily: 'KaushanScript-Regular',
            textShadowColor: 'rgba(161, 28, 19, 1)',
            textShadowOffset: { width: -4, height: 2 },
            textShadowRadius: 10,
        },
        selectButton: {
            borderWidth: 4,
            borderColor: 'white',
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 20
        },
        titleItem: {
            fontSize: 30,
            color: 'white',
            fontFamily: 'KaushanScript-Regular',
            textAlign: 'center',
            marginVertical: 10,
            textShadowColor: 'rgba(161, 28, 19, 1)',
            textShadowOffset: { width: -4, height: 2 },
            textShadowRadius: 10,
        },
        selectButtonsContainer: {
            marginTop: 100
        }
    });

}

