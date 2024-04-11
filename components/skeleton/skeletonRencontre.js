import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const SkeletonItem = () => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnimation, {
                toValue: 1,
                duration: 1250,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-400, 400],
    });

    return (
        <View style={styles.contenu}>
            <View style={styles.container}>
                
            <Animated.View
                        style={[
                            styles.image,
                            { backgroundColor: '#f2f2f2', height: 550, width: '10%',position: 'absolute',zIndex:3,transform: [{ translateX }] },
                        ]}
                    />
                <View style={styles.imageWrapper}>
                    
                </View>


                <View style={styles.NomEtStatut}>
                    <View
                        style={[
                            styles.nom,
                            {
                                backgroundColor: '#e0e0e0',
                                height: 15,
                                width: '50%',
                                marginBottom: 5,
                                zIndex:1,
                            },
                        ]}
                    />


                    <View
                        style={[
                            styles.statutContainer,
                            {
                                width: '30%',
                                backgroundColor: '#e0e0e0',
                                height: 15,
                                borderRadius: 5,
                                zIndex:1,

                            },
                        ]}
                    />
                </View>

                <View style={styles.emojieContenu}>
                    <View
                        style={[
                            styles.Circle,
                            {
                                backgroundColor: '#e0e0e0',
                                borderRadius: 50,
                                width: 60,
                                paddingTop: 5,
                                height: 60,
                                marginRight: 5,
                                zIndex:1,
                            },

                        ]}
                    />


                    <View
                        style={[
                            styles.Circle1,
                            {
                                borderRadius: 50,
                                width: 60,
                                paddingTop: 5,
                                height: 60,
                                backgroundColor: '#e0e0e0',
                                marginLeft: 5,
                                zIndex:1,
                            },
                        ]}
                    />
                </View>


            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    contenu: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
               paddingRight: 8,
    },

    container: {
        width: '100%',
        minWidth: '100%',
        height: 300,
        borderRadius: 7,
        display: 'flex',
            marginLeft: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -150,
    },
  
    NomEtStatut: {
        top: -110,
        borderRadius:50,
        display: 'flex',
        justifyContent: 'flex-start',
        width: '90%',
        height: 80,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 10,
        position: 'absolute',
        zIndex:1,
    },
   
    imageWrapper: {
     //   overflow: 'hidden',
        borderRadius: 20,
        width: '95%',
        height: 550,
        borderRadius: 7,
        backgroundColor: '#f2f2f2', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
    },
    emojieContenu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: 100,
        position: 'absolute',
        zIndex:1,
        bottom: -100,
    },
  
});

export default SkeletonItem;
