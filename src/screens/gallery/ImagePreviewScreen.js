import React from 'react';
import { View, Dimensions, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, YellowBox, Platform, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { apiImage } from '../../../constans/apiUrl';

import Image from 'react-native-scalable-image';
import ManageModal from '../../components/gallery/ManageModal';
import moment from "moment";
import 'moment/locale/pl';

export default class SelectedImageModal extends React.Component {

    constructor() {
        super();
        this.editDescription = this.editDescription.bind(this);
        YellowBox.ignoreWarnings(['Failed to get size']);
    }

    state = {
        image: {},
        showBottomBar: false
    }

    render() {
        const { image, showBottomBar } = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({ showBottomBar: this.state.showBottomBar ? false : true });
            }}>
            <View style={{ marginTop: StatusBar.currentHeight, flex: 1, backgroundColor: 'white' }}>
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
                    <View>
                        <Image
                            source={{
                                uri: apiImage+'gallery/'+image.image_name
                            }}
                            width={Dimensions.get('window').width}
                            resizeMode="contain"
                        />
                    </View>
                </ScrollView>
                <View style={[styles.bottomBar, { opacity: showBottomBar ? 100 : 0 }]}>
                    <View style={styles.infoBar}>
                        <Text style={styles.autorInfo}>Dodane przez {image.user_name}</Text>
                        <ManageModal
                            image={image}
                            navigation={this.props.navigation}
                            editDescription={this.editDescription}
                        />
                    </View>
                    <View>
                        <Text style={styles.description}>{image.description !== 'null' && image.description}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 12, color: 'white', marginVertical: 20}}>{moment(image.created_at).fromNow()}</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount() {
        this.setState({
            image: this.props.route.params.image
        });
    }

    componentDidUpdate() {
        if(this.props.route.params.image.id !== this.state.image.id) {
            this.setState({
                image: this.props.route.params.image
            });
        }
    }

    editDescription(description) {
        //edytowanie opisu
        this.setState(prevState => ({
            image: {
                ...prevState.image,
                description: description
            }
        }));

        this.props.route.params.editDescription(description, imageId = this.state.image.id);
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    infoBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    autorInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    description: {
        color: 'white'
    }
});