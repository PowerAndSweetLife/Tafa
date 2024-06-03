import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../components/skeleton/skeletoncontenuMacth';
import { useUser } from './context/usercontext';
import { BASE_URL, BASE_URL_IMAGE } from "../helper/url";
import { useTheme } from './context/usercontexttheme';
import { BackHandler } from 'react-native';



const ContenuMatch = () => {
  const navigation = useNavigation();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const { Monprofil } = useUser();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [noLikes, setNoLikes] = useState(false);



  const onPressProfil = () => {
    navigation.navigate('Profil');
  };

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      backHandler.remove();
    };
  }, []);

  const fetchBlockedUsers = async () => {
    try {
      const response = await fetch(BASE_URL + 'usersBlocked');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs bloqués:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        const response = await fetch(BASE_URL + 'matched_users');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs correspondants');
        }

        const likes = await response.json();
        if (likes.length === 0) {
          setNoLikes(true);
          setIsLoading(false);
          return;
        }

        if (Monprofil) {
          const userId = Monprofil.id;

          // Récupérer les utilisateurs bloqués
          const blockedUsers = await fetchBlockedUsers();

          // Filtrer les likes pour obtenir les likes mutuels
          const mutualLikes = likes.filter(like =>
            likes.some(otherLike =>
              otherLike.liker_id === like.liked_user_id &&
              otherLike.liked_user_id === like.liker_id &&
              like.liker_id === userId
            )
          );
          if (mutualLikes.length === 0) {
            setNoLikes(true);
            setIsLoading(false);
            return;
          }

          // Récupérer les ID des utilisateurs correspondants
          const matchedUserIds = mutualLikes.map(like => like.liked_user_id);

          // Filtrer par rapport aux utilisateurs bloqués
          const filteredMatches = matchedUserIds.filter(userId =>
            !blockedUsers.some(blockedUser =>
              (blockedUser.blocking_user_id === Monprofil.id && blockedUser.blocked_user_id === userId) ||
              (blockedUser.blocking_user_id === userId && blockedUser.blocked_user_id === Monprofil.id)
            )
          );

          // Récupérer les informations des utilisateurs correspondants
          const userResponse = await fetch(BASE_URL + 'getusercontenuMatch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: filteredMatches }),
          });

          const userData = await userResponse.json();
          const filteredData = userData.filter(user => user.id !== userId && user.photo);
          setMatchedUsers(filteredData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs correspondants:', error);
      }
    };

    fetchMatchedUsers();
  }, [Monprofil]);



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={styles.LigneContenubox}>
        <View style={styles.LigneContenu}>
          <Text style={styles.ListeText}>Liste Des Match</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenu}>
          {isLoading ? (
            <SkeletonItem />
          ) : noLikes ? (
            <View style={styles.noLikesContainer}>
              <Text style={styles.noLikesText}>Pas de likes mutuels</Text>
            </View>
          ) : (
            matchedUsers.map((userData, index) => (
              <View key={index} style={styles.Imagcontainer}>
                <Pressable onPress={onPressProfil}>
                  <Image
                    source={{ uri: BASE_URL_IMAGE + 'profile/' + userData.photo }}
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
  noLikesContainer:{
    width: '100%',
    alignItems: 'center',
  },
  noLikesText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 50,
  },
});

export default ContenuMatch;