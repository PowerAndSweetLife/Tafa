import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const NavBarNotif = () => {
  const navigation = useNavigation();

  const onPressRecherche = () => {
    navigation.navigate('Recherche');
  };
  const onPressBack = () => {
    navigation.navigate('Accueil');
};


  return (



    <View style={styles.NavBar}>
      <View style={styles.imageContainer}>
      <Pressable style={styles.IconBack} onPress={onPressBack}>
          <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
        </Pressable>

      </View>
      <View style={styles.iconcontainer}>
        <Pressable style={styles.Icon} onPress={onPressRecherche}>
          <Ionicons name="search" size={25} color="#f94990" />
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
  IconBack: {
    marginTop: -4,
    marginRight: 10,
  }


})


export default NavBarNotif