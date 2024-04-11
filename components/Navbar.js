import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useUser } from './context/usercontext';
import { BASE_URL } from '../helper/url';

const logo = require('../assets/images/logo.png'); 

const Navbar = () => {
  const { Monprofil } = useUser();
  const pseudo = Monprofil && Monprofil.Pseudo ? Monprofil.Pseudo : 'pseudo par défaut';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
  const navigation = useNavigation();
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
            const currentUserNotificationsCount = notificationsData.filter((visite) => visite.visitedUserId === Monprofil.Id).length;
  
            // Calculer le nombre de nouvelles notifications
            const newNotificationsCount = currentUserNotificationsCount - previousNotificationCount;
  
            // Mettre à jour le compteur de notifications
            updateNotificationCount(newNotificationsCount);
  
            // Mettre à jour le nombre précédent de notifications
            setPreviousNotificationCount(currentUserNotificationsCount);
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

  const onPressNotification = () => {
    navigation.navigate('Notification');
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

  return (
    <View style={styles.NavBar}>
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
            <Text style={styles.text}>{pseudo}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.IconMOdale} onPress={onPressDeconnexion}>
            <Ionicons name="log-out-outline" size={20} color="#f94990" />
            <Text style={styles.text}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <StatusBar style="auto" />
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
    width: '40%',
    left: '50%',
  },
  modalContent: {
    height: 60,
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
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Navbar;
