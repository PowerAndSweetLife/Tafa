import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Animated, Easing, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import SkeletonItem from '../../components/skeleton/skeletonFooter';
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/usercontexttheme';
import { useRoute } from '@react-navigation/native';
import { useUser } from '../context/usercontext';
import { BASE_URL } from "../../helper/url";
import { Alert } from "react-native";




function Footer() {
  const route = useRoute();
  const userData = route.params.userData;

  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const { isDarkMode } = useTheme();

  const navigation = useNavigation();

  const onPressBloquer = async () => {
    const blockedUserId = userData.id//'ID_de_l_utilisateur_à_bloquer';

    try {
      const response = await fetch(BASE_URL + 'Blocage', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blocking_user_id: Id,//'Idde l'utilisateur qui bloque'
          blocked_user_id: blockedUserId,//'ID_de_l_utilisateur_à_bloquer'
        }),
      });
      if (response.ok) {
        console.log('Utilisateur bloqué avec succès');
        // Traitez la réponse ou actualisez l'interface utilisateur si nécessaire
        // Afficher une alerte personnalisée
        Alert.alert(
          `Utilisateur ${userData.pseudo} bloqué avec succès`,
          'Redirection vers l\'accueil...',
          [
            { text: "OK", onPress: () => navigation.navigate('Accueil') }
          ]
        );
        // Fermer la modal après l'affichage de l'alerte
        setModalVisible(false);
        fetchUsersAndFilter();
      } else {
        console.log('Erreur lors du blocage de l\'utilisateur: ', response.statusText);
      }
    } catch (error) {
      // Log de l'erreur
      error_log('Erreur lors du blocage de l\'utilisateur: '.error);
    }
  };
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  // ...
  const [modalVisible, setModalVisible] = useState(false);


  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };


  const onPressSignale = () => {
    console.log('Profil', userData);
    navigation.navigate('Signale', { userData: userData });
  };

  useEffect(() => {
    // Simuler un chargement de données pendant 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  const [isVisible, setIsVisible] = useState(true);
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Changer cette valeur pour ajuster la vitesse du clignotement

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(opacity, {
        toValue: isVisible ? 1 : 0,
        duration: 500, // Changer cette valeur pour ajuster la vitesse du clignotement
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [isVisible]);



  if (loading) {
    return <SkeletonItem />;
  }
  return (

    <View>
      <View style={[style.Contenair, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
        <TouchableOpacity onPress={openModal} style={[style.Pressable, { backgroundColor: isDarkMode ? '#79328d' : 'lightgrey' }]}>
          <View style={style.PressableENtier}>
            <Text style={[style.TExt, { fontFamily: 'custom-fontmessage', color: isDarkMode ? 'white' : '#000000' }]} >Bloquer {userData.pseudo} ?</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressSignale} style={[style.Pressable, { fontFamily: 'custom-fontmessage', backgroundColor: isDarkMode ? '#79328d' : 'lightgrey' }]}>
          <View style={style.PressableENtier}>
            <Text style={{ fontSize: 15, color: 'red', fontFamily: 'custom-fontmessage' }}>Signaler {userData.pseudo} ?</Text>
          </View>
        </TouchableOpacity>



      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* Contenu de modal */}
        <View style={[style.modalContainer, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }]}>


          <View style={[style.modalContent, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}  >

            <View style={style.CLosePressable}>

            </View>

            <View style={style.textModal}>
              <Text style={[{ fontFamily: 'modal-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Bloquer , {userData.pseudo} ?</Text>
              <Text style={[{ fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : '#000000' }]}>Est ce que vous êtes sûr(e) ?</Text>
            </View>

            <View style={style.modalPressablebox}>
              <TouchableOpacity style={style.modalPressable} onPress={onPressBloquer}>
                <Text style={[style.TExt, { fontFamily: 'custom-fontmessage' }]}>  Oui , Bloquer </Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.modalPressable1} onPress={closeModal}>
                <Text style={[style.TExt, { fontFamily: 'custom-fontmessage' }]}>non , Retour</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>

    </View>

  );
}
const style = StyleSheet.create({
  Contenair: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'space-around',
    height: 100,
    backgroundColor: 'white',
  },
  Pressable: {
    backgroundColor: 'lightgrey',
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    // paddingBottom: 20,
    paddingTop: 5,
    borderRadius: 15,
    height: 40,
    marginBottom: 15,
    justifyContent: 'center'
  },
  modalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: "100%"
  },
  modalContainerSigniale: {
    display: 'flex',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: "100%"
  },
  modalContent: {
    display: 'flex',

    justifyContent: 'center',
    height: 290,
    width: '98%',
    top: 100,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalContentSigniale: {
    //    height: 600,
    //borderWidth: 0.1,
    width: '98%',
    // top: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',

  },
  CLosePressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5
  },
  CLosePressableSigniale: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    paddingRight: 10,

  },
  modalPressableaNNULER: {
    backgroundColor: 'red',
    width: 100,
    height: 30,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  TExt: {
    color: "white",
    fontSize: 15,
  },
  TExt1: {
    fontSize: 17,
  },
  TExt2: {
    fontSize: 12,

  },
  signalerView: {
    fontSize: 20,
    color: "black",
  },
  modalPressablebox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalPressableboxSignale: {
    height: 300,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalPressable: {
    backgroundColor: "red",
    opacity: 0.8,
    borderWidth: 1,
    height: 40,
    width: 200,
    borderRadius: 50,
    borderColor: "red",
    width: "80%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalPressable1: {
    backgroundColor: '#07668f',
    opacity: 0.8,
    borderWidth: 1,
    height: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#07668f",
    margin: 5,
  },
  modalPressable2: {
    backgroundColor: '#07668f',
    opacity: 0.8,
    borderWidth: 1,
    height: 40,
    width: "97%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#07668f",
    margin: 5,
  },
  textModal: {
    alignItems: "center",
    justifyContent: "center",
    color: 'white',
    marginTop: 20,
  },
  reportModalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.9,
  },
  reportModalContent: {
    height: 290,
    borderWidth: 0.1,
    width: '98%',
    top: 100,
    borderRadius: 5,

  },
  texticonreportmodal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5
  },
  textreport: {
    fontSize: 20,
    fontWeight: '900',
    //justifyContent:'center',
  },
  textveuillez: {
    fontWeight: '600',
    padding: 10
  },
  textcontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5

  },
  thirdModalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
  },
  thirdModalContent: {
    height: 290,
    borderWidth: 0.1,
    width: '98%',
    top: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',


  },
  texticonthirdmodal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5
  },
  textcontentsignale: {
    fontWeight: '600',
    padding: 5
  },
  textcontentModalthird: {

    alignItems: 'center',
    fontWeight: '300',
    paddingLeft: 5,
    paddingRight: 5,


  },
  envoyerstyle: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.4,
    borderColor: 'blue',
    borderRadius: 50,
    backgroundColor: 'blue',
    marginTop: 50,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  envoyer: {
    color: 'white',
    fontWeight: '600',
  }
});

export default Footer;
