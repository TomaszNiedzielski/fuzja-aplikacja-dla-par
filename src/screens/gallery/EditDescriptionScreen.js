import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SaveButton from '../../components/header/SaveButton';

export default class EditDescriptionScreen extends React.Component {

    state = {
        description: null
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ fontSize: 15 }}
                    placeholder="napisz opis..."
                    multiline={true}
                    value={this.state.description}
                    autoFocus={true}
                    onChangeText={text => {
                        this.setState({ description: text });
                    }}
                />
            </View>
        );
    }

    componentDidMount() {
        this.setState({ description: this.props.route.params.description });
        this.props.navigation.setOptions({
            title: "Opis",
            headerRight: () => (
                <SaveButton
                    saveHandler={() => {
                        this.props.route.params.editDescription(this.state.description);
                        this.props.navigation.goBack();
                    }}
                />
            )
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});