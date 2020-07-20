import React from 'react';
import { View, Button, Linking, StyleSheet, Text, CheckBox, TouchableNativeFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class PriceBox extends React.Component {

    render() {
        const { title, price, bottomText, isSelected } = this.props;

        return(
            <TouchableNativeFeedback
                onPress={() => {
                    this.props.onPressHandler();
                }}
            >
                <View style={[styles.box, isSelected === true && {borderColor: '#00fff2'} ]}>
                    <Text style={styles.boxText}>{title}</Text>
                    <Text style={styles.boxText}>{price}</Text>
                    {bottomText && <Text style={[styles.boxText, {fontSize: 16, marginTop: 10}]}>{bottomText}</Text>}
                </View>
            </TouchableNativeFeedback>
        );
    }

}

export default class PaymentScreen extends React.Component {

    state = {
        selectedCard: null,
        checkboxIsSelected: false
    }

    render() {
        const { selectedCard, checkboxIsSelected } = this.state;
        const paymentChoice = selectedCard === 'oneMonth' ? 4.99 : 24.99;
        const totalPayment = checkboxIsSelected ? 2*paymentChoice : paymentChoice;
        return(
            <LinearGradient
                colors={['rgba(247,106,63,1) 100%', 'rgba(252,95,52,1) 90%', 'rgba(248,40,45,1) 5%', '90deg, rgba(242,33,53,1) 0%']}
                style={ styles.container }
            >
            <View style={styles.container}>
                <View>
                    <Text style={[styles.text, styles.titleText]}>
                        Twój darmowy okres próbny właśnie dobiegł końca.
                    </Text>
                </View>
                <View>
                    <Text style={[styles.text, {fontSize: 30}]}>Kup abonament</Text>
                </View>
                <View style={styles.downSection}>
                    <View>
                        <PriceBox
                            title="wybierz 1 miesiąc"
                            price="4,99 zł"
                            onPressHandler={() => {this.setState({ selectedCard: 'oneMonth' })}}
                            isSelected={selectedCard === 'oneMonth' ? true : false}
                        />
                        <PriceBox
                            title="wybierz 6 miesięcy"
                            price="24,99 zł"
                            bottomText="Oszczędzasz 50%"
                            onPressHandler={() => {this.setState({ selectedCard: 'sixMonths' })}}
                            isSelected={selectedCard === 'sixMonths' ? true : false}                            
                        />              
                    </View>
                    {selectedCard &&
                    <>
                        <View style={styles.checkBox}>
                            <CheckBox
                                value={checkboxIsSelected}
                                onValueChange={(value) => this.setState({ checkboxIsSelected: value })}
                            />
                            <Text style={{color: 'white'}}>Płacę za partnera</Text>
                        </View>
                        <TouchableNativeFeedback>
                            <View style={styles.payButton}>
                                <Text style={styles.payButtonText}>Przejdź do płatności</Text>
                                <Text style={styles.payButtonText}>{totalPayment} zł</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </>
                    }
                </View>
            </View>
            </LinearGradient>
        );
    }

    async openWebsite() {
        await Linking.openURL('https://reactnative.dev/docs/linking');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 50,
        textAlign: 'center',
    },
    titleText: {
        fontSize: 30,
        marginTop: 60,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 40
    },
    downSection: {
        width: '90%',
        alignSelf: 'center',        
    },
    box: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'white',
        padding: 20,
        width: '100%',
        marginVertical: 15,
        alignItems: 'center'
    },
    boxText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    payButton: {
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 30,
        padding: 3,
        alignItems: 'center',
        marginTop: 15
    },
    payButtonText: {
        color: 'white',
        fontSize: 18
    }
});