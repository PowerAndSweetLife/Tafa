import { StyleSheet, Text, View, Image, Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from "../helper/url";





const NavMessage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params.userData;
  
  console.log( 'test',route.params.userData); // Check if userData is received correctly
  

  const onPressBack = () => {
    navigation.goBack();
  };

  return (


    <View style={styles.NavBar}>

      <View style={styles.imageContainer}>
        <Pressable style={styles.IconBack} onPress={onPressBack}>
          <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
        </Pressable>
      </View>
      <View style={styles.contenuProfile}>

        <View style={styles.IMageContenu}>
          <Image source={{ uri: BASE_URL + userData.img_link }} style={styles.IMage} ></Image>

        </View>

        <View style={styles.TextContenu}>
          <View style={styles.description}>
            <Text style={styles.nom}>{userData.Nom}</Text>
            <Text >EnLigne</Text>
          </View>

        </View>
      </View>

    </View>


  )
}


const styles = StyleSheet.create({


  NavBar: {
    marginTop: 30,
    paddingBottom: 10,
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },

  iconcontainer: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  Icon: {
    marginRight: 10,
    height: 60,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
  },
  IconBack: {
    marginRight: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',

  },

  Notification: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  contenuProfile: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    alignItems: 'center',
  },

  IMage: {
    width: 50,
    height: 50,
    borderRadius: 50,
   },
  TextContenu: {
    width: '65%',
    paddingLeft: 10,
  },
  nom: {
    fontSize: 15,

  },

})


export default NavMessage