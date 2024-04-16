import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid, Pressable, Modal, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import SkeletonItem from '../../components/skeleton/skeletonFooter';
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/usercontexttheme';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from '@react-navigation/native';




function Footer() {
  const route = useRoute();
  const userData = route.params.userData;
  const { isDarkMode } = useTheme();
  const showCustomToast = () => {
    // console.log("Function showCustomToast called");
    Toast.show({
      type: "custom",
      position: "bottom",
      text1: "Custom Toast",
      visibilityTime: 5000,
      customComponent: (
        <CustomToast
          message="Ceci est un toast personnalisé."
          backgroundColor="green"
        />
      ),
    });
  };
  const navigation = useNavigation();
  const onPressBloquer = () => {
    navigation.navigate("bloquer");
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  // ...

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
        <View style={[style.Pressable, { backgroundColor: isDarkMode ? '#79328d' : 'lightgrey' }]}>
          <TouchableOpacity onPress={openModal} style={style.PressableENtier}>
            <Text style={[style.TExt, { color: isDarkMode ? 'white' : '#000000' }]} >Bloquer {userData.Nom} ?</Text>
          </TouchableOpacity>
        </View>

        <View style={[style.Pressable, { backgroundColor: isDarkMode ? '#79328d' : 'lightgrey' }]}>
          <TouchableOpacity onPress={onPressBloquer} style={style.PressableENtier}>
            <Text style={{ color: 'red' }}>Signaler {userData.Nom} ?</Text>
          </TouchableOpacity>
        </View>



      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* Contenu de votre modal */}
        <View style={style.modalContainer}>


          <View style={style.modalContent}>


            <Pressable onPress={closeModal}>
              <Ionicons style={style.CLosePressable} name="close" size={25} color="red"></Ionicons>
            </Pressable>


            <View style={style.textModal}>
              <Text>Bloquer , {userData.Nom} ?</Text>
              <Text>Est ce que vous étes sur ?</Text>
            </View>

            <Pressable style={style.modalPressable} onPress>
              <Text style={style.TExt}>  Oui , Bloquer </Text>
            </Pressable>

            <Pressable style={style.modalPressable1}>
              <Text style={style.TExt}>non , Retour</Text>
            </Pressable>

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
    justifyContent:'center'
  },
  modalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 200,
  },
  modalContent: {
    borderRadius: 70,
    height: 300,
    width: 350,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    top: 280,
    paddingTop: 45,
    borderWidth: 1,
    borderColor: '#07668f',

  },
  CLosePressable: {
    marginLeft: -160,
    top: -30,
  },
  TExt: {
    color: "white",
    fontSize: 15,
  },
  signalerView: {
    fontSize: 20,
    color: "black",
  },
  modalPressable: {
    backgroundColor: "red",
    opacity: 0.8,
    borderWidth: 1,
    height: 30,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "red",
    margin: 5,
  },
  modalPressable1: {
    backgroundColor: '#07668f',
    opacity: 0.8,
    borderWidth: 1,
    height: 30,
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
    color: 'white'
  },
});

export default Footer;
