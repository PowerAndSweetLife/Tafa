import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView ,Platform} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../helper/url";
import { BASE_URL_IMAGE } from "../helper/url";
import SkeletonItem from '../components/skeleton/skeletonContenu';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';
import { useUser } from '../components/context/usercontext';
import { insererDonnees } from './firebaseFunctions'; // Assurez-vous de spécifier le bon chemin
import * as Font from 'expo-font';
import { useTheme } from './context/usercontexttheme';
import loadFonts from './loadFonts';
import { BackHandler } from 'react-native';
import { RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';






const Contenu = () => {
  useEffect(() => {
    loadFonts();

  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const Pseudo = Monprofil && Monprofil.pseudo ? Monprofil.pseudo : 'defaultUserId';
  const profileimage = Monprofil && Monprofil.photo ? Monprofil.photo : 'img_link';
  const { isDarkMode } = useTheme();
  const fetchUsersAndFilter = async () => {
    try {
      const usersResponse = await fetch(BASE_URL + 'users');
      if (!usersResponse.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const usersData = await usersResponse.json();
      const blockedUsersResponse = await fetch(BASE_URL + 'usersBlocked');
      if (!blockedUsersResponse.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
      }
      const blockedUsersData = await blockedUsersResponse.json();
      // Filtrer les données pour ne pas inclure l'utilisateur connecté
      const filteredData = usersData.filter(user => user.id !== Id && user.photo);
      // Retirer les utilisateurs bloqués par l'utilisateur actuel de la liste de données
      const finalData = filteredData.filter(user => {
        const hasBlockedCurrentUser = blockedUsersData.some(blockedUser => blockedUser.blocking_user_id === Id && blockedUser.blocked_user_id === user.id);
        const isBlockedByCurrentUser = blockedUsersData.some(blockedUser => blockedUser.blocked_user_id === Id && blockedUser.blocking_user_id === user.id);
        return !hasBlockedCurrentUser && !isBlockedByCurrentUser;
    
      });

      setDonnees(finalData);
   
      setTimeout(() => setLoading(false), 10000);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setLoading(false);
    }
  };


  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUsersAndFilter();
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des données:', error);
    }
    setRefreshing(false);
  };
  const defaultAvatar = (sexe) => {
    return sexe === 'homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  };
  const onPressProfil = (userData) => {
    insererDonnees(Monprofil, Pseudo, profileimage);
    console.log('Profil', userData);
    navigation.navigate('Profil', { userData: userData });
  };
  const truncatePseudo = (pseudo) => {
    if (pseudo.length >= 10) {
      return pseudo.substring(0, 10) + '...';
    }
    return pseudo;
  };
  const handleBackPress = async () => {
    try {

      const response = await fetch(BASE_URL + 'logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur de réseau');
      } else {
        await updateEnligne(Id);
        BackHandler.exitApp();
        return true;

      }


    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Gérez les erreurs selon vos besoins
    }
  };
  const updateEnligne = async (Id) => {
    //console.log(Id);
    try {
      const response = await fetch(BASE_URL + 'updateEnligne', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Id,
          enLigne: 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de enLigne');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de enLigne:', error);
      throw new Error('Une erreur est survenue lors de la mise à jour de enLigne. Veuillez réessayer plus tard.');
    }
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  useEffect(() => {
    fetchUsersAndFilter(); // Charge les données initiales au montage
  }, []);
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contenu}>
            {[...Array(donnees.length)].map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const elementsJSX = donnees

    .map(item => (
      <View key={item.id} style={styles.Imagcontainer}>
        <Pressable onPress={() => onPressProfil(item)}>
          <View>
            <Image
              source={item.photo ? { uri: BASE_URL_IMAGE + 'profile/'+ item.photo } : defaultAvatar(item.sexe)}
              style={styles.image}
            />
          </View>
          <View style={styles.NomEtStatut}>
            <View>
              <Text style={[styles.Nom, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>
                {truncatePseudo(item.pseudo)}
              </Text>
            </View>
            <View style={styles.statutContainer}>
              {item.status === 1 ? (
                <View style={styles.statutEnLigne}></View>
              ) : (
                <View style={styles.statutHorsLigne}></View>
              )}

            </View>
          </View>
        </Pressable>
      </View>

    ));


  return (

    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contenu}>
            {elementsJSX}
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: 50,
    paddingTop: -3,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  contenu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    justifyContent: 'flex-start',
  },
  Imagcontainer: {
    width: '30.4%',
    minWidth: '30%',
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
    backgroundColor: 'lightgrey',
  },
  NomEtStatut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  Nom: {
    fontSize: 12,
    fontWeight: 'light',
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

export default Contenu;
