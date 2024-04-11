
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
//import NavProfilModif from '../components/NavProfilModif'
import ProfilModif from '../components/ProfilModif'
import MenuNavbar from '../components/MenuNavbar';
//import AproposInterfacemodif from '../components/AproposInterfacemodif';

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <MenuNavbar />
    <ProfilModif/>
      
        
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }


})
export default MenuScreen
