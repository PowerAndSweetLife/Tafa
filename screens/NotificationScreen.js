import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react'
import NavBarNotif from '../components/NavBarNotif'
import ContenuNotif from '../components/ContenuNotif'






const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
       <NavBarNotif />
       <ContenuNotif />   

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
export default NotificationScreen
