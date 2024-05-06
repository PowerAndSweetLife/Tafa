import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useTheme } from './context/usercontexttheme';
import { useState, useEffect } from 'react';

const logo = require('../assets/images/logo.png');
import loadFonts from './loadFonts';


function Initialiseinterface() {

  useEffect(() => {
    loadFonts();
  }, []);
 

  const { isDarkMode } = useTheme();


  return (
    <View style={[style.Containertextinfo, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
            <View style={style.contenuLogo}>
              <Image source={logo} style={style.Logo} />
            </View>
            <View style={style.porteurText}>
              <Text style={{ fontFamily: 'custom-fontmessage', fontSize: 15, fontWeight: 'light', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} > vous permet de rencontrer de nouvelles personnes.</Text>

            </View>
            

          </View>
          
  );

}
const style = StyleSheet.create({
  
 
  Containertextinfo: {
    width: '100%',
    height: 300,
        display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  contenuLogo: {
    width: 120,
    height: 40,

  },
  Logo: {
    width: 120,
    height: 40,

  },
  porteurText: {
    marginTop: 10,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
 });

export default Initialiseinterface;
