
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import Navbar from '../components/Navbar'
import Contenu from '../components/Contenu'
import Footer from '../components/Footer'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Navbar />
      <Contenu />
      <Footer />

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
