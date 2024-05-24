import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button, SafeAreaView, FlatList } from 'react-native';
import { useUser } from './context/usercontext';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { insererHistorique } from '../components/firebasehistoriquederecherche';
import { supprimerHistorique } from '../components/firebasesupprimerHistorique';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useTheme } from './context/usercontexttheme';



const NavSearch = () => {
    const { Monprofil } = useUser();
    const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
    const [inputValue, setInputValue] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    

    const [selectedKeys, setSelectedKeys] = useState([]); // État pour stocker toutes les clés sélectionnées

    useEffect(() => {
        const dbRef = ref(getDatabase(), 'Historiquerecherche');
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const filteredData = Object.values(data).filter(item => item.id === Id);
                setRecentSearches(filteredData);
    
                // Récupérer toutes les clés des données
                const keys = Object.keys(data);
              
                setSelectedKeys(keys);
                // Sélectionner la première clé dans le tableau (vous pouvez ajuster cette logique selon vos besoins)
               
            }
        });
    
        return () => unsubscribe();
    }, [Id]);
    
    
    const handleDeleteSearch = (index) => {
        // Récupérer la clé à partir de l'index dans la liste des clés sélectionnées
        const selectedKey = selectedKeys[index];
        
        // Supprimer les clés de la base de données Firebase
        if (selectedKey) {
            supprimerHistorique([selectedKey]); 
            console.log("Clé sélectionnée à envoyer :", selectedKey);
        }
        
        // Supprimer l'élément du state
        const updatedSearches = [...recentSearches];
        updatedSearches.splice(index, 1);
        setRecentSearches(updatedSearches);
    };
    
    
    const onPressBack = () => {
        navigation.goBack();
    };
   

    const [searchTerm, setSearchTerm] = useState('');






    const handleSearch = () => {
        navigation.navigate('ResultatsMessages', { searchTerm });
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
            <View  style={[styles.NavBar, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                <View style={styles.IconBack}>
                    <Pressable onPress={onPressBack}>
                        <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
                    </Pressable>
                </View>
                <View style={styles.ContenuInput}>
                    <TextInput placeholder="Rechercher..."  style={[styles.Input, { borderColor: isDarkMode ? '#ffffff':'#000000' , color: isDarkMode ? '#ffffff':'#000000',borderWidth: 1,}]}
                        value={searchTerm}
                        placeholderTextColor={isDarkMode ? 'white' : 'gray'}
                        onChangeText={(text) => setSearchTerm(text)} />
                </View>
                <View style={styles.iconcontainer}>
                    <Pressable style={({ pressed }) => [styles.Iconsearch, pressed]}
                        onPress={handleSearch}
                        disabled={searchTerm.length === 0}>
                        <Ionicons name="search" size={25} color="#f94990" />
                    </Pressable>
                </View>
            </View>
            <View   style={[styles.tout, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]} >
                <View style={styles.recentcont}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold' ,color: isDarkMode ? '#ffffff':'#000000' }}>Récent</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginRight: 5 ,color: isDarkMode ? '#ffffff':'blue'  }}>Voir tout</Text>
                </View>
                <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row,', marginLeft: 10 }}>
                    <FlatList
                        data={recentSearches}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View>
                                <View style={styles.REcentbox}>
                                    <Text style={{ fontSize: 10 ,color: isDarkMode ? '#ffffff':'#000000'}}>{item.searchTerm}</Text>
                                    <Pressable style={styles.IconSuppr} onPress={() => handleDeleteSearch(index)}>
                                        <Ionicons name="close" size={15}  style={[{ color: isDarkMode ? 'red':'#000000' }]} />
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    NavBar: {
        marginTop: 30,
        paddingBottom: 10,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    IconBack: {
        left: 5,
        marginTop: 5,
    },
    ContenuInput: {
        width: '80%',
        height: 25,
    },
    Input: {
        width: '100%',
        height: 25,
        borderWidth: 1,
        left: 10,
        borderRadius: 20,
        fontSize: 10,
        paddingLeft: 10,
    },
    Iconsearch: {
        left: 4,
    },
    iconcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 5,
        left: 10,
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
    REcentbox: {
        display: 'flex',
    
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default NavSearch;
