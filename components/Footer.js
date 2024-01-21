import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {

  const navigation = useNavigation();
       
  const onPressRencontre = () => {
    navigation.navigate('Rencontres');
  };






  return (
    <View style={styles.footerfixed}>
      <View style={styles.footer}>

        <Pressable style={styles.Icon} onPress={() => this.changeText('localisation')}>
          <Ionicons name="home" size={25} color="lightgray" />
          <Text style={styles.colortext}>Accueil</Text>
        </Pressable>

        <Pressable style={styles.Icon} onPress={onPressRencontre}>
          <Ionicons name="location" size={25} color="#f94990" />
          <Text style={styles.colortext}>Rencontres</Text>
        </Pressable>


        <Pressable style={styles.Icon} onPress={() => this.changeText('localisation')}>
          <Ionicons name="chatbubble-ellipses" size={25} color="#f94990" />
          <Text style={styles.colortext}>Messages</Text>
        </Pressable>

        <Pressable style={styles.Icon} onPress={() => this.changeText('heart')}>
          <Ionicons name="heart" size={25} color="#f94990" />
          <Text style={styles.colortext}>Match</Text>
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
  },
  colortext: {
    color: '#06668f',
    fontWeight: 'bold',

  }
});


export default Footer