import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../components/skeleton/skeletoncontenuMacth';
import 'firebase/database';
import firebase from 'firebase/app';
import { get, ref, getDatabase } from 'firebase/database';
import { useUser } from './context/usercontext';
import { BASE_URL, BASE_URL_IMAGE } from "../helper/url";
import { useTheme } from './context/usercontexttheme';
import { BackHandler } from 'react-native';



const ContenuMatch = () => {
  const navigation = useNavigation();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const { Monprofil } = useUser();
  const { isDarkMode } = useTheme();

  const onPressProfil = () => {
    navigation.navigate('Profil');
  };

  const handleBackPress = () => {
    navigation.goBack(); // Revenir à l'écran précédent
    return true; // Indiquer que l'événement a été géré
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Supprimer l'écouteur lors du démontage du composant
    };
  }, []); // Le tableau de dépendances est vide, donc cette fonction ne sera exécutée qu'une fois lors du montage initial

 
  const database = getDatabase();
  const matchedUsersSet = new Set();

  const fetchBlockedUsers = async () => {
    try {
      const blockedUsersResponse = await fetch(BASE_URL + 'usersBlocked');
      if (!blockedUsersResponse.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
      }
      return await blockedUsersResponse.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs bloqués:', error);
      return [];
    }
  };

  useEffect(() => {
    // Fonction asynchrone pour récupérer les utilisateurs correspondants
    const fetchMatchedUsers = async () => {
      try {
        // Vérifie si le profil de l'utilisateur actuel existe
        if (Monprofil) {
          // Obtient l'ID de l'utilisateur actuel à partir de Monprofil
          const userId = Monprofil.id;

          // Récupère un instantané des likes à partir de la base de données Firebase
          const likesSnapshot = await get(ref(database, 'likes'));

          // Vérifie si l'instantané contient des données
          if (likesSnapshot.exists()) {
            // Initialise un tableau pour stocker les utilisateurs correspondants
            const matchedUsers = [];
            // Récupère les données des likes à partir de l'instantané
            const likes = likesSnapshot.val();
            // Récupère la liste des utilisateurs bloqués
            const blockedUsers = await fetchBlockedUsers();

            // Parcours chaque like dans les données récupérées
            for (const likeKey in likes) {
              const like = likes[likeKey];

              // Vérifie si l'utilisateur actuel est le liker
              if (userId === like.likerId) {
                const likedUserId = like.likedUserId;

                // Vérifie si l'utilisateur aimé a aimé l'utilisateur actuel
                const likedBack = Object.values(likes).some(like2 =>
                  likedUserId === like2.likerId && userId === like2.likedUserId
                );

                // Si l'utilisateur aimé a aimé l'utilisateur actuel
                if (likedBack) {
                  // Vérifie si l'utilisateur aimé est bloqué par l'utilisateur actuel
                  const isBlocked = blockedUsers.some(blockedUser =>
                    (blockedUser.blocking_user_id === userId && blockedUser.blocked_user_id === likedUserId) ||
                    (blockedUser.blocking_user_id === likedUserId && blockedUser.blocked_user_id === userId)
                  );

                  // Si l'utilisateur aimé n'est pas bloqué et n'est pas déjà ajouté
                  if (!isBlocked && !matchedUsersSet.has(likedUserId)) {
                    // Ajoute l'utilisateur correspondant à la liste
                    matchedUsersSet.add(likedUserId);
                    matchedUsers.push(like.likedUserProfile);
                  }
                }
              }
            }
            // Met à jour l'état des utilisateurs correspondants avec le nouveau tableau
            setMatchedUsers(matchedUsers);
          } else {
            console.log("Aucun like trouvé.");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs ayant des likes mutuels:", error);
      }
    };

    // Appelle la fonction fetchMatchedUsers une fois que Monprofil ou la base de données change
    fetchMatchedUsers();
  }, [Monprofil, database]);



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={styles.LigneContenubox}>
        <View style={styles.LigneContenu}>
          <Text style={styles.ListeText}>Liste Des Match</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenu}>
          {matchedUsers.length === 0 ? (
            // Render SkeletonItem when matchedUsers is empty
            <SkeletonItem />
          ) : (
            // Render matched users data
            matchedUsers.map((userData, index) => (
              <View key={index} style={styles.Imagcontainer}>
                <Pressable onPress={onPressProfil}>
                  <Image
                    source={{ uri: BASE_URL_IMAGE+'profile/' + userData.photo }}
                    style={styles.image}
                    onError={(error) => console.error("Erreur de chargement de l'image:", error)}
                  />
                  <View style={styles.NomEtStatut}>
                    <Text style={[styles.Nom, { color: isDarkMode ? '#ffffff' : '#000000' }]}>{userData.pseudo}</Text>
                    <View style={styles.statutContainer}>
                      {userData.status ? (
                        <View style={styles.statutEnLigne}></View>
                      ) : (
                        <View style={styles.statutHorsLigne}></View>
                      )}
                    </View>
                  </View>
                </Pressable>
              </View>
            ))
          )}
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
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
    borderBottomColor: '#07668f',
    borderBottomWidth: 1,
    height: 30,
    color: '#79328d'
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