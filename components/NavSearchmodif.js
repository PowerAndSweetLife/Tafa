import { StyleSheet,  View, Pressable, TextInput,  } from 'react-native';
import React from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './context/usercontexttheme';



const NavSearchmodif = () => {

    const [inputValue, setInputValue] = useState('');

    const { isDarkMode } = useTheme();
    const navigation = useNavigation();
    const onPressBack = () => {
        navigation.goBack();
      };
  
        
    const [searchTerm, setSearchTerm] = useState('');



    const handleSearch = () => {
        navigation.navigate('Resultats', { searchTerm });

    };



    return (
        <View>
            <View  style={[styles.NavBar, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                <View style={styles.IconBack}>
                    <Pressable onPress={onPressBack}>
                        <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
                    </Pressable>

                </View>
                <View style={styles.ContenuInput} >
                <TextInput placeholder="Rechercher..."  style={[styles.Input, { borderColor: isDarkMode ? '#ffffff':'#000000' , color: isDarkMode ? '#ffffff':'#000000',borderWidth: 1,}]}
                        value={searchTerm}
                        placeholderTextColor={isDarkMode ? 'white' : 'gray'}
                        onChangeText={(text) => setSearchTerm(text)} />

                </View>

                <View style={styles.iconcontainer}>
                    <Pressable style={styles.Iconsearch} onPress={handleSearch}>
                        <Ionicons name="search" size={25} color="#f94990" />
                    </Pressable>
                </View>
            </View>



        </View>



    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    NavBar: {
        marginTop: 30,
        paddingBottom: 10,
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {

        height: 25,
        marginTop: 13,
        paddingLeft: -10,
        justifyContent: 'center',


    },
    Iconsearch:{
        left:5,
    },
    ContenuInput:{
        width: '80%',
        height: 25,
    },
    
    Input: { 
    width: '100%',
    height: 25,
    borderColor: "#555",
    borderWidth: 1,
    paddingLeft:10,
    left: 10,
    borderRadius: 20,
         fontSize:10,

    },
    iconcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 5,
        left: 10,

    },

    IconBack: {
        left: 5,
        marginTop: 5,

    },
    tout: {
        display: 'flex',
        flexDirection: 'column',
    },





})


export default NavSearchmodif