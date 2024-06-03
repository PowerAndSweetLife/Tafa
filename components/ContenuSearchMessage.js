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




const ContenuSearchMessage = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
  const [donnees, setDonnees] = useState([]);
  const [Idvisited, setIdVisited] = useState(null);
  const [userData, setUserData] = useState([]);


  const loadFonts = async () => {
    await Font.loadAsync({
      'custom-font': require('../assets/Fonts/Lato-Bold.ttf'),
      'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf')
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
          const userDataArray = [];
          for (const id of Idvisited) {
            const response = await fetch(BASE_URL + 'users');
            const userData = await response.json();

            const filteredData = userData.filter(user => user.Id === id);
            userDataArray.push(filteredData[0]); // On ajoute le premier utilisateur filtré au tableau
          }
          setUserData(userDataArray);
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
          setLoading(false);
        }
      } else {
        console.log("Aucun ID visité à rechercher.");
      }
    };

    fetchUserData();
  }, [Idvisited]);

  const onPressMessages = async (selectedUserData, messageId) => {
    try {
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

      // Navigation vers l'écran de messages avec les données de l'utilisateur
      navigation.navigate('Messages', { userData: selectedUserData });
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
            return (
              <Pressable style={styles.Icon} onPress={() => onPressMessages(userData[index], item.id)} key={index}>
                <View style={[styles.Contenu, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                  <View style={styles.ContenuProfil}>
                    <Image source={{ uri: BASE_URL + profil }} style={styles.images} />
                    <View style={styles.statutContainer}>
                      {item.enLigne ? (
                        <Text style={styles.statutHorsLigne}></Text>
                      ) : (
                        <View style={styles.statutEnLigne}></View>
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

});

export default ContenuSearchMessage;
