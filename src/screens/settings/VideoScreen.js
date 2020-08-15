import React, { Component } from "react";
import { StyleSheet, View, Animated, Image, Easing, TextInput, Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Emoji from 'react-native-emoji';

import EmojiContainer from '../../components/chat/EmojiContainer';

export default class App extends Component {

    constructor() {
        super();

        this.selectEmoji = this.selectEmoji.bind(this);
    }

    state = {
        inputText: ''
    }

    render() {
        const { inputText } = this.state;
        return (
            <View style={styles.container}>

                <Button 
                    title="open emoji"
                />

                <TextInput
                    placeholder="text"
                    style={{marginTop: 100, fontSize: 20}}
                    value={inputText}
                    onChangeText={(text) => {
                        this.setState({ inputText: text })
                    }}
                />

                <EmojiContainer
                    selectEmoji={this.selectEmoji}
                />

            </View>
        );
    }

    selectEmoji(emoji) {
        const emojiIcon = String.fromCodePoint(emoji);
        this.setState({ inputText: this.state.inputText+emojiIcon });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});