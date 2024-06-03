import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal ,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AproposInterface from '../../components/AproposInterface'
import PhotoInterface from '../../components/PhotoInterface';
import SkeletonItem from '../../components/skeleton/skeletonprofil';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from "../../helper/url";
import defaultHommeAvatar from '../../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../../assets/Avatar/avatarfemme2.jpg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/usercontexttheme';
import { useUser } from '../context/usercontext';
import { BackHandler } from 'react-native';
import { BASE_URL_IMAGE } from "../../helper/url";

const Profil = () => {
  const route = useRoute();
  const userData = route.params.userData;
  const description = userData && userData.description ? userData.description : '...';
  const navigation = useNavigation();
  const [currentInterface, setCurrentInterface] = useState("Profil");
  const defaultAvatar = userData.sexe === 'homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const onPressPhotos = () => {

    setCurrentInterface("Photo", userData.id);
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


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onPressApropos = () => {
    setCurrentInterface("Apropos");
  };
  const onPressMessages = async (selectedUserData) => {
   
    
    try {
      
      
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
        userData: userData ,
        showFooterMessage: !isBlocked // Show footer message only if not blocked
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des messages:', error);
    }
  };

  const renderCurrentInterface = () => {
    switch (currentInterface) {
      case "Photo":
        return <PhotoInterface />;
      case "Apropos":
        return <AproposInterface />;
      default:
        return <AproposInterface />;
    }
  };
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Simuler un chargement de données pendant 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);




  if (loading) {
    return <SkeletonItem />;
  }


  return (

    <View style={[style.content, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={style.couverture}>

        <Image
          source={userData.couverture ? { uri:  BASE_URL_IMAGE + 'profile/'+ userData.couverture  } : defaultAvatar}
          style={[style.image1]}
          resizeMode="cover"
        />

      </View>
      <View  style={[style.profilcontenu, { borderColor: isDarkMode ? '#79328d' : '#ffffff' }]}>
        <Pressable onPress={toggleModal}>
          <Image source={userData.photo ? { uri:  BASE_URL_IMAGE + 'profile/'+ userData.photo } : defaultAvatar}
           style={[style.profil, { borderColor: isDarkMode ? '#79328d' : '#ffffff' }]}></Image>
        </Pressable>
      </View>
      <View>
        <Text  style={[style.prenom, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{userData.pseudo}</Text>
        <Text style={[style.description, {fontFamily: 'objectif-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>
         {description}
        </Text>
      </View>
      <View style={style.apropos}>

        <Pressable onPress={onPressApropos} style={({ pressed }) => [
          style.apropos0, currentInterface === "Apropos",
          {
            backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
            borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
          },
        ]}>
          <Text  style={[style.TExt, { color: isDarkMode ? 'white' : '#07668f' }]}>A propos</Text>
        </Pressable>


        <Pressable onPress={onPressPhotos} style={({ pressed }) => [
          style.apropos1,
          {
            backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
            borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
          },
        ]}>
          <Text style={[style.TExt, { color: isDarkMode ? 'white' : '#07668f' }]}>Photos</Text>
        </Pressable>

        <Pressable onPress={onPressMessages} style={({ pressed }) => [
          style.apropos1,
          {
            backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
            borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
          },
        ]}>
          <Text style={[style.TExt, { color: isDarkMode ? 'white' : '#07668f' }]}>Messages</Text>
        </Pressable>





      </View>
      {renderCurrentInterface()}
      <Modal visible={isModalOpen} transparent={true}>
      <View style={style.Modal}>
        <View style={style.modalContainer}>
          <View style={style.modalContainerImage}>

          <TouchableOpacity style={style.modalclose} onPress={toggleModal}>
          <Ionicons name="close" size={30} color='#f94990' />
          </TouchableOpacity>
          
              <Image
               source={userData.photo ? { uri:  BASE_URL_IMAGE + 'profile/'+ userData.photo } : defaultAvatar}
                style={style.modalImage}
              />
          
          </View>
        </View>
        </View>
      </Modal>
    </View>

    // </View>
  );
}




const style = StyleSheet.create({
  content: {
  //  top: 10,
    backgroundColor: 'white',
  },
  couverture: {
    width: '100%',
    display: 'flex',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    borderRadius: 15,

  },
  image1: {
    alignItems: "center",
    justifyContent: "center", // Ajout de cette ligne pour centrer horizontalement
    height: 250,
    width: "98%",
    borderRadius: 15,
    // ...StyleSheet.absoluteFillObject,


  },
  profilcontenu: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 20,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    marginTop: -50,
    display: 'flex',
    flexDirection: 'column',
  },
  profil: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  prenom: {
    fontSize: 15,
    paddingLeft: 12,
  },
  description: {
    fontSize: 20,
    marginLeft: 13,
    // Color: "black",
   // fontWeight: 'bold',
  },
  apropos: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,

  },
  apropos0: {
    width: '25%',
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
  apropos1: {
    width: '25%',
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
  selectedButton: {
    backgroundColor: "#07668f",
  },
  defaultButton: {
    backgroundColor: "grey",
    opacity: 0.6,
  },
  TExt: {
    fontSize: 12,
    color: '#07668f',
  //fontWeight: 'bold'
  fontFamily: 'custom-fontmessage'
  },

  modalContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerImage: {
    //  backgroundColor:'red',
    width: '95%',
    height: '80%',
   
  },
  modalImage:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex:1,
  },
  modalclose:{
    backgroundColor:'white',
    width:30,
    height:30,
    position:'absolute',
    right:-10,
    top:-15,
    borderRadius:50,
    zIndex:5,
  },
  Modal:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
     width:'100%',
     height:"100%"
 },
});

export default Profil;
