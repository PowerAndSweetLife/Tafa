import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView,ScrollView } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import NavSearch from '../components/NavsearchMessages'
import ContenuSearchMessage from '../components/ContenuSearchMessage'






const MessagesearchScreen = () => {
    return (
        <SafeAreaView style={styles.Container}>
            <NavSearch />
            <ScrollView  style={styles.scrollView}>
            <ContenuSearchMessage />
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


export default MessagesearchScreen