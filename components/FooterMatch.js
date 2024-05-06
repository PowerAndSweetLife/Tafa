import { StyleSheet, Text, View, Pressable,} from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './context/usercontexttheme';
import loadFonts from './loadFonts';
import  { useState, useEffect } from 'react';



const Footer = () => {

  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const onPressHome = () => {
    navigation.navigate('Accueil');
  };
  const onPressRencontre = () => {
    navigation.navigate('Rencontres');
  };
  const onPressMatch = () => {
    navigation.navigate('Match');
  };
  const onPressMessage = () => {
    navigation.navigate('Discussions');
  };

;


useEffect(() => {
  loadFonts();
}, []);




  return (
    <View   style={[styles.footerfixed, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={styles.footer}>

        <Pressable style={styles.Icon} onPress={onPressHome}>
          <Ionicons name="home" size={20} color="lightgrey" />
          <Text  style={[styles.Accueil,{ fontFamily: 'custom-font'}]}>Accueil</Text>
        </Pressable>

        <Pressable style={styles.Icon} onPress={onPressRencontre}>
          <Ionicons name="location" size={20} color="lightgrey" />
          <Text  style={[styles.colortext,{ fontFamily: 'custom-font'}]}>Rencontres</Text>
        </Pressable>


        <Pressable style={styles.Icon} onPress={onPressMessage}>
          <Ionicons name="chatbubble-ellipses" size={20} color="lightgrey" />
          <Text  style={[styles.colortext,{ fontFamily: 'custom-font'}]}>Messages</Text>
        </Pressable>

        <Pressable style={styles.Icon} onPress={onPressMatch}>
          <Ionicons name="heart" size={20} color="#f94990" />
          <Text  style={[styles.Match,{ fontFamily: 'custom-font'}]}>Match</Text>
        </Pressable>

      </View>
    </View>


  )
}


const styles = StyleSheet.create({
  footerfixed: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
    backgroundColor: 'white',
  },
  footer: {

    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingTop: 10,
    justifyContent: 'space-evenly',
    bottom: '0',
  },
  Icon: {
    alignItems: 'center',
    
    width:100,
  },
  Accueil: {
    color: 'lightgrey',
   // fontWeight: 'bold',
    fontSize:10,
  },
  colortext: {
    color: 'lightgrey',
   // fontWeight: 'bold',
    fontSize: 10,
  },
  Match:{
    color: '#f94990',
   // fontWeight: 'bold',
    fontSize: 10,
  },
});


export default Footer