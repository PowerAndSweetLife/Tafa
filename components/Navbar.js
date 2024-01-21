import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/images/logo.png');


const Navbar = () => {
  const navigation = useNavigation();

  const onPressRecherche = () => {
    navigation.navigate('Recherche');
  };
  const onPressNotification = () => {
    navigation.navigate('Notification');
  };


  return (



    <View style={styles.NavBar}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={{ width: "100%", height: "100%" }} />

      </View>
      <View style={styles.iconcontainer}>
        <Pressable style={styles.Icon} onPress={onPressRecherche}>
          <Ionicons name="search" size={25} color="#f94990" />
        </Pressable>

        <Pressable style={styles.Icon} onPress={onPressNotification}>
          <Ionicons name="notifications" size={25} color="#f94990" />
        </Pressable>

        <Pressable style={styles.Icon3} onPress={() => this.changeText('search3')}>
          <Ionicons name="menu" size={30} color="#f94990" />
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}


const styles = StyleSheet.create({


  NavBar: {
    
     marginTop:30,
    paddingBottom: 10,
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 25,
    marginTop: 13,
    marginLeft: 10,
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,

  },
  Icon: {
    marginRight: 10,
  },
  Icon3: {
    marginTop: -4,
    marginRight: 10,
  }


})


export default Navbar