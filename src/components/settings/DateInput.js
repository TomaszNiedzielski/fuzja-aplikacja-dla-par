import React from 'react';
import { View, TextInput, Text, StyleSheet, Switch, AsyncStorage } from 'react-native';

import colors from '../../../constans/colors';

import moment from "moment";
import 'moment/locale/pl';

export default class DateInput extends React.Component {

    constructor(props) {
        super(props);

        this.onDateTyping = this.onDateTyping.bind(this);

    }

    state = {
        dateError: false,
        date: null,
        title: null,
        showOnDesktop: false
    }

    render() {
        return(
            <View style={styles.dateItem}>
                <View style={styles.showOnDesktop}>
                    <Text style={styles.showOnDesktopText}>Pokazuj na pulpicie</Text>
                    <Switch
                        onValueChange={value => this.props.updateState(this.props.id, 'showOnDesktop', value)}
                        value={this.props.showOnDesktop}
                        trackColor={{ false: "#d1d1d1", true: "#ebbc91" }}
                        thumbColor={this.props.showOnDesktop ? colors.primary : "#f4f3f4"}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.itemTitle}
                        value={this.state.title}
                        onChangeText={text => {
                            this.props.updateState(this.props.id, 'title', text);
                            this.setState({ title: text });
                        }}
                        placeholder="tytuł"
                        maxLength={26}
                        editable={this.props.editableTitle}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {this.onDateTyping(text)}}
                        value={this.state.date}
                        maxLength={10}
                        placeholder={this.props.id === 2 || this.props.id === 3 ? "wpisz datę urodzenia" : "dd-mm-rrrr"}
                    />
                    {this.state.dateError === true &&
                    <View style={styles.dateError}>
                        <Text style={styles.errorText}>Nie poprawna data</Text>
                        <Text style={styles.errorText}>użyj formatu: dd-mm-rrrr</Text>
                    </View>
                    }
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.setState({ 
            date: this.props.date,
            title: this.props.title,
            showOnDesktop: this.props.showOnDesktop
        });
    }

    onDateTyping(date) {
        this.setState({ date: date });
        if(moment(date, 'DD-MM-YYYY', true).isValid() || date.length === 0) {
            this.setState({ dateError: false });  
            // save to asyncstorage
            this.props.updateState(this.props.id, 'date', date);      
        } else {
            this.setState({ dateError: true });
        }
    }

}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: colors.primary,
        width: '100%',
        padding: 15,
        borderRadius: 13
    },
    dateItem: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 30,
    },
    itemTitle: {
        fontSize: 18,
        position: 'absolute',
        top: -14,
        left: 20,
        backgroundColor: 'white',
        zIndex: 1,
        paddingHorizontal: 5,
        color: colors.primary,
    },
    dateError: {

    },
    errorText: {
        color: 'red'
    },
    showOnDesktop: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    showOnDesktopText: {
        fontSize: 13,
        color: colors.primary,
        marginRight: 15
    }
});