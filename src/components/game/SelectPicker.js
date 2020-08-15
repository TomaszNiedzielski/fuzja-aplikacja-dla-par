import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback, Dimensions } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../constans/colors';

export default class SelectPicker extends React.Component {

    state = {
        selectedOption: null,
        options: [],
        visibleModal: false
    }

    render() {
        const { selectedOption, options, visibleModal } = this.state;
        let Icon, optionTitle, Padlock;
        return(
            <>
                <TouchableWithoutFeedback
                    onPress={() => this.setState({ visibleModal: true })}
                >   
                    <View style={styles.textInput}>
                        <Text style={styles.selectedStyle}>{this.props.label ? this.props.label : ''}{selectedOption ? selectedOption : 'Wybierz kategorię...'}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <Modal
                    visible={visibleModal}
                    transparent={true}
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ visibleModal: false })}>
                        <View style={styles.overlay}></View>
                    </TouchableWithoutFeedback>

                    <View style={styles.modalContent}>
                        {options.length > 0 &&
                            options.map(option => {
                                if(option === 'soft') {
                                    //optionTitle = 'lekkie';
                                    Icon = () => { return <MaterialCommunityIcons name="heart" size={24} color="red" /> }
                                    Padlock = () => { return <FontAwesome5 name="lock-open" size={24} color="white" /> }
                                }
                                if(option === 'hot') {
                                    //optionTitle = 'gorące';
                                    Icon = () => { return <MaterialCommunityIcons name="fire" size={24} color="red" /> }
                                    Padlock = () => { return <FontAwesome5 name="lock-open" size={24} color="white" /> }                                    
                                }
                                return(
                                    <TouchableNativeFeedback
                                        key={option}
                                        onPress={() => {
                                            this.setState({ selectedOption: option, visibleModal: false });
                                            this.props.onChangeOption(option);
                                        }}
                                    >
                                        <LinearGradient
                                            colors={colors.gradient}
                                            start={{ x: 1, y: 1 }}
                                            end={{ x: 0, y: 1 }}
                                        >
                                            <View style={styles.optionWrapper}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon />
                                                    <Text style={styles.option}>{option}</Text>
                                                </View>
                                                <Padlock />
                                            </View>
                                        </LinearGradient>
                                    </TouchableNativeFeedback>
                                )
                            })
                        }
                    </View>
                </Modal>
            </>
        );
    }
    
    componentDidMount() {
        this.setState({
            options: this.props.options,
            selectedOption: this.props.selectedOption
        });
    }

}

const styles = StyleSheet.create({
    textInput: {
        color: 'black',
        //borderRadius: 10,
        borderColor: 'white',
        borderBottomWidth: 2,
        padding: 10,        
        width: '90%',
        marginTop: 10
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center',
        top: Dimensions.get('window').height/2-50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    optionWrapper: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    option: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5
    },
    selectedStyle: {
        color: 'white',
        fontSize: 16
    }
});