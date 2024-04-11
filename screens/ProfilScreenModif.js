
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import NavProfilModif from '../components/NavProfilModif'
import AproposInterfacemodif from '../components/AproposInterfacemodif';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Navbar />
      <NavProfilModif />
      <AproposInterfacemodif/>

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
export default HomeScreen
