import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // Importez le composant StatusBar de expo-status-bar
import NavBarmodifie from '../components/NavBarmodifie';
import AproposInterfacemodif from '../components/AproposInterfacemodif';

import { useTheme } from '../components/context/usercontexttheme';

const AproposModifScreen = () => {
  const { isDarkMode } = useTheme();
  const statusBarColor = isDarkMode ? '#000000':'#ffffff';
  const statusBarstyle = isDarkMode ? 'light' : 'dark-content';
 
  return (
    <View style={[styles.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
    
      <StatusBar style={statusBarstyle} backgroundColor={statusBarColor} />
      <NavBarmodifie />
      <ScrollView>
      <AproposInterfacemodif />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default AproposModifScreen;