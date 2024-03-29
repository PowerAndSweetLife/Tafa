import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button, SafeAreaView, FlatList } from 'react-native';

import React from 'react'
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const NavSearch = () => {

    const [inputValue, setInputValue] = useState('');

    const navigation = useNavigation();
    const onPressBack = () => {
        navigation.navigate('Accueil');
    };


    //dernier recherche(7jours)
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const initialSearches = [
            { term: 'monsieur', date: new Date() },
            { term: 'mathieu', date: new Date() },
            { term: 'miary', date: new Date() },
            { term: 'ndeba', date: new Date() },
            // ... d'autres recherches
        ];

        setRecentSearches(initialSearches);
    }, []);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSearchesWithin7Days = recentSearches.filter(
        (search) => new Date(search.date) >= sevenDaysAgo
    );

    const handleDeleteSearch = (index) => {
        // Copiez le tableau de recherches récentes actuel
        const updatedSearches = [...recentSearches];
        // Supprimez l'élément à l'index donné
        updatedSearches.splice(index, 1);
        // Mettez à jour le state avec le nouveau tableau
        setRecentSearches(updatedSearches);
    };










    /*const [searchText, setSearchText] = useState('');
        const [lastSearch, setLastSearch] = useState('');
        const [searchResults, setSearchResults] = useState([]);
    
        const handleInputChange = (inputText) => {
            setSearchText(inputText);
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
        // Vérifiez si l'input est rempli avant de permettre l'action
        if (inputValue.trim() !== '') {
            // Faites quelque chose ici
            console.log('Action effectuée !');
        } else {
            // L'input n'est pas rempli, affichez un message ou effectuez une action appropriée
            console.log('Veuillez remplir l\'input.');
        }
    };







    return (
        <View>
            <View style={styles.NavBar}>
                <View style={styles.IconBack}>
                    <Pressable onPress={onPressBack}>
                        <Ionicons name="ios-arrow-back" size={30} color="#f94990" />
                    </Pressable>

                </View>
                <View style={styles.Input}>

                    <TextInput placeholder="Rechercher..."
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)} />
                </View>

                <View style={styles.iconcontainer}>
                    <Pressable  style={({ pressed }) => [
                        styles.Icon,pressed ,]}
                        onPress={handleSearch}
                        disabled={searchTerm.length === 0}
                    >
                        <Ionicons name="search" size={30} color="#f94990" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.tout} >
                <View style={styles.recentcont}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Récent</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: "blue", marginRight: 5 }}>Voir tout</Text>
                </View>
                <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row,', marginLeft: 10 }}>
                    <FlatList
                        data={recentSearchesWithin7Days}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View>
                                <View style={styles.REcentbox}>
                                    <Text>{item.term}</Text>
                                    <Pressable style={styles.IconSuppr} onPress={() => handleDeleteSearch(index)}>
                                        <Ionicons name="close" size={25} />
                                    </Pressable>
                                </View>

                            </View>
                        )}
                    />

                </View>
            </View>

        </View>



    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',


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
    IconSuppr: {
        marginRight: 10,
    },
    tout: {
        display: 'flex',
        flexDirection: 'column',
    },

    recentcont: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    recent: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchcontainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly',
        textAlign: 'center',

    },
    REcentbox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }



})


export default NavSearch