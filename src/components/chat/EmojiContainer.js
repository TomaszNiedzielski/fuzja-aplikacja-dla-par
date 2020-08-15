import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableNativeFeedback } from 'react-native';

//import Emoji from 'react-native-emoji';
//import EmojiSelectCategoryBar from './EmojiSelectCategoryBar';

export default class EmojiContainer extends React.Component {

    state = {
        emojis: [
            {
                name: 'hotdog',
                unicode: 0x1F32D
            },
            {
                name: 'taco',
                unicode: 0x1F32E
            },
            {
                name: 'burrito',
                unicode: 0x1F32F
            },
            {
                name: 'chestnut',
                unicode: 0x1F330
            },
            {
                name: 'seedling',
                unicode: 0x1F331
            },
            {
                name: 'evergreen_tree',
                unicode: 0x1F332
            },
            {
                name: 'deciduous_tree',
                unicode: 0x1F333
            },
            {
                name: 'palm_tree',
                unicode: 0x1F334
            },
            {
                name: 'cactus',
                unicode: 0x1F335
            },
            {
                name: 'hot_pepper',
                unicode: 0x1F336
            },
            {
                name: 'tulip',
                unicode: 0x1F337
            },
            {
                name: 'cherry_blossom',
                unicode: 0x1F338
            },
            {
                name: 'rose',
                unicode: 0x1F339
            },
            {
                name: 'hibiscus',
                unicode: 0x1F33A
            },
            {
                name: 'sunflower',
                unicode: 0x1F33B
            },
            {
                name: 'blossom',
                unicode: 0x1F33C
            },
            {
                name: 'corn',
                unicode: 0x1F33D
            },
            {
                name: 'ear_of_rice',
                unicode: 0x1F33E
            },
            {
                name: 'herb',
                unicode: 0x1F33F
            },
            {
                name: 'four_leaf_clover',
                unicode: 0x1F340
            },
            {
                name: 'maple_leaf',
                unicode: 0x1F341
            },
            {
                name: 'fallen_leaf',
                unicode: 0x1F342
            },
            {
                name: 'leaves',
                unicode: 0x1F343
            },
            {
                name: 'mushroom',
                unicode: 0x1F344
            },
            {
                name: 'tomato',
                unicode: 0x1F345
            },
            {
                name: 'eggplant',
                unicode: 0x1F346
            },
            {
                name: 'grapes',
                unicode: 0x1F347
            },
            {
                name: 'melon',
                unicode: 0x1F348
            },
            {
                name: 'watermelon',
                unicode: 0x1F349
            },
            {
                name: 'tangerine',
                unicode: 0x1F34A
            },
            {
                name: 'lemon',
                unicode: 0x1F34B
            },
            {
                name: 'banana',
                unicode: 0x1F34C
            },
            {
                name: 'pineapple',
                unicode: 0x1F34D
            },
            {
                name: 'apple',
                unicode: 0x1F34E
            },
            {
                name: 'green_apple',
                unicode: 0x1F34F
            },
            {
                name: 'pear',
                unicode: 0x1F350
            },
            {
                name: 'peach',
                unicode: 0x1F351
            },
            {
                name: 'cherries',
                unicode: 0x1F352
            },
            {
                name: 'strawberry',
                unicode: 0x1F353
            },
            {
                name: 'hamburger',
                unicode: 0x1F354
            },
            {
                name: 'pizza',
                unicode: 0x1F355
            },
            {
                name: 'meat_on_bone',
                unicode: 0x1F356
            },
            {
                name: 'poultry_leg',
                unicode: 0x1F357
            },
            {
                name: 'rice_cracker',
                unicode: 0x1F358
            },
            {
                name: 'rice_ball',
                unicode: 0x1F359
            },
            {
                name: 'rice',
                unicode: 0x1F35A
            },
            {
                name: 'curry',
                unicode: 0x1F35B
            },
            {
                name: 'ramen',
                unicode: 0x1F35C
            },
            {
                name: 'spaghetti',
                unicode: 0x1F35D
            },
            {
                name: 'bread',
                unicode: 0x1F35E
            },
            {
                name: 'fries',
                unicode: 0x1F35F
            },
            {
                name: 'sweet_potato',
                unicode: 0x1F360
            },
            {
                name: 'dango',
                unicode: 0x1F361
            },
            {
                name: 'oden',
                unicode: 0x1F362
            },
            {
                name: 'sushi',
                unicode: 0x1F363
            },
            {
                name: 'fried_shrimp',
                unicode: 0x1F364
            },
            {
                name: 'fish_cake',
                unicode: 0x1F365
            },
            {
                name: 'icecream',
                unicode: 0x1F366
            },
            {
                name: 'shaved_ice',
                unicode: 0x1F367
            },
            {
                name: 'ice_cream',
                unicode: 0x1F368
            },
            {
                name: 'doughnut',
                unicode: 0x1F369
            },
            {
                name: 'cookie',
                unicode: 0x1F36A
            },
            {
                name: 'chocolate_bar',
                unicode: 0x1F36B
            },
            {
                name: 'candy',
                unicode: 0x1F36C
            },
            {
                name: 'lollipop',
                unicode: 0x1F36D
            },
            {
                name: 'custard',
                unicode: 0x1F36E
            },
            {
                name: 'honey_pot',
                unicode: 0x1F36F
            },
            {
                name: 'cake',
                unicode: 0x1F370
            },
            {
                name: 'bento',
                unicode: 0x1F371
            },
            {
                name: 'stew',
                unicode: 0x1F372
            },
            {
                name: 'fried_egg',
                unicode: 0x1F373
            },
            {
                name: 'fork_and_knife',
                unicode: 0x1F374
            },
            {
                name: 'tea',
                unicode: 0x1F375
            },
            {
                name: 'sake',
                unicode: 0x1F376
            },
            {
                name: 'wine_glass',
                unicode: 0x1F377
            },
            {
                name: 'cocktail',
                unicode: 0x1F378
            },
            {
                name: 'tropical_drink',
                unicode: 0x1F379
            },
            {
                name: 'beer',
                unicode: 0x1F37A
            },
            {
                name: 'beers',
                unicode: 0x1F37B
            },
            {
                name: 'baby_bottle',
                unicode: 0x1F37C
            },
            {
                name: 'knife_fork_plate',
                unicode: 0x1F37D
            },
            {
                name: 'champagne',
                unicode: 0x1F37E
            },
            {
                name: 'popcorn',
                unicode: 0x1F37F
            },
        ]
    }

    render() {
        const { emojis } = this.state;
        return(
            <>
                <View style={styles.container}>
                    <Text style={styles.title}>Emoji</Text>
                    <ScrollView>
                    <View style={styles.emojisBoard}>
                        {
                            emojis.map(emoji => {
                                return(
                                    <TouchableNativeFeedback
                                        key={emoji.name}
                                        onPress={() => this.props.selectEmoji(emoji.unicode)}
                                    >
                                        <View style={styles.emojiWrapper}>
                                            <Emoji name={emoji.name} style={{fontSize: 30}} />
                                        </View>
                                    </TouchableNativeFeedback>
                                )
                            })
                        }
                    </View>
                    </ScrollView>
                </View>
                <EmojiSelectCategoryBar/>
            </>
        );
    }

    componentDidMount() {
        
    }


}

const styles = StyleSheet.create({
    container: {
        height: 270,
        width: '100%',
        position: 'absolute',
        bottom: 50,
        borderTopWidth: 1
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    emojisBoard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    emojiWrapper: {
        padding: 5
    }
});