import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Timer from '../../components/game/Timer';
import colors from '../../../constans/colors';

// soft stuff
import { softQuestionsForFemale } from '../../../assets/game/soft/softQuestionsForFemale';
import { softQuestionsForMale } from '../../../assets/game/soft/softQuestionsForMale';
import { softDaresForFemale } from '../../../assets/game/soft/softDaresForFemale';
import { softDaresForMale } from '../../../assets/game/soft/softDaresForMale';

// hot stuff
import { hotQuestionsForFemale } from '../../../assets/game/hot/hotQuestionsForFemale';
import { hotQuestionsForMale } from '../../../assets/game/hot/hotQuestionsForMale';
import { hotDaresForFemale } from '../../../assets/game/hot/hotDaresForFemale';
import { hotDaresForMale } from '../../../assets/game/hot/hotDaresForMale';

export default class GameCardScreen extends React.Component {

    state = {
        text: null,
        seconds: null,
        minutes: null,
        timer: false,
        level: null
    }

    render() {
        const { selectedPerson } = this.props.route.params;
        const { text, seconds, minutes, timer } = this.state;
        return(
             <LinearGradient
                colors={colors.gradient}
                style={ this.styles.container }
            >
                {timer &&
                    <View style={{marginBottom: 20}}>
                        <Timer
                            minutes={minutes ? minutes : 0}
                            seconds={seconds}
                            style={{color: 'white', fontSize: 30,}}
                        />
                    </View>
                }
                <Text style={this.styles.text}>{selectedPerson}, {text}</Text>
                <TouchableNativeFeedback
                    onPress={() => {
                        this.setState({ text: null });                        
                        this.props.navigation.navigate('GameDrawingUsersScreen');
                    }}
                >
                    <Text style={this.styles.nextButton}>dalej</Text>
                </TouchableNativeFeedback>
            </LinearGradient>
        );
    }

    componentDidMount() {
        this.isFocused();
    }

    isFocused() {
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            if(this.state.text) return;
            const { selectedPerson, genderInfo, category, level } = this.props.route.params;
            
            // choose texts to level
            let questionsForMale, questionsForFemale, daresForMale, daresForFemale;
            if(level === 'soft') {
                if(this.state.level !== 'soft') { // if level changed
                    questionsForMale = softQuestionsForMale;
                    questionsForFemale = softQuestionsForFemale;
                    daresForMale = softDaresForMale;
                    daresForFemale = softDaresForFemale;
                }
                this.setState({ level: 'soft' });
            }
            if(level === 'hot') {
                if(this.state.level !== 'hot') { // if level changed
                    questionsForMale = hotQuestionsForMale;
                    questionsForFemale = hotQuestionsForFemale;
                    daresForMale = hotDaresForMale;
                    daresForFemale = hotDaresForFemale;
                }
                this.setState({ level: 'hot' });
            }

            const genderOfSelectedPerson = genderInfo[selectedPerson];
            if(genderOfSelectedPerson === 'male' && category === 'truth') {
                const random = Math.floor(Math.random() * questionsForMale.length-1) + 1;
                let text = questionsForMale[random].text;
                text = text.charAt(0).toLowerCase() + text.slice(1);
                this.setState({ text: text });
                // remove this text from local variable
                questionsForMale.splice(random, 1);
            }

            if(genderOfSelectedPerson === 'female' && category === 'truth') {
                const random = Math.floor(Math.random() * questionsForFemale.length-1) + 1;
                let text = questionsForFemale[random].text;
                text = text.charAt(0).toLowerCase() + text.slice(1);                
                this.setState({ text: text });
                // remove this text from local variable
                questionsForFemale.splice(random, 1);                
            }
            
            if(genderOfSelectedPerson === 'male' && category === 'dare') {
                const random = Math.floor(Math.random() * daresForMale.length-1) + 1;
                let text = daresForMale[random].text;
                text = text.charAt(0).toLowerCase() + text.slice(1);                
                this.setState({ text: text });
                if(daresForMale[random].timer) {
                    this.setState({
                        timer: true,
                        seconds: daresForMale[random].seconds,
                        minutes: daresForMale[random].minutes                        
                    });
                }
                // remove this text from local variable
                daresForMale.splice(random, 1);
            }

            if(genderOfSelectedPerson === 'female' && category === 'dare') {
                const random = Math.floor(Math.random() * daresForFemale.length-1) + 1;
                let text = daresForFemale[random].text;
                text = text.charAt(0).toLowerCase() + text.slice(1);                
                this.setState({ text: text });
                if(daresForFemale[random].timer) {
                    this.setState({
                        timer: true,                        
                        seconds: daresForFemale[random].seconds,
                        minutes: daresForFemale[random].minutes                        
                    });
                }
                // remove this text from local variable
                daresForFemale.splice(random, 1);
            }

        });
    }


    styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        nextButton: {
            paddingHorizontal: 40,
            paddingVertical: 8,
            borderWidth: 4,
            borderColor: 'white',
            borderRadius: 50,
            width: '100%',
            fontSize: 30,
            color: 'white',
            //fontFamily: 'KaushanScript-Regular',            
            textAlign: 'center',
            textShadowColor: 'rgba(161, 28, 19, 1)',
            textShadowOffset: { width: -4, height: 2 },
            textShadowRadius: 10,
            fontWeight: 'bold',
            
        },
        text: {
            textShadowColor: 'rgba(161, 28, 19, 1)',
            textShadowOffset: { width: -4, height: 2 },
            textShadowRadius: 10,
            color: 'white',
            fontSize: 22,
            //fontFamily: 'KaushanScript-Regular',
            marginBottom: 50,
            textAlign: 'center',
            paddingHorizontal: 20,
            //fontWeight: 'bold'
        }
    });

}

