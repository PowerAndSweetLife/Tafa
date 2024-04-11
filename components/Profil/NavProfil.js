import { StyleSheet, Text, View, Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const NavBarNotif = () => {
  const navigation = useNavigation();

  
  const onPressBack = () => {
    navigation.goBack();
  };



  return (

    <View style={styles.NavBar}>
      <View style={styles.imageContainer}>
      <Pressable style={styles.IconBack} onPress={onPressBack}>
          <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
        </Pressable>
        <Text style={styles.Notification}>Profil</Text>

      </View>
      
   
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
    backgroundColor:'white'
  },
  imageContainer: {
    width: 70,
    height: 50,
    marginLeft: 10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    width:300,

  
    
  },
  iconcontainer: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems:'center',

  },
  Icon: {
    marginRight: 10,
    
  },
  IconBack: {
    
    marginRight: 10,
    

  },

  Notification:{
     fontSize:17,
     fontWeight:'bold',
  },


})


export default NavBarNotif