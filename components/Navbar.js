import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Switch, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, get, set } from 'firebase/database';

import { useUser } from '../components/context/usercontext';
import { useTheme } from '../components/context/usercontexttheme';
import * as Font from 'expo-font';
const logo = require('../assets/images/logo.png');
import loadFonts from './loadFonts';
import { BASE_URL } from '../helper/url';




const Navbar = () => {

  

  useEffect(() => {
    loadFonts();
  }, []);

  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const pseudo = Monprofil && Monprofil.pseudo ? Monprofil.pseudo : 'pseudo par défaut';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
  const navigation = useNavigation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notificationsSeen, setNotificationsSeen] = useState(false);
  const updateNotificationCount = (newCount) => {
    if (notificationsSeen) {
      setNotificationCount(0);
    } else if (newCount > 0) {
      setNotificationCount(newCount);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const visitesRef = ref(db, 'profiles_visits');
  
        onValue(visitesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const notificationsData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
            
            // Filtrer les notifications avec lu: false
            const filteredNotifications = notificationsData.filter((visite) => visite.visitedUserId === Monprofil.Id && !visite.lu);
  
            // Calculer le nombre de nouvelles notifications
            const newNotificationsCount = filteredNotifications.length;
  
            // Mettre à jour le compteur de notifications
            updateNotificationCount(newNotificationsCount);
  
            // Mettre à jour le nombre précédent de notifications
            setPreviousNotificationCount(filteredNotifications.length);
          } else {
            console.log('Aucune donnée de visite trouvée.');
          }
        });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    fetchData();
  }, [Monprofil.Id, previousNotificationCount, notificationsSeen]);
  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onPressRecherche = () => {
    navigation.navigate('Recherche');
  };

  const onPressMenu = () => {
    navigation.navigate('Menu');
  };

  
  const markNotificationsAsRead = async () => {
    try {
      const db = getDatabase();
      const visitesRef = ref(db, 'profiles_visits');
      const snapshot = await get(visitesRef); // Utiliser get() pour récupérer les données une seule fois
    
      if (snapshot.exists()) { // Vérifier si le snapshot existe
        const data = snapshot.val(); // Récupérer les données du snapshot
        // Mettre à jour localement les notifications comme lues
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if (data[key].visitedUserId === Monprofil.Id && !data[key].lu) {
              data[key].lu = true;
            }
          }
        }
    
        // Mettre à jour l'état "lu" des notifications dans la base de données
        await set(ref(db, 'profiles_visits'), data); // Utiliser set() pour mettre à jour les données
      } else {
        console.error('Aucune donnée de visite trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des notifications:', error);
    }
  };
  
  
  

  const onPressNotification = () => {
    markNotificationsAsRead();
  
    // Naviguer vers l'écran de notification
    navigation.navigate('Notification');
  
    // Marquer les notifications comme vues localement
    setNotificationsSeen(true);

  };



  const onPressDeconnexion = async () => {
    try {
      // Envoyez une demande au serveur pour déconnecter l'utilisateur
      const response = await fetch(BASE_URL + 'logout', {
        method: 'POST', // Utilisez la méthode appropriée pour la déconnexion
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Vous pouvez envoyer d'autres données si nécessaire
        // body: JSON.stringify({ /* Vos données */ }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur de réseau');
      }else{
        await updateEnligne(Id);
      }
  
      // Effacez les informations d'identification stockées localement
      // Par exemple, si vous utilisez AsyncStorage :
      // AsyncStorage.removeItem('token');
  
      // Redirigez l'utilisateur vers l'écran d'accueil ou tout autre écran approprié
      setTimeout(() => {
      navigation.navigate('COnnexion');
    }, 500);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Gérez les erreurs selon vos besoins
    }
  };


  const updateEnligne = async (Id) => {
    console.log(Id);
    try {
        const response = await fetch(BASE_URL + 'updateEnligne', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: Id,
                enLigne: "false",
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





  return (
    <View   style={[styles.NavBar, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.Logo} />
      </View>
      <View style={styles.iconcontainer}>
        <Pressable style={styles.Icon} onPress={onPressRecherche}>
          <Ionicons name="search" size={22} color="#f94990" />
        </Pressable>
        <Pressable style={styles.Icon} onPress={onPressNotification}>
          <Ionicons name="notifications" size={20} color="#f94990" />
          {!notificationsSeen && notificationCount > 0 && (
            <View style={styles.Badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}


        </Pressable>
        <Pressable style={styles.Icon3} onPress={toggleModal}>
          <Ionicons name="md-person" size={21} color="#f94990" />
        </Pressable>
      </View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        backdropOpacity={0}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.IconMOdale} onPress={onPressMenu}>
            <Ionicons name="person-circle" size={20} color="#f94990" />
            <Text style={[styles.text,{ fontFamily: 'modal-font'}]}>{pseudo}</Text>
          </TouchableOpacity>
          <View style={styles.contenuSwitch}>
            <Ionicons name="moon" size={20} color="#f94990" />
            <Text  style={[styles.textMode,{ fontFamily: 'modal-font'}]}>Mode Sombre</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} >
            </Switch>
          </View>
          <TouchableOpacity style={styles.IconMOdale} onPress={onPressDeconnexion}>
            <Ionicons name="log-out-outline" size={20} color="#f94990" />
            <Text style={[styles.text,{ fontFamily: 'modal-font'}]}>Déconnexion</Text>
          </TouchableOpacity>

         
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  NavBar: {
    marginTop: 20,
    paddingBottom: 10,
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 25,
    marginTop: 13,
    marginLeft: 10,
  },
  Logo: {
    width: '100%',
    height: '100%',
  },
  iconcontainer: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  Icon: {
    marginRight: 10,
  },
  Icon3: {
    marginTop: -4,
    marginRight: 10,
  },
  Badge: {
    position: 'absolute',
    top: -3,
    right: -5,
    backgroundColor: '#79328d',
    width: 15,
    height: 15,
    borderRadius: 50,
    paddingLeft: 5,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
  },
  modal: {
    top: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '43%',
    left: '50%',
  },
  modalContent: {
    height: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  IconMOdale: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
  },
  text: {
    fontSize: 12,
    //fontWeight: 'bold',
    marginLeft: 10,
  },
  contenuSwitch: {
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-around',
    paddingLeft: 7,
    alignItems: 'center',

  },
  textMode: {
    // left:-1,
    fontSize: 12,
   // fontWeight: 'bold',

  },
});

export default Navbar;
