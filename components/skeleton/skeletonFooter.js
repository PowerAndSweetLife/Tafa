import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/usercontexttheme';



const SkeletonProfile = () => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;
    const { isDarkMode } = useTheme();
    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnimation, {
                toValue: 2,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-400, 400],
    });
    return (
        <View  style={[styles.Contenair, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>

            <View style={styles.Pressable}>

            </View>


            <View style={styles.Pressable}>

            </View>

            <View style={styles.Pressable}>

            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    Contenair: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        
    },
    Pressable: {
        backgroundColor: '#e0e0e0',
        width: '92%',
        paddingTop: 5,
        borderRadius: 11,
        height: 30,
        marginBottom: 10,

    },
});

export default SkeletonProfile;
