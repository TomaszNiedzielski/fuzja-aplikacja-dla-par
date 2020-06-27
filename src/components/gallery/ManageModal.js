import React from 'react';
import { Alert, Modal, TouchableOpacity, View, StyleSheet, Text, AsyncStorage } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { apiUrl } from '../../../constans/apiUrl';
import * as RootNavigation from '../../../navigation/RootNavigation';

export default class ManageModal extends React.Component {

    state = {
        visible: false,
        userToken: null,
    }

    render() {
        const { visible } = this.state;
        return (
            <View>
                <Ionicons
                    name="ios-more"
                    size={25}
                    color="white"
                    onPress={() => {
                        this.setState({ visible: true })
                    }}
                />
                <Modal
                    visible={visible}
                    style={styles.manageModal}
                    transparent={true}
                >
                    <View style={styles.manageModalContainer}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
                            onPress={() => {
                                this.setState({ visible: false })
                            }}
                        >
                            <View style={styles.manageModal}>
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => {
                                        Alert.alert(
                                            'Usuń',
                                            'Czy napewno chcesz usunąć to zdjęcie?',
                                            [
                                                {text: 'Anuluj', style: 'cancel'},
                                                {text: 'OK', onPress: () => this.deleteImage()},
                                            ],
                                            { cancelable: false }
                                        )
                                    }}
                                >
                                    <Text style={styles.itemText}>Usuń</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => {
                                        this.setState({ visible: false });                                        
                                        RootNavigation.navigate('EditDescriptionScreen', {
                                            description: this.props.image.description,
                                            editDescription: this.props.editDescription
                                        });
                                    }}
                                >
                                    <Text style={styles.itemText}>Edytuj opis</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }

    componentDidMount() {
        this.restoreToken();
    }

    restoreToken = async () => {
        const userDataInJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataInJson);
        this.setState({ userToken: userData.userToken });
    };

    deleteImage() {
        fetch(apiUrl+'delete-image-from-gallery', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.state.userToken,
                imageId: this.props.image.id
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ visible: false });
            this.props.navigation.navigate('Gallery', {
                'deleted': this.props.image.id
            });
        })
        .catch((error) => {
            throw(error);
        });
    }

}

const styles = StyleSheet.create({
    manageModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    manageModal: {
        backgroundColor: 'white',
        elevation: 10,
        width: '80%'
    },
    item: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5
    },
    itemText: {
        fontSize: 16
    }
});