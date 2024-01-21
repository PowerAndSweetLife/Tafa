import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView,ScrollView } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import NavSearch from '../components/NavSearch'
import Suggestion from '../components/Suggestion'
import Invitation from '../components/Invitation'


const logo = require('../assets/images/logo.png');


const RechercheScreen = () => {
    return (
        <SafeAreaView style={styles.Container}>
            <NavSearch />
            <ScrollView  style={styles.scrollView}>
            <Suggestion />
            </ScrollView>
               


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


export default RechercheScreen