import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';





const SkeletonItem = () => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1450,
          useNativeDriver: true,
        })
      ).start();
    }, []);
  
    const translateX = shimmerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-400, 400],
    });
  
    return (
      <View style={styles.container}>
        
      <Animated.View
        style={[
          styles.Scroller,
          { backgroundColor: '#f2f2f2', transform: [{ translateX }] },
        ]}
      />
        <Animated.View
          style={[
            styles.image,
            { backgroundColor: '#e0e0e0',},
          ]}
        />
        <View style={styles.textContainer}>
          <Animated.View
            style={[
              styles.text,
              { backgroundColor: '#e0e0e0',  },
            ]}
          />
         
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: 150,
      height: 230,
      borderRadius: 10,
      marginLeft: 10,
      marginBottom: 20,
      overflow: 'hidden',
      backgroundColor:'#f2f2f2',
    },
    Scroller: {
        width: '100%',
        height: 230,
        backgroundColor: 'red',
        zIndex: 3,
        position: 'absolute',
      },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 10,
    },
    textContainer: {
      paddingHorizontal: 10,
    },
    text: {
      width: '70%',
      height: 15,
      borderRadius: 5,
      marginBottom: 5,
      backgroundColor:'#e0e0e0',
    },
  });

export default SkeletonItem;
