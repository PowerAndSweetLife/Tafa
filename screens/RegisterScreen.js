import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Register from '../components/Register'

function RegisterScreen() {
  return (
    <SafeAreaView style={styles.Container}>
    <Register />
  
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }


})
export default RegisterScreen