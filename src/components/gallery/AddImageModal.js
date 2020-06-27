import React from 'react';
import { Modal, View, Dimensions, ScrollView, Text, StyleSheet, TextInput } from 'react-native';

import Image from 'react-native-scalable-image';
import SavingHeader from './SavingHeader';

export default class AddImageModal extends React.Component {
    
    state = {
        visible: false,
        result: {},
    }

    render() {
        const { visible, result } = this.state;
        return (
            <Modal
                visible={visible}
            >
                <ScrollView>
                    <SavingHeader
                        cancelHandler={this.props.cancelHandler}
                        saveHandler={this.props.saveHandler}
                    />

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        {result && <Image source={{ uri: result.uri }} width={Dimensions.get('window').width - 20} resizeMode="contain" />}                        
                    </View>
                    
                    <View style={styles.description}>
                        <TextInput
                            placeholder="Add description..."
                            onChangeText={text => {
                                this.props.setDescription(text)
                            }}
                            multiline = {true}
                            style={styles.descriptionInput}
                        />
                    </View>
                    
                </ScrollView>
            </Modal>
        );
    }

    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            result: this.props.result
        });
    }

    componentDidUpdate() {
        if(this.props.visible !== this.state.visible && this.props.result !== this.state.result) {
            this.setState({
                visible: this.props.visible,
                result: this.props.result
            });
        }
    }

}

const styles = StyleSheet.create({
    description: {
        padding: 20
    },
    descriptionInput: {
        fontSize: 15
    }
});