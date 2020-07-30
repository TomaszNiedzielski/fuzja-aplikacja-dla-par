import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback, Dimensions } from 'react-native';

export default class SelectPicker extends React.Component {

    state = {
        selectedOption: null,
        options: [],
        visibleModal: false
    }

    render() {
        const { selectedOption, options, visibleModal } = this.state;
        return(
            <>
                <TouchableWithoutFeedback
                    onPress={() => this.setState({ visibleModal: true })}
                >   
                    <View style={[styles.textInput, this.props.inputStyle]}>
                        <Text style={this.props.selectedStyle}>{this.props.label ? this.props.label : ''}{selectedOption ? selectedOption : 'Wybierz kategorię...'}</Text>
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
                                return(
                                    <TouchableNativeFeedback
                                        key={option}
                                        onPress={() => {
                                            this.setState({ selectedOption: option, visibleModal: false });
                                            this.props.onChangeOption(option);
                                        }}
                                    >
                                        <View>
                                            <Text style={styles.option}>{option}</Text>
                                        </View>
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
        borderWidth: 1,
        color: 'black',
        borderRadius: 10,
        padding: 10,
        width: '80%'
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
    option: {
        padding: 15,
        fontSize: 18
    }
});