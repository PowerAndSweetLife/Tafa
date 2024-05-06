import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid, Pressable, Modal, TouchableHighlight, TouchableOpacity } from "react-native";
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
  const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement



  const onPressBloquer = async () => {
    const blockedUserId = userData.Id//'ID_de_l_utilisateur_à_bloquer';
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
          `Utilisateur ${userData.Nom} bloqué avec succès`,
          'Redirection vers l\'accueil...',
          [
            { text: "OK", onPress: () => navigation.navigate('Accueil') }
          ]
        );
        // Fermer la modal après l'affichage de l'alerte
        setModalVisible(false);
        // Recharger les données
        fetchUsersAndFilter();
      } else {
        console.log('Erreur lors du blocage de l\'utilisateur: ', response.statusText);
      }
    } catch (error) {
      // Log de l'erreur
      error_log('Erreur lors du blocage de l\'utilisateur: '.error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const openReportModal = () => {
    setReportModalVisible(true);
  };
  const closeReportModal = () => {
    setReportModalVisible(false);
  };
  const openThirdModal = () => {
    setThirdModalVisible(true);
  };
  const closeThirdModal = () => {
    setThirdModalVisible(false);
  };

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

    <View>
      <View style={[style.Contenair, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
        <TouchableOpacity onPress={openModal} style={[style.Pressable, { backgroundColor: isDarkMode ? '#79328d' : 'lightgrey' }]}>
          <View style={style.PressableENtier}>
            <Text style={[style.TExt, { color: isDarkMode ? 'white' : '#000000' }]} >Bloquer {userData.Nom} ?</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openReportModal} style={[style.Pressable, { backgroundColor: isDarkMode ? '#79328d' : 'lightgrey' }]}>
          <View style={style.PressableENtier}>
            <Text style={{ color: 'red' }}>Signaler {userData.Nom} ?</Text>
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
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <View style={style.CLosePressable}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={30} color="red"></Ionicons>
              </TouchableOpacity>
              <Text style={style.textreport}>Bloquer</Text>
              <TouchableOpacity >
                <Ionicons name="close" size={30} color="white"></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={style.textModal}>
              <Text>Bloquer , {userData.Nom} ?</Text>
              <Text>Est ce que vous êtes sûr(e) ?</Text>
            </View>

            <View style={style.modalPressablebox}>
              <TouchableOpacity style={style.modalPressable} onPress={onPressBloquer}>
                <Text style={style.TExt}>  Oui , Bloquer </Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.modalPressable1} onPress={closeModal}>
                <Text style={style.TExt}>non , Retour</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={closeReportModal}
      >
        <View style={style.reportModalContainer}>
          <View style={style.reportModalContent}>
            <View style={style.texticonreportmodal}>
              <Ionicons name="arrow-back-outline" size={30} color="grey"></Ionicons>
              <Text style={style.textreport}>Signaler</Text>
              <TouchableOpacity onPress={closeReportModal}>
                <Ionicons name="close" size={30} color="red"></Ionicons>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={style.textveuillez}>Veuillez sélectionner un Problème</Text>
            </View>
            <TouchableOpacity style={style.textcontent} onPress={openThirdModal}>
              <Text>Usurpation d'identité</Text>
              <Ionicons name="arrow-forward-circle-outline" size={30} color="grey"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={style.textcontent} onPress={openThirdModal}>
              <Text>Faux compte</Text>
              <Ionicons name="arrow-forward-circle-outline" size={30} color="grey"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={style.textcontent} onPress={openThirdModal}>
              <Text>Faux nom</Text>
              <Ionicons name="arrow-forward-circle-outline" size={30} color="grey"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={style.textcontent} onPress={openThirdModal}>
              <Text>Harcèlement et intimidation</Text>
              <Ionicons name="arrow-forward-circle-outline" size={30} color="grey"></Ionicons>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={thirdModalVisible}
        onRequestClose={closeThirdModal}
      >
        <View style={style.thirdModalContainer}>
          <View style={style.thirdModalContent}>
            <View style={style.texticonthirdmodal}>
              <TouchableOpacity onPress={closeThirdModal} >
                <Ionicons name="arrow-back-outline" size={30} color="grey"></Ionicons>
              </TouchableOpacity>
              <Text style={style.textreport}>Signaler</Text>
              <TouchableOpacity onPress={() => { closeThirdModal(); closeReportModal(); }} style={style.texticonreport}>
                <Ionicons name="close" size={30} color="red"></Ionicons>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={style.textcontentsignale}>Signaler quelque chose allant à l'encontre des standards de la communauté</Text>
            </View>
            <View >
              <Text style={style.textcontentModalthird}>Nos standards expliquent ce que nous autorisons ou non sur Tafa. Nous les révisions et mettons  à jour régulièrement avec l'aide expert</Text>
            </View>
            <TouchableOpacity style={style.envoyerstyle} onPress={() => { closeThirdModal(); closeReportModal(); }}>
              <View >
                <Text style={style.envoyer}>Envoyer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >

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
    backgroundColor: 'white',
    opacity: 0.9,
  },
  modalContent: {
    height: 290,
    borderWidth: 0.1,
    width: '98%',
    top: 100,
    borderRadius: 5,

  },
  CLosePressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5
  },
  TExt: {
    color: "white",
    fontSize: 15,
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
  modalPressable: {
    backgroundColor: "red",
    opacity: 0.8,
    borderWidth: 1,
    height: 40,
    width: 200,
    borderRadius: 50,
    borderColor: "red",
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
