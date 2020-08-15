import React from 'react';
import { View } from 'react-native';

import StickersContainer from './StickersContainer';
import StickersSelectCategoryBar from './StickersSelectCategoryBar';

export default class StickersManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stickersCategory: 'bears'
        }

        this.changeCategory = this.changeCategory.bind(this);
    }

    render() {
        const { stickersCategory } = this.state;
        return(
            <>
                {stickersCategory === 'bears' &&
                    <StickersContainer
                        category="bears"
                        numberOfStickers={39}
                        sendSticker={this.props.sendSticker}
                    />
                }
                {stickersCategory === 'couple_one' &&
                    <StickersContainer
                        category="couple_one"
                        numberOfStickers={40}
                        sendSticker={this.props.sendSticker}                        
                    />
                }
                {stickersCategory === 'couple_two' &&
                    <StickersContainer
                        category="couple_two"
                        numberOfStickers={40}
                        sendSticker={this.props.sendSticker}                        
                    />
                }
                {stickersCategory === 'yellow_girl' &&
                    <StickersContainer
                        category="yellow_girl"
                        numberOfStickers={40}
                        sendSticker={this.props.sendSticker}                        
                    />
                }
                <StickersSelectCategoryBar
                    onPressHandler={this.changeCategory}
                />
            </>
        );
    }

    changeCategory(category) {
        this.setState({ stickersCategory: category });
    }

}