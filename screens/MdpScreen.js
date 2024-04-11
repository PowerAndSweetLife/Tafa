import { View, Text,StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import ContenuMdp from '../components/Mdp/ContenuMdp'


const MdpScreen = () => {
  return (
    <SafeAreaView style={styles.container}> 
      <ContenuMdp />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        flexDirection:'column',
      }
})
export default MdpScreen;