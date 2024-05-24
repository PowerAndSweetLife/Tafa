import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, update, get } from 'firebase/database';
import { BASE_URL } from "../../helper/url";
import { useTheme } from '../context/usercontexttheme';
import SkeletonItem from '../../components/skeleton/skeletonContenuDiscu';
import { useUser } from '../context/usercontext';
import * as Font from 'expo-font';
import { BackHandler } from 'react-native';

const ContenuDiscu = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const [donnees, setDonnees] = useState([]);
  const [Idvisited, setIdVisited] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

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





  const loadFonts = async () => {
    await Font.loadAsync({
      'custom-font': require('../../assets/Fonts/Lato-Bold.ttf'),
      'custom-fontmessage': require('../../assets/Fonts/Montserrat-Regular.ttf'),
      'custom-fontmessageBold': require('../../assets/Fonts/Montserrat-Bold.ttf')
    });
  };
  
  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const visitesRef = ref(db, 'Messages');

        onValue(visitesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const messagesData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
            messagesData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            const uniqueMessages = [];
            const encounteredPairs = new Set();

            for (const message of messagesData) {
              const pair = message.Idenvoyermes < message.Idrecusmes
                ? `${message.Idenvoyermes}-${message.Idrecusmes}`
                : `${message.Idrecusmes}-${message.Idenvoyermes}`;

              if (!encounteredPairs.has(pair)) {
                encounteredPairs.add(pair);
                uniqueMessages.push(message);
              }
            }
            const filteredMessages = uniqueMessages.filter(message =>
              message.Idrecusmes === Id || message.Idenvoyermes === Id
            );

            const Idvisited = filteredMessages.map(message =>
              message.Idrecusmes === Id ? message.Idenvoyermes : message.Idrecusmes
            );

            setIdVisited(Idvisited);
            
            setDonnees(filteredMessages);
            
          } else {
            console.log('Aucune donnée de visite trouvée.');
          }
        });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

 useEffect(() => {
    const fetchUserData = async () => {
      
      if (Idvisited !== null && Idvisited.length > 0) {

        try {
          const response = await fetch(BASE_URL + 'usersdiscu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: Idvisited[0] }),
          });
        
          if (!response.ok) {
            throw new Error('Erreur HTTP, statut : ' + response.status);
          }
        
          const data = await response.json();
          console.log('Data from API:', data);
        
          if (data && Array.isArray(data.results)) {
            const filteredData = data.results.filter(user => user.id === Idvisited[0]);
            if (filteredData.length > 0) {
              const userDataArray = [filteredData[0]];
              setUserData(userDataArray);
              
            } else {
              console.error('Aucun utilisateur correspondant trouvé.');
            }
          } else {
            console.error('La réponse de l\'API n\'est pas un tableau attendu:', data);
          }
        
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          setError(error); // Définition de l'erreur dans le state
        }
        
        
      } else {
        console.log("Aucun ID visité à rechercher.");
      }
    };


    
    fetchUserData();
  }, [Idvisited]);

 
  const onPressMessages = async (selectedUserData, messageId) => {
    try {
      console.log('selectedUserData:', selectedUserData); 
      // Récupération de tous les messages à partir de la base de données Firebase
      const db = getDatabase();
      const visitesRef = ref(db, 'Messages');
      const snapshot = await get(visitesRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const messagesData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));

        // Mise à jour de tous les messages dans la base de données Firebase
        for (const message of messagesData) {
          if (message.Idrecusmes === Id) {
            const messageRef = ref(db, `Messages/${message.id}`);
            await update(messageRef, { lu: true });
          }
        }
      }
      const blockedUsersResponse = await fetch(BASE_URL + 'usersBlocked');
      if (!blockedUsersResponse.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
      }
      
      const blockedUsers = await blockedUsersResponse.json();
      const selectedUserId = selectedUserData.id;
      const currentUserBlockedIds = blockedUsers
        .filter(blockedUser => blockedUser.blocking_user_id === Id)
        .map(blockedUser => blockedUser.blocked_user_id);

      const isBlocked = currentUserBlockedIds.includes(selectedUserId);
     
      navigation.navigate('Messages', {
        userData: selectedUserData,
        showFooterMessage: !isBlocked // Show footer message only if not blocked
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des messages:', error);
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
          {donnees.map((item, index) => {
            const nom = item.Idrecusmes === Id ? item.Nomenvoyermes : item.Nomrecusmes;
            const nom2 = item.Idenvoyermes === Id ? 'Vous avez': item.Nomenvoyermes +'  a'   ;
            const profil = item.Idrecusmes === Id ? item.profilenvoyermes : item.profilrecumes;
            const isUnread = !item.lu;
            const isCurrentRecipient = item.Idrecusmes === Id;
            const selectedUserData = userData[index];
            return (
              <Pressable style={styles.Icon} onPress={() => onPressMessages(userData[index], item.id)} key={index}>
                <View style={[styles.Contenu, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                  <View style={styles.ContenuProfil}>
                    <Image source={{ uri: BASE_URL +'assets/Images/profile/'+  profil }} style={styles.images} />
                    <View style={styles.statutContainer}>
                    {item.status === 1 ? (
                <View style={styles.statutEnLigne}></View>
              ) : (
                <View style={styles.statutHorsLigne}></View>
              )}
                    </View>
                  </View>
                  <View style={styles.ContenuNom}>
                    <View>
                      <Text style={[styles.NomTExt, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                        {nom}
                      </Text>
                    </View>
                    <View style={styles.ContenuMessage}>
                      {item.inputValue ? ( // Vérifiez si inputValue est défini
                        <Text style={[styles.MESSAGES, { fontFamily: 'custom-fontmessage',color: isDarkMode ? '#ffffff' : 'gray' }]} numberOfLines={1} ellipsizeMode="tail">
                          {item.lu || !isCurrentRecipient ? item.inputValue : <Text style={{fontFamily: 'custom-fontmessageBold'  } }>{item.inputValue}</Text>}
                        </Text>
                      ) : item.Images ? ( // Si inputValue est vide mais Images est défini
                        <Text style={[styles.MESSAGES, {fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : 'gray' }]}>{nom2}  envoyé une photo</Text>
                      ): item.emoji ? ( // Si inputValue est vide mais Images est défini
                      <Text style={[styles.MESSAGES, {fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : 'gray' }]}>{nom2}  envoyé {item.emoji}</Text>
                    ) : null}
                    
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
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
    width: '80%',
    height: 70,
    paddingLeft: 10,
  },
  MESSAGES: {
    top: 10,
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

});

export default ContenuDiscu;
