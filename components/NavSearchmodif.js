import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button, SafeAreaView, } from 'react-native';

import React from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const NavSearchmodif = () => {

    const [inputValue, setInputValue] = useState('');


    const navigation = useNavigation();
    const onPressBack = () => {
        navigation.navigate('Recherche');
    };
    /*const [searchText, setSearchText] = useState('');
        const [lastSearch, setLastSearch] = useState('');
        const [searchResults, setSearchResults] = useState([]);
    
        const handleInputChange = (inputText) => {
            setSearchText(inputText);
        };
        const handleClearPress = () => {
            setLastSearch('');
        };
    
        const handleSearch = () => {
            setLastSearch(searchText);
            // Autres actions de recherche...
        };
    
        const renderSearchResult = ({ item }) => {
            return (
                <View style={styles.resultItem}>
                    <Text>{item}</Text>
                </View>
            );
        };*/
    const [searchTerm, setSearchTerm] = useState('');



    const handleSearch = () => {
        navigation.navigate('Resultats', { searchTerm });

    };



    return (
        <View>
            <View style={styles.NavBar}>
                <View style={styles.IconBack}>
                    <Pressable onPress={onPressBack}>
                        <Ionicons name="ios-arrow-back" size={30} color="#f94990" />
                    </Pressable>

                </View>
                <View>

                    <TextInput style={styles.Input} placeholder="Rechercher..."
                        value={searchTerm}
                        onChangeText={setSearchTerm} />

                </View>

                <View style={styles.iconcontainer}>
                    <Pressable style={styles.Icon} onPress={handleSearch}>
                        <Ionicons name="search" size={30} color="#f94990" />
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
        height: 50,
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
    Input: {
        width: 330,
        height: 40,
        borderColor: "#555",
        borderWidth: 1,
        marginTop: 5,
        padding: 10,
        left: 10,
        borderRadius: 20,

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
        left: 10,
        marginTop: 5,

    },
    tout: {
        display: 'flex',
        flexDirection: 'column',
    },





})


export default NavSearchmodif