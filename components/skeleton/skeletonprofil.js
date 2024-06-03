import React from 'react';
import { View,Animated, StyleSheet } from 'react-native';
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
    <View  style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      
      <View style={styles.coverImage}>
      <Animated.View
        style={[
          styles.Scroller,
          { backgroundColor: '#f2f2f2',width: '100%',
          height: 250,
          zIndex:3, 
          position: 'absolute',transform: [{ translateX }] },
        ]}
      />
      </View>
      <View style={styles.profileImage}></View>
      <View style={styles.name}></View>
      <View style={styles.description}></View>
      <View style={styles.buttons}>
        <View style={[styles.button, styles.aboutButton]}></View>
        <View style={[styles.button, styles.photosButton]}></View>
        <View style={[styles.button, styles.MessageButton]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
   // alignItems: 'center',
   height:550,
  },
  coverImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
    borderRadius: 15,
  },
  profileImage: {
    
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    marginBottom: 15,
    width:100,
    height:100,
    borderRadius: 100,
    marginLeft: 20,
    borderWidth:1,
    borderColor:'#f2f2f2',
    
justifyContent:'flex-start',
    marginTop: -50,
    display:'flex',
    flexDirection:'column',
  },
  name: {
    width: '20%',
    height: 20,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius:7,
  },
  description: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
    borderRadius:7,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    width: '25%',
    height: 22,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    left:-3,
  },
  aboutButton: {
    backgroundColor: '#e0e0e0',
    
  },
  photosButton: {
    backgroundColor: '#e0e0e0',
  },
  MessageButton:{
    backgroundColor: '#e0e0e0',
  },
});

export default SkeletonProfile;
