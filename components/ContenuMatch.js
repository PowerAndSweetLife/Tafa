import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../components/skeleton/skeletoncontenuMacth';
import 'firebase/database';
import firebase from 'firebase/app';
import { get, ref, getDatabase } from 'firebase/database';
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";




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
  const matchedUsersSet = new Set();

  useEffect(() => {
    // Fonction asynchrone pour récupérer les utilisateurs correspondants
    const fetchMatchedUsers = async () => {
      try {
        // Vérifiez si le profil de l'utilisateur actuel existe
        if (Monprofil) {
          // Obtenez l'ID de l'utilisateur actuel à partir de Monprofil
          const userId = Monprofil.Id;
          console.log("Mon profil ID:", userId);
          // Récupérez un instantané des likes à partir de la base de données Firebase
          const likesSnapshot = await get(ref(database, 'likes'));
          console.log("Snapshot des likes:", likesSnapshot);

          if (likesSnapshot.exists()) {
            // Initialisez un tableau pour stocker les utilisateurs correspondants
            const matchedUsers = [];
            // Récupérez les données des likes à partir de l'instantané
            const likes = likesSnapshot.val();
            // Parcourez chaque like dans les données récupérées
            for (const likeKey in likes) {
              const like = likes[likeKey];
              // Vérifiez si l'utilisateur actuel est le liker
              if (userId === like.likerId) { // Vérifiez si l'utilisateur actuel est le liker
                const likedUserId = like.likedUserId;
                console.log("ID de l'utilisateur aimé par l'utilisateur actuel ou connecté:", likedUserId);

                // Parcourez à nouveau les likes pour vérifier les correspondances réciproques
                for (const likeKey2 in likesSnapshot.val()) {
                  const like2 = likesSnapshot.val()[likeKey2];

                  // Vérifiez si l'utilisateur aimé a aimé l'utilisateur actuel
                  if (likedUserId === like2.likerId && userId === like2.likedUserId) {
                    console.log("L'utilisateur aimé a aimé l'utilisateur actuel.");
                    if (!matchedUsersSet.has(likedUserId)) { // Vérifier si cet utilisateur correspondant n'a pas déjà été ajouté
                      matchedUsersSet.add(likedUserId); // Ajouter l'ID de l'utilisateur correspondant à l'ensemble
                      matchedUsers.push(like.likedUserProfile); // Ajouter l'utilisateur correspondant à la liste
                    }
                  }
                }
              }
            }
            // Mettez à jour l'état des utilisateurs correspondants avec le nouveau tableau
            setMatchedUsers(matchedUsers);
            console.log("Utilisateurs correspondants:", matchedUsers);
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

                <Image
                  source={{ uri: BASE_URL + userData.Images }}
                  style={styles.image}
                  onError={(error) => console.error("Erreur de chargement de l'image:", error)}
                />
                <View style={styles.NomEtStatut}>
                  <Text style={styles.Nom}>{userData.nom}</Text>
                  <View style={styles.statutContainer}>
                    {userData.enLigne ? (
                      <View style={styles.statutEnLigne}></View>
                    ) : (
                      <View style={styles.statutHorsLigne}></View>
                    )}
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: -3,
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    height: '100%',
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
    right: 3,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  Imagcontainer: {
    width: '30.4%',
    height: 145,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: '2.5%',
  },
  image: {
    width: '100%',
    height: 120,
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

export default ContenuMatch;