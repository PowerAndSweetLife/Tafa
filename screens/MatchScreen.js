import React from 'react';
import { SafeAreaView, StyleSheet,View,Text } from 'react-native';
import Navbar from '../components/Navbar';
import Contenu from '../components/ContenuMatch';
import Footer from '../components/FooterMatch';
import { useNavigation } from '@react-navigation/native';

const MatchScreen = ({ route }) => {
  const navigation = useNavigation();

  
  return (
    <SafeAreaView style={styles.Container}>
      <Navbar />
      <Contenu  /> 
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});


export default MatchScreen;
