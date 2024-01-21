import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const Invitation = () => {
    // Liste complète d'utilisateurs (fictive)
    const allUsers = [
       
        { id: 3, name: 'MIary', imageSource: require('../assets/images/test5.jpg') },
        { id: 4, name: 'Danny', imageSource: require('../assets/images/test2.jpg') },
        { id: 5, name: 'Mathieu', imageSource: require('../assets/images/test.jpg') },
        // ... Ajoutez d'autres utilisateurs au besoin
    ];

    // Liste d'amis (fictive)
    const friends = [
        { id: 2, name: 'User 2', imageSource: require('../assets/images/test3.jpg') },
        { id: 4, name: 'User 4' },
    ];
    // Tableau pour stocker les éléments JSX générés
    const elementsJSX = [];

    // Boucle for pour générer les éléments JSX
    for (let i = 0; i < allUsers.length; i++) {
        const item = allUsers[i];
        elementsJSX.push(
            <View style={styles.cardsugg}>
                <View style={styles.ImagContainer}>
                    <Image source={item.imageSource} style={styles.image} />
                </View>

                <Text style={{ marginLeft: 5, fontSize: 20, }}>{item.name}</Text>
                <View style={styles.Buttoncontainer}>

                    <Pressable onPress={() => addFriend(item)} style={styles.Contacter}>
                        <Ionicons name="heart" size={40} color="#f94990" />

                    </Pressable>
                    <Pressable onPress={handleClearPress} style={styles.Contacter}>
                        <Ionicons name="close-circle" size={40} color="#f94990" />

                    </Pressable>
                </View>
            </View>
        );

    };
    const handleClearPress = () => {
        setLastSearch('');
    };

    // Filtrer les suggestions en excluant les amis
    const friendSuggestions = allUsers.filter(user => !friends.some(friend => friend.id === user.id));

    const addFriend = (user) => {
        // Implémentez la logique pour ajouter un utilisateur en tant qu'ami
        console.log(`Ajouter ${user.name} en tant qu'ami`);
    };
    return (


        <View style={styles.Container}>
            <Text style={styles.Text}>Invitations</Text>
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
        height: 400,
    },
    contenusug: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',

    },
    cardsugg: {
        width: 190,
        height: 300,
        borderRadius: 10,
        marginLeft: 10,
        backgroundColor: 'whitesmoke',
        borderStyle: 'solid',





    },
    Text: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    card: {
        width: 190,
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
        height: 220,
        borderRadius: 7,
    },
   
    Buttoncontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
         padding:10,
    }


})


export default Invitation