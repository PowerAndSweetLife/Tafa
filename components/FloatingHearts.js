import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class FloatingHearts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hearts: [],
        };
        this.animations = [];
    }

    componentDidMount() {
        const colors = ['#79328d', '#f94990', 'red'];
        const hearts = Array.from({ length: 100 }).map((_, index) => {
            return {
                animation: new Animated.Value(0),
                x: Math.random() * 600,
                y: Math.random() * 400,
                size: Math.random() * 20 + 40, // Adjust size range as needed
                //color: this.randomColor(),
               // color: index % 2 === 0 ? '#79328d' : '#f94990',
               color: colors[index % colors.length],
            };
        });

        this.setState({ hearts }, () => {
            this.state.hearts.forEach((heart, index) => {
                this.animateHeart(index);
            });
        });
    }

    componentWillUnmount() {
        this.animations.forEach(anim => anim.stop());
    }

    randomColor() {
        return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
    }

    animateHeart(index) {
        const anim = Animated.timing(this.state.hearts[index].animation, {
            toValue: 1,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
        });
        this.animations.push(anim);
        anim.start(() => {
            this.state.hearts[index].animation.setValue(0);
            this.animateHeart(index);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.hearts.map((heart, index) => {
                    const translateY = heart.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-800, 300],
                    });

                    const opacity = heart.animation.interpolate({
                        inputRange: [0, 0.9, 1],
                        outputRange: [0, 1, 0],
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.heart,
                                {
                                    transform: [{ translateY }],
                                    opacity,
                                    left: heart.x,
                                    top: heart.y,
                                    width: heart.size,
                                    height: heart.size,
                                },
                            ]}
                        >
                            <Ionicons name="heart-outline" size={heart.size} color={heart.color} />
                        </Animated.View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex:4,
    },
    heart: {
        position: 'absolute',
    },
});

export default FloatingHearts;
