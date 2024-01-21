import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const Suggestion = () => {
    // Liste complète d'utilisateurs (fictive)
    const allUsers = [
        { id: 1, name: 'nDeba', imageSource: require('../assets/images/test4.jpg') },
        { id: 2, name: 'nirymamy' ,imageSource: require('../assets/images/nirymamy.jpg') },
        { id: 3, name: 'User 3' ,imageSource: require('../assets/images/test5.jpg') },
        { id: 4, name: 'User 4' ,imageSource: require('../assets/images/test2.jpg') },
        { id: 5, name: 'User 5' ,imageSource: require('../assets/images/test.jpg') },
        // ... Ajoutez d'autres utilisateurs au besoin
    ];

    // Liste d'amis (fictive)
    const friends = [
        { id: 2, name: 'User 2',imageSource: require('../assets/images/test3.jpg') },
        { id: 4, name: 'User 4' },
    ];
     // Tableau pour stocker les éléments JSX générés
  const elementsJSX = [];

  // Boucle for pour générer les éléments JSX
  for (let i = 0; i < allUsers.length; i++) {
    const item =  allUsers[i];
    elementsJSX.push(
        <View style={styles.cardsugg}>
        <View style={styles.ImagContainer}>
            <Image source={item.imageSource} style={styles.image} />
        </View>

        <Text style={styles.Nom}>{item.name}</Text>
        
    </View>
    );

  };

    // Filtrer les suggestions en excluant les amis
    const friendSuggestions = allUsers.filter(user => !friends.some(friend => friend.id === user.id));

    const addFriend = (user) => {
        // Implémentez la logique pour ajouter un utilisateur en tant qu'ami
        console.log(`Ajouter ${user.name} en tant qu'ami`);
    };
    return (


        <View style={styles.Container}>
            <Text style={styles.Text}>Suggestions</Text>
            <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                <View style={styles.contenusug}>


                {elementsJSX}




                </View>
            </ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Pressable style={styles.Boutton}><Text style={{ textAlign: 'center', marginTop: 5, fontWeight: 'bold', }}>Voir Tout</Text></Pressable>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    Container: {
        height: 380,
    },
    contenusug: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        
    },
    cardsugg: {
        width: 190,
        height: 280,
        borderRadius: 10,
        marginLeft: 10,
        borderStyle: 'solid',
        
    
        


    },
    Text: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginLeft:10,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        width: '50%',
        height: 250,
        borderRadius: 10,

        marginLeft: 10,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderWidth: 2,
    },
    Boutton: {
        width: 200,
        height: 30,
        textAlign: 'center',
        borderRadius: 10,
        marginTop: -10,
        borderStyle: 'solid',
        borderColor: '#f94990',
        borderWidth: 2,
        
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 7,
    },
    Nom:{
        marginTop:7,
        marginLeft:2,
        fontSize:20,
    
    }
    


})


export default Suggestion