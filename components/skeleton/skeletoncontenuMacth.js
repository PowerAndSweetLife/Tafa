import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useEffect, useRef,useState } from 'react';

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
    
    <View style={styles.contenu}>


      <View style={styles.container}>
      <View style={styles.imageWrapper}>
          <Animated.View
            style={[
              styles.image,
              { backgroundColor:'#f2f2f2', transform: [{ translateX }] },
            ]}
          />
        </View>
        <View style={styles.NomEtStatut}>
          
          <View
            style={[
              styles.nom,
              { backgroundColor: '#e0e0e0', height: 15, width: '70%' },
            ]}
          />
          <View
            style={[
              styles.statutContainer,
              {
                backgroundColor: '#e0e0e0',
                height: 8,
                width: 8,
                borderRadius: 4,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.container}>
      <View style={styles.imageWrapper}>
          <Animated.View
            style={[
              styles.image,
              { backgroundColor:'#f2f2f2', transform: [{ translateX }] },
            ]}
          />
        </View>
        <View style={styles.NomEtStatut}>
          <View
            style={[
              styles.nom,
              { backgroundColor: '#e0e0e0', height: 15, width: '70%' },
            ]}
          />
          <View
            style={[
              styles.statutContainer,
              {
                backgroundColor: '#e0e0e0',
                height: 8,
                width: 8,
                borderRadius: 4,
              },
            ]}
          />
        </View>
      </View>
      
      <View style={styles.container}>
      <View style={styles.imageWrapper}>
          <Animated.View
            style={[
              styles.image,
              { backgroundColor:'#f2f2f2', transform: [{ translateX }] },
            ]}
          />
        </View>
        <View style={styles.NomEtStatut}>
          <View
            style={[
              styles.nom,
              { backgroundColor: '#e0e0e0', height: 15, width: '70%' },
            ]}
          />
          <View
            style={[
              styles.statutContainer,
              {
                backgroundColor: '#e0e0e0',
                height: 8,
                width: 8,
                borderRadius: 4,
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
    paddingTop: 15,
    paddingRight: 8,
  },
 
  container: {
    width: '30.4%',
    minWidth: '30%',
    height: 145,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2.5%',
   //backgroundColor:'#f2f2f2',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 7,
    marginBottom: 10,
 
    backgroundColor: '#e0e0e0', // Ajouter une couleur de fond pour l'image
    backgroundImage: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)', // Ajouter un dégr
  },
  NomEtStatut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  nom: {
    width: '70%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#f2f2f2', // Ajouter une couleur de fond
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  statutContainer: {
    marginLeft: 5,
    backgroundColor: '#f0f0f0', 
  },
  imageWrapper: {
    overflow: 'hidden',
    width: '100%',
    height: 120,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor:'#e0e0e0', // Ajouter une couleur de fond
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Ajouter une ombre douce
  },
});

export default SkeletonItem;
