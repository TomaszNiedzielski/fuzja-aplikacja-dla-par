import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import moment from "moment";
import 'moment/locale/pl';

export default class Widget extends React.Component {
    
    state = {
        date: null,
        title: null,
        processedDate: null
    }

    render() {
        const { date, title, processedDate } = this.state;
        return (
            <View style={[styles.widget, this.props.style]}>
                <Text style={styles.widgetText}>{title}</Text>
                <Text style={styles.widgetText}>
                   {processedDate}
                </Text>
            </View>
        );
    }

    componentDidMount() {
        const { date, title } = this.props;
        this.setState({
            date: date,
            title: title
        });
        if(this.props.id === 2 || this.props.id === 3) { //it's birthdays
            this.countDaysToBirthday(this.props.date);
        } else {
            this.countDaysToDate(this.props.date);        
        }
    }

    componentDidUpdate() {
        if(this.props.date !== this.state.date || this.props.title !== this.state.title) {
            this.setState({
                date: this.props.date,
                title: this.props.title
            });
            if(this.props.id === 2 || this.props.id === 3) { //it's birthdays
                this.countDaysToBirthday(this.props.date);
            } else {
                this.countDaysToDate(this.props.date);        
            }                
        }
    }

    countDaysToBirthday(date) {
        const newdate = date.split("-").reverse().join("-");
        const birthdate = newdate;
        const today = moment().format('YYYY-MM-DD');
        const years = moment().diff(birthdate, 'years');
        const adjustToday = birthdate.substring(5) === today.substring(5) ? 0 : 1;
        const nextBirthday = moment(birthdate).add(years + adjustToday, 'years');
        const daysUntilBirthday = nextBirthday.diff(today, 'days');
        const result = 'za '+daysUntilBirthday+' dni';
        this.setState({ processedDate: result });
    }

    countDaysToDate(date) {
        let durationOf = moment(date, "DD-MM-YYYY").fromNow();
        this.setState({ processedDate: durationOf });
    }


}

const styles = StyleSheet.create({
    widget: {
        backgroundColor: 'rgba(255,255,255, 0.5)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '45%',
        marginVertical: 10,
        marginHorizontal: '2.5%',
        justifyContent: 'space-between',
        maxHeight: 85
    },
    widgetText: {
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});