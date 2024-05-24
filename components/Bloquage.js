import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, update, get } from 'firebase/database';
import { BASE_URL } from "../helper/url";
import { useTheme } from '../components/context/usercontexttheme';
import SkeletonItem from '../components/skeleton/skeletonContenuDiscu';
import { useUser } from '../components/context/usercontext';
import * as Font from 'expo-font';




const Bloquage = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const [donnees, setDonnees] = useState([]);
  const [Idblocker, setIdblocker] = useState([]);
  const [userData, setUserData] = useState([]);
  const [idduchamps, setidduchamps] = useState([]);

  const loadFonts = async () => {
    await Font.loadAsync({
      'custom-font': require('../assets/Fonts/Lato-Bold.ttf'),
      'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf')
    });
  };

  const loadData = async () => {
    try {
      // Récupération des utilisateurs bloqués
      const response = await fetch(BASE_URL + 'usersBlocked');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
      }
      const blockedUsers = await response.json();

      // Filtrer les utilisateurs bloqués par l'utilisateur actuellement connecté
      const blockedUsersByCurrent = blockedUsers.filter(user => user.blocking_user_id === Id);

      // Récupérer les IDs des utilisateurs bloqués et les stocker dans une variable
      const blockedUserIds = blockedUsersByCurrent.map(user => user.blocked_user_id);
      const idduchamps = blockedUsersByCurrent.map(user => user.id);
      setIdblocker(blockedUserIds);
      // Maintenant, vous avez les IDs des utilisateurs bloqués par l'utilisateur actuel dans blockedUserIds
      setidduchamps(idduchamps);
      console.log('id recuerer:', idduchamps);
      // Mettre à jour l'état de chargement une fois les données récupérées
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      // Gérer les erreurs en mettant à jour l'état de chargement
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFonts();
    loadData(); // Appel à loadData lors du montage du composant
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(BASE_URL + 'users');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
        }
        const usersData = await response.json();
       
        const filteredData = usersData.filter(user => Idblocker.includes(user.Id));

        setDonnees(filteredData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [Idblocker]);

  const onPressDelette = async (idduchamps) => {
    try {
      const idToSend = Array.isArray(idduchamps) ? idduchamps[0] : idduchamps;
     
      const response = await fetch(BASE_URL + 'debloquer', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: idToSend,
          }),
      });

      console.log('id envoyé:', idToSend);
      if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l\'utilisateur bloqué');
      }
      loadData(); // Rafraîchir la liste des utilisateurs bloqués après la suppression
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur bloqué:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contenu}>
            {[...Array(10)].map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.body, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <ScrollView>
        <View style={[styles.Contenaire, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
          <View style={styles.LigneContenu}>
            <Text style={[styles.ListeText, { fontFamily: 'titre-font' }]}>Liste Des Bloquer</Text>
          </View>
          {donnees.map((item, index) => (
            <View key={index} style={[styles.Contenu, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
              <View style={styles.ContenuProfil}>
                <Image source={{ uri: BASE_URL + item.img_link }} style={styles.images} />
                <View style={styles.statutContainer}></View>
              </View>
              <View style={styles.ContenuNom}>
                <View>
                  <Text style={[styles.NomTExt, { color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Nom}</Text>
                  <Text style={[styles.MESSAGES, { fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : 'gray' }]} numberOfLines={1} ellipsizeMode="tail">
                    {item.Prenom},{item.Ville}, {item.Sexe}, {item.Situation}....
                  </Text>
                </View>
              </View>
              <View style={styles.ContenuBtn}>
                <Pressable onPress={() => onPressDelette(idduchamps)} style={({ pressed }) => [
                  styles.apropos1,
                  {
                    backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                    borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
                  },
                ]}>
                  <Text style={[styles.TExtAproposPHoto, { fontFamily: 'custom-fontmessage', color: isDarkMode ? 'white' : '#07668f' }]}>Debloquer</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
  },
  Contenaire: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  Contenu: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    borderRadius: 7,
    paddingTop: 7,
    justifyContent: 'center',
  },
  ContenuProfil: {
    width: 55,
    display: 'flex',
    flexDirection: 'row',
    height: 55,
    borderRadius: 50,
    borderColor: 'lightgrey',
  },
  images: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  ContenuNom: {
    width: '60%',
    height: 70,
    paddingLeft: 10,
  },
  ContenuBtn: {
    width: '25%',
    height: 70,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  apropos1: {
    width: 100,
    height: 22,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 8,
    backgroundColor: "grey",
    left: -4,
    borderWidth: 1,
  },
  MESSAGES: {
    top: 5,
    fontSize: 12,
    width: '90%',
    height: 45,
  },
  statutContainer: {
    justifyContent: 'flex-end',
    right: 12,
    bottom: 5,
  },
  statutEnLigne: {
    backgroundColor: 'green',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  statutHorsLigne: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  NomTExt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  ContenuMessage: {
    height: '65%',
  },
  LigneContenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListeText: {
    fontSize: 17,
    alignItems: 'center',
    height: 30,
    color: '#79328d'
  },
  TExtAproposPHoto: {
    fontSize: 11,
    color: '#07668f',
  },
});

export default Bloquage;
