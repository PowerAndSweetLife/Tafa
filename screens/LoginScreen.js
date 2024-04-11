import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import ContenuLogin from '../components/Login/ContenuLogin';   

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <ContenuLogin />
      
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    flexWrap:'nowrap',
  }
});

export default LoginScreen;
