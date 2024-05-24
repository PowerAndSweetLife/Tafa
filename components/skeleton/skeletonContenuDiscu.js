import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useEffect, useRef,useUser } from 'react';
import { useTheme } from '../context/usercontexttheme';


const SkeletonItem = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const { isDarkMode } = useTheme();
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
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
    <View style={[styles.contenu, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]} >
    
      <View style={styles.ContenuProfil}>
      
        <View
          style={[
            styles.image,
            { backgroundColor: '#e0e0e0', width: 50,
            height: 50,
            borderRadius: 25, },
          
          ]}
        />
      </View>
      <View style={styles.ContenuNom}>
        <View style={styles.nomContainer}>
          <View
            style={[styles.nom]}
          >
  <Animated.View
        style={[
          styles.Scroller,
          { backgroundColor: isDarkMode ? '#000000' : '#ffffff',width:'70%',  height: 15,
          zIndex:3, 
          position: 'absolute',transform: [{ translateX }] },
        ]}
      />

         </View>   
        </View>
        <View style={styles.messageContainer}>
          <View
            style={[
              styles.message,
              { backgroundColor: '#e0e0e0', width: '90%' },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenu: {
    display: 'flex',
    flexDirection: 'row',
    
    height: 70,
    borderRadius: 7,
    paddingTop: 7,
    justifyContent: 'center',
 
  },
  ContenuProfil: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    zIndex:1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ContenuNom: {
    flex: 1,
    justifyContent: 'center',
  },
  nomContainer: {
    marginBottom: 5,
  },
  nom: {
    height: 15,
    borderRadius: 5,
    backgroundColor: '#e0e0e0', width: '70%' 
  },
  messageContainer: {
    height: 45,
  },
  message: {
    height: 15,
    borderRadius: 5,
  },
  
});

export default SkeletonItem;
