import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../components/skeleton/skeletoncontenuMacth';
import 'firebase/database';
import firebase from 'firebase/app';
import { get, ref, getDatabase } from 'firebase/database';
import { useUser } from './context/usercontext';
const ContenuMatch = () => {
    const navigation = useNavigation();
    const [matchedUsers, setMatchedUsers] = useState([]);
    const { Monprofil } = useUser();
    const onPressProfil = () => {
        navigation.navigate('Profil');
    };
    const firebaseConfig = {
        apiKey: "AIzaSyCql_o_TZT7-bbBYY9PTa_ee8VfdaMQo4g",
        authDomain: "tafa1-2a9e0.firebaseapp.com",
        databaseURL: "https://tafa1-2a9e0-default-rtdb.firebaseio.com",
        projectId: "tafa1-2a9e0",
        storageBucket: "tafa1-2a9e0.appspot.com",
        messagingSenderId: "444808821936",
        appId: "1:444808821936:web:243a5339773f19185dcf75",
        measurementId: "G-GZEMBD98F4"
    };
    //const app = initializeApp(firebaseConfig);  
    const database = getDatabase();
    useEffect(() => {
      const fetchMatchedUsers = async () => {
          try {
              const likedUsers = [];
              if (Monprofil) {
                  const userId = Monprofil.Id;
                  console.log("Mon profil ID:", userId);
    
                  const likesSnapshot = await get(ref(database, 'likes'));
                  console.log("Snapshot des likes:", likesSnapshot);
    
                  if (likesSnapshot.exists()) {
                      const matchedUsers = [];
                      const likes = likesSnapshot.val();
    
                      for (const likeKey in likes) {
                          const like = likes[likeKey];
    
                          const likedUserId = like.likedUserId;
                          console.log("ID de l'utilisateur aimé:", likedUserId);
    
                          // Maintenant, vérifiez si l'utilisateur aimé a aimé l'utilisateur actuel
                          for (const likeKey2 in likes) {
                              const like2 = likes[likeKey2];
    
                              if (likedUserId === like2.likedUserId && userId === like2.likerId) {
                                  console.log("L'utilisateur aimé a aimé l'utilisateur actuel.");
                                  // Ajoutez l'utilisateur aimé à la liste des utilisateurs correspondants
                                  matchedUsers.push(like.likedUserProfile);
                              }
                          }
                      }
                      setMatchedUsers(matchedUsers);
                  } else {
                      console.log("Aucun like trouvé.");
                  }
              }
          } catch (error) {
              console.error("Erreur lors de la récupération des utilisateurs ayant des likes mutuels:", error);
          }
      };
    
      fetchMatchedUsers();
    }, [Monprofil, database]);
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.LigneContenubox}>
                <View style={styles.LigneContenu}>
                    <Text style={styles.ListeText}>Liste Des Match</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.contenu}>
                    {matchedUsers.map((userData, index) => (
                        <View key={index} style={styles.Imagcontainer}>
                            <Pressable onPress={onPressProfil}>
                                <View>
                                    <Image source={{ uri: userData.Images || 'https://via.placeholder.com/150' }} style={styles.image} />
                                </View>
                                <View style={styles.NomEtStatut}>
                                    <View>
                                        <Text style={styles.Nom}>{userData.nom}</Text>
                                    </View>
                                    <View style={styles.statutContainer}>
                                        {userData.enLigne ? (
                                            <Text style={styles.statutHorsLigne}></Text>
                                        ) : (
                                            <View style={styles.statutEnLigne}></View>
                                        )}
                                    </View>

                                </View>
                            </Pressable>
                        </View>))}
                </View>
            </ScrollView>
        </SafeAreaView>);
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '100%',
        width: '100%',
        paddingTop: -3,
    },
    scrollView: {
        marginHorizontal: 20,
        marginLeft: 3,
        marginRight: 10,
    },
    LigneContenubox: {
        display: 'flex',
        width: '100%',
    },
    LigneContenu: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ListeText: {
        fontSize: 20,
        alignItems: 'center',
        borderBottomColor: '#07668f',
        borderBottomWidth: 1,
        height: 30,
    },
    contenu: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: 5,
        flexWrap: 'wrap',
        top: 5,
        marginBottom: 5,
    },
    Imagcontainer: {
        width: '31%',
        height: 145,
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 145,
        borderRadius: 7,
    },
    NomEtStatut: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Nom: {
        fontSize: 12,
        color: 'black',
    },
    statutContainer: {
        paddingLeft: 5,
    },
    statutEnLigne: {
        backgroundColor: 'green',
        width: 8,
        height: 8,
        borderRadius: 50,
    },
    statutHorsLigne: {
        backgroundColor: 'red',
        width: 8,
        height: 8,
        borderRadius: 50,
    },
});
export default ContenuMatch